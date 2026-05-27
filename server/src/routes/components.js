import express from 'express';
import jwt from 'jsonwebtoken';
import Component from '../models/Component.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/components - Get published components with pagination, search, category filters
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 12, search = '', category, tier } = req.query;
    const query = { isPublished: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (tier && tier !== 'all') {
      query.tier = tier;
    }

    const skipIndex = (parseInt(page) - 1) * parseInt(limit);
    const total = await Component.countDocuments(query);
    const components = await Component.find(query)
      .populate('category', 'name slug color icon')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skipIndex);

    res.json({
      components,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching components', error: error.message });
  }
});

// GET /api/components/:slug - Get single component details with server-side Pro gate
router.get('/:slug', async (req, res) => {
  try {
    const component = await Component.findOne({ slug: req.params.slug, isPublished: true })
      .populate('category', 'name slug color icon');

    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }

    // Server-side Pro Lock Check
    if (component.tier === 'pro') {
      let hasAccess = false;
      let token = req.cookies?.pui_token;
      const apiKey = req.headers['x-api-key'] || req.query.key || req.headers['pratham-ui-key'];

      let user;
      if (apiKey) {
        user = await User.findOne({ apiKey });
      } else if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          user = await User.findById(decoded.userId);
        } catch (e) {
          // Token invalid/expired
        }
      } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
          token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          user = await User.findById(decoded.userId);
        } catch (e) {}
      }

      if (user && (user.plan === 'pro' || user.role === 'admin')) {
        hasAccess = true;
      }

      if (!hasAccess) {
        const compObject = component.toObject();
        // Mask the actual source codes
        compObject.componentCode = `// 🚨 PRO GATEWAY: "${component.name}" is a premium Marvel widget.\n// Visit ${process.env.CLIENT_URL || 'http://localhost:5173'}/pricing to upgrade and fetch component code.`;
        compObject.previewCode = `// 🚨 PRO GATEWAY: Install requires a Pro subscription.`;
        compObject.isLocked = true;
        return res.json(compObject);
      }
    }

    res.json(component);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching component details', error: error.message });
  }
});

// POST /api/components/:slug/view - Increment view count
router.post('/:slug/view', async (req, res) => {
  try {
    const component = await Component.findOneAndUpdate(
      { slug: req.params.slug, isPublished: true },
      { $inc: { viewCount: 1 } },
      { new: true }
    );
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
    res.json({ success: true, viewCount: component.viewCount });
  } catch (error) {
    res.status(500).json({ message: 'Error incrementing view count', error: error.message });
  }
});

// POST /api/components/:slug/copy - Increment copy count (auth required)
router.post('/:slug/copy', protect, async (req, res) => {
  try {
    const component = await Component.findOneAndUpdate(
      { slug: req.params.slug, isPublished: true },
      { $inc: { copyCount: 1 } },
      { new: true }
    );
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
    res.json({ success: true, copyCount: component.copyCount });
  } catch (error) {
    res.status(500).json({ message: 'Error incrementing copy count', error: error.message });
  }
});

export default router;

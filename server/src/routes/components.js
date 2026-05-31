import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Component from '../models/Component.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { mockComponents, mockDbQueryUser } from '../config/mockDb.js';
import { runWithMockFallback } from '../config/db.js';

const router = express.Router();

// GET /api/components - Get published components with pagination, search, category filters
router.get('/', async (req, res) => {
  const { page = 1, limit = 12, search = '', category, tier } = req.query;

  const dbOp = async () => {
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

    return {
      components,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      total,
    };
  };

  const mockFallback = async () => {
    let filtered = mockComponents;
    if (search) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter(c => c.category?._id === category || c.category?.slug === category);
    }
    if (tier && tier !== 'all') {
      filtered = filtered.filter(c => c.tier === tier);
    }
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const total = filtered.length;
    const paginated = filtered.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    return {
      components: paginated,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      total,
    };
  };

  try {
    const result = await runWithMockFallback(dbOp, mockFallback);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching components', error: error.message });
  }
});

// GET /api/components/:slug - Get single component details with server-side Pro gate
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  const dbOp = async () => {
    const component = await Component.findOne({ slug, isPublished: true })
      .populate('category', 'name slug color icon');
    if (!component) return null;
    return component.toObject();
  };

  const mockFallback = async () => {
    const component = mockComponents.find(c => c.slug === slug);
    return component ? { ...component } : null;
  };

  try {
    const component = await runWithMockFallback(dbOp, mockFallback);
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
        user = await runWithMockFallback(
          async () => await User.findOne({ apiKey }),
          async () => await mockDbQueryUser({ apiKey })
        );
      } else if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          user = await runWithMockFallback(
            async () => await User.findById(decoded.userId),
            async () => await mockDbQueryUser({ userId: decoded.userId })
          );
        } catch (e) {}
      } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
          token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          user = await runWithMockFallback(
            async () => await User.findById(decoded.userId),
            async () => await mockDbQueryUser({ userId: decoded.userId })
          );
        } catch (e) {}
      }

      if (user && (user.plan === 'pro' || user.role === 'admin')) {
        hasAccess = true;
      }

      if (!hasAccess) {
        component.componentCode = `// 🚨 PRO GATEWAY: "${component.name}" is a premium Marvel widget.\n// Visit ${process.env.CLIENT_URL || 'http://localhost:5173'}/pricing to upgrade and fetch component code.`;
        component.previewCode = `// 🚨 PRO GATEWAY: Install requires a Pro subscription.`;
        component.isLocked = true;
      }
    }

    res.json(component);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching component details', error: error.message });
  }
});

// POST /api/components/:slug/view - Increment view count
router.post('/:slug/view', async (req, res) => {
  const { slug } = req.params;

  const dbOp = async () => {
    const component = await Component.findOneAndUpdate(
      { slug, isPublished: true },
      { $inc: { viewCount: 1 } },
      { new: true }
    );
    return component ? component.viewCount : null;
  };

  const mockFallback = async () => {
    const component = mockComponents.find(c => c.slug === slug);
    if (!component) return null;
    component.viewCount = (component.viewCount || 0) + 1;
    return component.viewCount;
  };

  try {
    const viewCount = await runWithMockFallback(dbOp, mockFallback);
    if (viewCount === null) {
      return res.status(404).json({ message: 'Component not found' });
    }
    res.json({ success: true, viewCount });
  } catch (error) {
    res.status(500).json({ message: 'Error incrementing view count', error: error.message });
  }
});

// POST /api/components/:slug/copy - Increment copy count (auth required)
router.post('/:slug/copy', protect, async (req, res) => {
  const { slug } = req.params;

  const dbOp = async () => {
    const component = await Component.findOneAndUpdate(
      { slug, isPublished: true },
      { $inc: { copyCount: 1 } },
      { new: true }
    );
    return component ? component.copyCount : null;
  };

  const mockFallback = async () => {
    const component = mockComponents.find(c => c.slug === slug);
    if (!component) return null;
    component.copyCount = (component.copyCount || 0) + 1;
    return component.copyCount;
  };

  try {
    const copyCount = await runWithMockFallback(dbOp, mockFallback);
    if (copyCount === null) {
      return res.status(404).json({ message: 'Component not found' });
    }
    res.json({ success: true, copyCount });
  } catch (error) {
    res.status(500).json({ message: 'Error incrementing copy count', error: error.message });
  }
});

export default router;

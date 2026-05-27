import express from 'express';
import Component from '../models/Component.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/adminOnly.js';

const router = express.Router();

// Apply auth + admin guard to all admin endpoints
router.use(protect);
router.use(adminOnly);

// ----------------------------------------------------
// TELEMETRY / DASHBOARD STATS
// ----------------------------------------------------

// GET /api/admin/stats - Get global admin insights
router.get('/stats', async (req, res) => {
  try {
    const totalComponents = await Component.countDocuments();
    const totalUsers = await User.countDocuments();
    const proUsers = await User.countDocuments({ plan: 'pro' });

    // Aggregate total revenue
    const revenueAggregate = await Subscription.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const totalRevenue = revenueAggregate.length > 0 ? revenueAggregate[0].total : 0;

    // Log records lists
    const recentSignups = await User.find()
      .select('name email provider plan createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentPayments = await Subscription.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    const mostViewedComponents = await Component.find()
      .populate('category', 'name')
      .sort({ viewCount: -1 })
      .limit(5);

    res.json({
      totalComponents,
      totalUsers,
      proUsers,
      totalRevenue,
      recentSignups,
      recentPayments,
      mostViewedComponents,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error aggregating dashboard stats', error: error.message });
  }
});

// ----------------------------------------------------
// USER ACTIONS
// ----------------------------------------------------

// GET /api/admin/users - Get users with pagination and plan filters
router.get('/users', async (req, res) => {
  try {
    const { plan, search } = req.query;
    const query = {};

    if (plan && plan !== 'all') {
      query.plan = plan;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(query).sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user list', error: error.message });
  }
});

// PUT /api/admin/users/:id/plan - Manually toggle or set user subscription plan
router.put('/users/:id/plan', async (req, res) => {
  const { plan } = req.body;
  if (!['free', 'pro'].includes(plan)) {
    return res.status(400).json({ message: 'Invalid plan type' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.plan = plan;
    if (plan === 'pro') {
      user.subscriptionStatus = 'active';
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 30);
      user.subscriptionExpiry = expiry;
    } else {
      user.subscriptionStatus = 'none';
      user.subscriptionExpiry = undefined;
    }
    
    await user.save();
    res.json({ success: true, message: `User plan set to ${plan} successfully`, user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user plan', error: error.message });
  }
});

// GET /api/admin/components - Get all components (both drafts and published) for admin console
router.get('/components', async (req, res) => {
  try {
    const components = await Component.find()
      .populate('category', 'name slug color')
      .sort({ createdAt: -1 });
    res.json(components);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving components list', error: error.message });
  }
});

// GET /api/admin/components/:id - Get single component details by ID (including unpublished)
router.get('/components/:id', async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
    res.json(component);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching component detail', error: error.message });
  }
});

// POST /api/admin/components - Create a new UI Component
router.post('/components', async (req, res) => {
  try {
    const component = new Component(req.body);
    await component.save();
    res.status(201).json({ success: true, message: 'Component created successfully', component });
  } catch (error) {
    res.status(400).json({ message: 'Error creating component', error: error.message });
  }
});

// PUT /api/admin/components/:id - Update component details
router.put('/components/:id', async (req, res) => {
  try {
    const component = await Component.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
    res.json({ success: true, message: 'Component updated successfully', component });
  } catch (error) {
    res.status(400).json({ message: 'Error updating component', error: error.message });
  }
});

// DELETE /api/admin/components/:id - Delete a component
router.delete('/components/:id', async (req, res) => {
  try {
    const component = await Component.findByIdAndDelete(req.params.id);
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
    res.json({ success: true, message: 'Component deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting component', error: error.message });
  }
});

// PATCH /api/admin/components/:id/publish - Toggle component publish status
router.patch('/components/:id/publish', async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }

    component.isPublished = !component.isPublished;
    await component.save();
    res.json({ success: true, isPublished: component.isPublished, message: `Component publish state set to ${component.isPublished}` });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling publish state', error: error.message });
  }
});

// ----------------------------------------------------
// CATEGORIES CRUD (Admin Only)
// ----------------------------------------------------

// POST /api/admin/categories - Create category
router.post('/categories', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ success: true, message: 'Category created successfully', category });
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error: error.message });
  }
});

// PUT /api/admin/categories/:id - Update category
router.put('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category updated successfully', category });
  } catch (error) {
    res.status(400).json({ message: 'Error updating category', error: error.message });
  }
});

// DELETE /api/admin/categories/:id - Delete category
router.delete('/categories/:id', async (req, res) => {
  try {
    // Check if components exist in this category before deleting
    const componentCount = await Component.countDocuments({ category: req.params.id });
    if (componentCount > 0) {
      return res.status(400).json({ message: 'Cannot delete category containing components. Move or delete components first.' });
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
});

export default router;

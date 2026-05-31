import express from 'express';
import Component from '../models/Component.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/adminOnly.js';
import { mockComponents, mockCategories, mockUsers, mockSubscriptions, mockDbUpdateUserPlan } from '../config/mockDb.js';
import { runWithMockFallback } from '../config/db.js';

const router = express.Router();

// Apply auth + admin guard to all admin endpoints
router.use(protect);
router.use(adminOnly);

// ----------------------------------------------------
// TELEMETRY / DASHBOARD STATS
// ----------------------------------------------------

// GET /api/admin/stats - Get global admin insights
router.get('/stats', async (req, res) => {
  const dbOp = async () => {
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

    return {
      totalComponents,
      totalUsers,
      proUsers,
      totalRevenue,
      recentSignups,
      recentPayments,
      mostViewedComponents,
    };
  };

  const mockFallback = async () => {
    const totalComponents = mockComponents.length;
    const totalUsers = mockUsers.length;
    const proUsers = mockUsers.filter(u => u.plan === 'pro').length;
    const totalRevenue = mockSubscriptions.reduce((sum, sub) => sum + (sub.amount || 0), 0);

    const recentSignups = [...mockUsers]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 5);

    const recentPayments = [...mockSubscriptions]
      .map(sub => {
        const user = mockUsers.find(u => u._id === sub.userId);
        return {
          ...sub,
          userId: user ? { _id: user._id, name: user.name, email: user.email } : null
        };
      })
      .sort((a, b) => new Date(b.startDate || 0) - new Date(a.startDate || 0))
      .slice(0, 5);

    const mostViewedComponents = [...mockComponents]
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 5);

    return {
      totalComponents,
      totalUsers,
      proUsers,
      totalRevenue,
      recentSignups,
      recentPayments,
      mostViewedComponents,
    };
  };

  try {
    const stats = await runWithMockFallback(dbOp, mockFallback);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error aggregating dashboard stats', error: error.message });
  }
});

// ----------------------------------------------------
// USER ACTIONS
// ----------------------------------------------------

// GET /api/admin/users - Get users with pagination and plan filters
router.get('/users', async (req, res) => {
  const { plan, search } = req.query;

  const dbOp = async () => {
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
    return await User.find(query).sort({ createdAt: -1 });
  };

  const mockFallback = async () => {
    let filtered = [...mockUsers];
    if (plan && plan !== 'all') {
      filtered = filtered.filter(u => u.plan === plan);
    }
    if (search) {
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(search.toLowerCase()) || 
        u.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  };

  try {
    const users = await runWithMockFallback(dbOp, mockFallback);
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

  const dbOp = async () => {
    const user = await User.findById(req.params.id);
    if (!user) return null;

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
    return user;
  };

  const mockFallback = async () => {
    return await mockDbUpdateUserPlan(req.params.id, plan);
  };

  try {
    const user = await runWithMockFallback(dbOp, mockFallback);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, message: `User plan set to ${plan} successfully`, user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user plan', error: error.message });
  }
});

// GET /api/admin/components - Get all components (both drafts and published) for admin console
router.get('/components', async (req, res) => {
  const dbOp = async () => {
    return await Component.find()
      .populate('category', 'name slug color')
      .sort({ createdAt: -1 });
  };

  const mockFallback = async () => {
    return mockComponents;
  };

  try {
    const components = await runWithMockFallback(dbOp, mockFallback);
    res.json(components);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving components list', error: error.message });
  }
});

// GET /api/admin/components/:id - Get single component details by ID (including unpublished)
router.get('/components/:id', async (req, res) => {
  const dbOp = async () => {
    return await Component.findById(req.params.id);
  };

  const mockFallback = async () => {
    return mockComponents.find(c => c._id === req.params.id);
  };

  try {
    const component = await runWithMockFallback(dbOp, mockFallback);
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
  const dbOp = async () => {
    const component = new Component(req.body);
    await component.save();
    return component;
  };

  const mockFallback = async () => {
    const category = mockCategories.find(c => c._id === req.body.category || c.slug === req.body.category);
    const newComponent = {
      _id: 'comp_' + Math.random().toString(36).substring(2, 9),
      ...req.body,
      category: category || req.body.category,
      viewCount: 0,
      copyCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockComponents.push(newComponent);
    return newComponent;
  };

  try {
    const component = await runWithMockFallback(dbOp, mockFallback);
    res.status(201).json({ success: true, message: 'Component created successfully', component });
  } catch (error) {
    res.status(400).json({ message: 'Error creating component', error: error.message });
  }
});

// PUT /api/admin/components/:id - Update component details
router.put('/components/:id', async (req, res) => {
  const dbOp = async () => {
    return await Component.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  };

  const mockFallback = async () => {
    const index = mockComponents.findIndex(c => c._id === req.params.id);
    if (index === -1) return null;
    const category = mockCategories.find(c => c._id === req.body.category || c.slug === req.body.category);
    mockComponents[index] = {
      ...mockComponents[index],
      ...req.body,
      category: category || req.body.category || mockComponents[index].category,
      updatedAt: new Date(),
    };
    return mockComponents[index];
  };

  try {
    const component = await runWithMockFallback(dbOp, mockFallback);
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
  const dbOp = async () => {
    return await Component.findByIdAndDelete(req.params.id);
  };

  const mockFallback = async () => {
    const index = mockComponents.findIndex(c => c._id === req.params.id);
    if (index === -1) return null;
    const deleted = mockComponents[index];
    mockComponents.splice(index, 1);
    return deleted;
  };

  try {
    const component = await runWithMockFallback(dbOp, mockFallback);
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
  const dbOp = async () => {
    const component = await Component.findById(req.params.id);
    if (!component) return null;
    component.isPublished = !component.isPublished;
    await component.save();
    return component;
  };

  const mockFallback = async () => {
    const component = mockComponents.find(c => c._id === req.params.id);
    if (!component) return null;
    component.isPublished = !component.isPublished;
    return component;
  };

  try {
    const component = await runWithMockFallback(dbOp, mockFallback);
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
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
  const dbOp = async () => {
    const category = new Category(req.body);
    await category.save();
    return category;
  };

  const mockFallback = async () => {
    const newCategory = {
      _id: 'cat_' + Math.random().toString(36).substring(2, 9),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockCategories.push(newCategory);
    return newCategory;
  };

  try {
    const category = await runWithMockFallback(dbOp, mockFallback);
    res.status(201).json({ success: true, message: 'Category created successfully', category });
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error: error.message });
  }
});

// PUT /api/admin/categories/:id - Update category
router.put('/categories/:id', async (req, res) => {
  const dbOp = async () => {
    return await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  };

  const mockFallback = async () => {
    const index = mockCategories.findIndex(c => c._id === req.params.id);
    if (index === -1) return null;
    mockCategories[index] = {
      ...mockCategories[index],
      ...req.body,
      updatedAt: new Date(),
    };
    return mockCategories[index];
  };

  try {
    const category = await runWithMockFallback(dbOp, mockFallback);
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
  const dbOp = async () => {
    // Check if components exist in this category before deleting
    const componentCount = await Component.countDocuments({ category: req.params.id });
    if (componentCount > 0) {
      return { error: 'Cannot delete category containing components. Move or delete components first.' };
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return null;
    return category;
  };

  const mockFallback = async () => {
    const componentCount = mockComponents.filter(c => c.category?._id === req.params.id || c.category?.slug === req.params.id).length;
    if (componentCount > 0) {
      return { error: 'Cannot delete category containing components. Move or delete components first.' };
    }

    const index = mockCategories.findIndex(c => c._id === req.params.id);
    if (index === -1) return null;
    const deleted = mockCategories[index];
    mockCategories.splice(index, 1);
    return deleted;
  };

  try {
    const result = await runWithMockFallback(dbOp, mockFallback);
    if (result === null) {
      return res.status(404).json({ message: 'Category not found' });
    }
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
});

export default router;

import express from 'express';
import Category from '../models/Category.js';
import Component from '../models/Component.js';

const router = express.Router();

// GET /api/categories - Get all active categories with component count
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ order: 1 });
    
    // Calculate component counts for each category
    const categoryListWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Component.countDocuments({ category: cat._id, isPublished: true });
        return {
          ...cat.toObject(),
          count
        };
      })
    );
    
    res.json(categoryListWithCount);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

export default router;

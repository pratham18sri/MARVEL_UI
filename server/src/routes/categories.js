import express from 'express';
import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Component from '../models/Component.js';
import { mockCategories, mockComponents } from '../config/mockDb.js';
import { runWithMockFallback } from '../config/db.js';

const router = express.Router();

// GET /api/categories - Get all active categories with component count
router.get('/', async (req, res) => {
  const dbOp = async () => {
    const categories = await Category.find({ isActive: true }).sort({ order: 1 });
    
    // Calculate component counts for each category
    return await Promise.all(
      categories.map(async (cat) => {
        const count = await Component.countDocuments({ category: cat._id, isPublished: true });
        return {
          ...cat.toObject(),
          count
        };
      })
    );
  };

  const mockFallback = async () => {
    return mockCategories.map((cat) => {
      const count = mockComponents.filter((comp) => comp.category?._id === cat._id || comp.category?.slug === cat.slug).length;
      return {
        ...cat,
        count
      };
    });
  };

  try {
    const result = await runWithMockFallback(dbOp, mockFallback);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

export default router;

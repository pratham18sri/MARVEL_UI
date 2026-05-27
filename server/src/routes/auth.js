import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Helper to generate JWT and set cookie
const sendTokenResponse = (user, res, redirectUrl) => {
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role, plan: user.plan },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('pui_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  if (redirectUrl) {
    res.redirect(`${redirectUrl}/dashboard`);
  } else {
    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        plan: user.plan,
        apiKey: user.apiKey,
        subscriptionStatus: user.subscriptionStatus,
      },
    });
  }
};

// Developer Mock Login for quick testing
router.post('/mock-login', async (req, res) => {
  const { email, role, plan } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required for mock login' });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: email.split('@')[0].toUpperCase(),
        email,
        avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${email}`,
        provider: 'local',
        providerId: 'mock_local_' + Math.random().toString(36).substring(2, 9),
        role: role || 'user',
        plan: plan || 'free',
      });
    } else {
      if (role) user.role = role;
      if (plan) user.plan = plan;
      await user.save();
    }
    sendTokenResponse(user, res);
  } catch (error) {
    res.status(500).json({ message: 'Mock login error', error: error.message });
  }
});

// GET /api/auth/github
router.get('/github', (req, res, next) => {
  const redirect = req.query.redirect || process.env.CLIENT_URL;
  const state = Buffer.from(JSON.stringify({ redirect })).toString('base64');
  passport.authenticate('github', { scope: ['user:email'], state })(req, res, next);
});

// GET /api/auth/github/callback
router.get('/github/callback', (req, res, next) => {
  const stateQuery = req.query.state;
  let redirectUrl = process.env.CLIENT_URL;

  if (stateQuery) {
    try {
      const parsed = JSON.parse(Buffer.from(stateQuery, 'base64').toString());
      if (parsed.redirect) redirectUrl = parsed.redirect;
    } catch (e) {
      console.error('Failed to parse OAuth state:', e);
    }
  }

  passport.authenticate('github', { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect(`${redirectUrl}/login?error=auth_failed`);
    }
    sendTokenResponse(user, res, redirectUrl);
  })(req, res, next);
});

// GET /api/auth/google
router.get('/google', (req, res, next) => {
  const redirect = req.query.redirect || process.env.CLIENT_URL;
  const state = Buffer.from(JSON.stringify({ redirect })).toString('base64');
  passport.authenticate('google', { scope: ['profile', 'email'], state })(req, res, next);
});

// GET /api/auth/google/callback
router.get('/google/callback', (req, res, next) => {
  const stateQuery = req.query.state;
  let redirectUrl = process.env.CLIENT_URL;

  if (stateQuery) {
    try {
      const parsed = JSON.parse(Buffer.from(stateQuery, 'base64').toString());
      if (parsed.redirect) redirectUrl = parsed.redirect;
    } catch (e) {
      console.error('Failed to parse OAuth state:', e);
    }
  }

  passport.authenticate('google', { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect(`${redirectUrl}/login?error=auth_failed`);
    }
    sendTokenResponse(user, res, redirectUrl);
  })(req, res, next);
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('pui_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res.json({ success: true, message: 'Logged out successfully' });
});

// GET /api/auth/me
router.get('/me', protect, (req, res) => {
  res.json({
    success: true,
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      role: req.user.role,
      plan: req.user.plan,
      apiKey: req.user.apiKey,
      subscriptionStatus: req.user.subscriptionStatus,
      subscriptionExpiry: req.user.subscriptionExpiry,
    },
  });
});

export default router;

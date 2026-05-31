import express from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import { protect } from '../middleware/auth.js';
import { mockDbUpdateUserPlan, mockSubscriptions } from '../config/mockDb.js';
import { runWithMockFallback } from '../config/db.js';

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mockKeyId123',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'mockKeySecret456789',
});

// GET /api/payments/plans
router.get('/plans', (req, res) => {
  res.json([
    {
      id: 'free',
      name: 'Free Shield',
      price: 0,
      period: 'lifetime',
      features: [
        'Access to 4 basic UI categories',
        'Unlimited copy-pasting for free components',
        'Standard community support',
        'CLI tools usage (Free widgets only)'
      ]
    },
    {
      id: 'pro_monthly',
      name: 'Arc Pro Monthly',
      price: 199,
      period: 'month',
      features: [
        'Access to all 8 UI categories (including Overlays, Effects, Data)',
        'Full React codebases and interactive previews',
        'Premium developer CLI tokens',
        'Continuous UI animations & Framer Motion templates',
        'Infinity stone premium support'
      ]
    },
    {
      id: 'pro_yearly',
      name: 'Arc Pro Yearly',
      price: 1499,
      period: 'year',
      features: [
        'All Pro Monthly features',
        'Save 37% compared to monthly',
        'Early access to new MCU component rollouts',
        'Priority feature requests',
        'Exclusive premium documentation assets'
      ]
    }
  ]);
});

// POST /api/payments/create-order
router.post('/create-order', protect, async (req, res) => {
  const { plan } = req.body;

  let amount = 0;
  if (plan === 'pro_monthly') {
    amount = 199;
  } else if (plan === 'pro_yearly') {
    amount = 1499;
  } else {
    return res.status(400).json({ message: 'Invalid subscription plan' });
  }

  const options = {
    amount: amount * 100, // Razorpay works in paisa
    currency: 'INR',
    receipt: `receipt_user_${req.user._id}_${Date.now()}`,
  };

  try {
    // Check if we are running with mock developer keys
    if (process.env.RAZORPAY_KEY_ID === 'rzp_test_mockKeyId123' || !process.env.RAZORPAY_KEY_ID) {
      const mockOrder = {
        id: `order_mock_${Math.random().toString(36).substring(2, 12)}`,
        entity: 'order',
        amount: options.amount,
        amount_paid: 0,
        amount_due: options.amount,
        currency: 'INR',
        receipt: options.receipt,
        status: 'created',
        attempts: 0,
        notes: [],
        created_at: Math.floor(Date.now() / 1000),
        isMock: true,
      };
      return res.json(mockOrder);
    }

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment order', error: error.message });
  }
});

// POST /api/payments/verify
router.post('/verify', protect, async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, signature, plan } = req.body;

  if (!razorpayOrderId || !razorpayPaymentId || !signature) {
    return res.status(400).json({ message: 'Missing payment verification tokens' });
  }

  try {
    let isValid = false;

    // Handle developer mock order validation bypass
    if (razorpayOrderId.startsWith('order_mock_')) {
      isValid = true;
    } else {
      const text = `${razorpayOrderId}|${razorpayPaymentId}`;
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(text)
        .digest('hex');

      isValid = generatedSignature === signature;
    }

    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Payment signature verification failed' });
    }

    // Determine sub duration
    const subDuration = plan === 'pro_yearly' ? 365 : 30; // in days
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + subDuration);

    let amount = plan === 'pro_yearly' ? 1499 : 199;

    // Update User and Create Subscription Log (Database & Mock Fallback)
    const dbOp = async () => {
      const user = await User.findById(req.user._id);
      if (!user) throw new Error('User not found in database');
      user.plan = 'pro';
      user.subscriptionId = razorpayPaymentId;
      user.subscriptionStatus = 'active';
      user.subscriptionExpiry = expiryDate;
      await user.save();

      await Subscription.create({
        userId: req.user._id,
        razorpayOrderId,
        razorpayPaymentId,
        plan,
        amount,
        status: 'active',
        startDate: new Date(),
        endDate: expiryDate,
      });

      return user;
    };

    const mockFallback = async () => {
      const user = await mockDbUpdateUserPlan(req.user._id, 'pro');
      if (user) {
        user.subscriptionId = razorpayPaymentId;
      }
      mockSubscriptions.push({
        _id: 'sub_' + Math.random().toString(36).substring(2, 9),
        userId: req.user._id,
        razorpayOrderId,
        razorpayPaymentId,
        plan,
        amount,
        status: 'active',
        startDate: new Date(),
        endDate: expiryDate,
      });
      return user;
    };

    const user = await runWithMockFallback(dbOp, mockFallback);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'Payment verified and Plan updated to Pro successfully!',
      user: {
        _id: user._id,
        plan: user.plan,
        subscriptionStatus: user.subscriptionStatus,
        subscriptionExpiry: user.subscriptionExpiry,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying payment signature', error: error.message });
  }
});

// Webhook endpoint (POST /api/payments/webhook)
router.post('/webhook', async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  
  if (secret) {
    const signature = req.headers['x-razorpay-signature'];
    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).send('Invalid signature');
    }
  }

  const event = req.body.event;
  // Handle subscription events (like payment.failed or subscription.charged)
  // For demo, we acknowledge the event
  res.json({ status: 'ok' });
});

export default router;

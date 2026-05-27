import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Check for API key (used by CLI or API clients)
  const apiKey = req.headers['x-api-key'] || req.query.key || req.headers['pratham-ui-key'];
  if (apiKey) {
    try {
      const user = await User.findOne({ apiKey });
      if (user) {
        req.user = user;
        return next();
      }
    } catch (err) {
      console.error('API key auth error:', err);
    }
  }

  // 2. Check for cookie JWT token
  if (req.cookies && req.cookies.pui_token) {
    token = req.cookies.pui_token;
  } 
  // 3. Fallback to Authorization Header (Bearer token)
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-apiKey');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('JWT auth error:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

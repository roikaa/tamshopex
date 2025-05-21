// utils/authMiddleware.js

import jwt from 'jsonwebtoken';
import { PrismaClient } from '../app/generated/prisma';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// Middleware to verify JWT token
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid token. User not found.' });
    }

    // Add user to request object
    req.user = user;
    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }

    console.error('Token verification error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Middleware to check if user is admin
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  next();
};

// Middleware to check if user owns the resource or is admin
export const requireOwnershipOrAdmin = (userIdField = 'userId') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const resourceUserId = req.body[userIdField] || req.query[userIdField];
    
    // Allow if user is admin or owns the resource
    if (req.user.role === 'ADMIN' || req.user.id === resourceUserId) {
      next();
    } else {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }
  };
};

// Helper function to create protected handler
export const withAuth = (handler, options = {}) => {
  return async (req, res) => {
    try {
      // Apply authentication middleware
      await new Promise((resolve, reject) => {
        verifyToken(req, res, (error) => {
          if (error) reject(error);
          else resolve();
        });
      });

      // Apply admin check if required
      if (options.requireAdmin) {
        await new Promise((resolve, reject) => {
          requireAdmin(req, res, (error) => {
            if (error) reject(error);
            else resolve();
          });
        });
      }

      // Apply ownership check if required
      if (options.requireOwnership) {
        await new Promise((resolve, reject) => {
          requireOwnershipOrAdmin(options.userIdField)(req, res, (error) => {
            if (error) reject(error);
            else resolve();
          });
        });
      }

      // Call the original handler
      return handler(req, res);

    } catch (error) {
      // Error was already handled by middleware
      return;
    }
  };
};

// Helper function to get user from token without throwing errors
export const getUserFromToken = async (req) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token || !process.env.JWT_SECRET) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });

    return user;
  } catch (error) {
    return null;
  }
};

// pages/api/users.js

import { PrismaClient } from '../../app/generated/prisma';
import bcrypt from 'bcryptjs';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        return await handleGet(req, res);
      case 'POST':
        return await handlePost(req, res);
      case 'PUT':
        return await handlePut(req, res);
      case 'DELETE':
        return await handleDelete(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Users API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  } finally {
    if (process.env.NODE_ENV === 'production') {
      await prisma.$disconnect();
    }
  }
}

// GET /api/users - Get all users or single user by ID (Admin only)
async function handleGet(req, res) {
  const { id, includeOrders } = req.query;

  try {
    if (id) {
      // Get single user by ID
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          orders: includeOrders === 'true' ? {
            include: {
              items: {
                include: {
                  product: true
                }
              }
            }
          } : false
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
    } else {
      // Get all users (excluding passwords)
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: { orders: true }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return res.status(200).json(users);
    }
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}

// POST /api/users - Create a new user (Registration)
async function handlePost(req, res) {
  const { email, name, password, role = 'CUSTOMER' } = req.body;

  // Validation
  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return res.status(400).json({ 
      error: 'Valid email is required' 
    });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ 
      error: 'Password must be at least 6 characters long' 
    });
  }

  if (name && (typeof name !== 'string' || name.trim().length === 0)) {
    return res.status(400).json({ 
      error: 'Name must be a non-empty string if provided' 
    });
  }

  if (!['ADMIN', 'CUSTOMER'].includes(role)) {
    return res.status(400).json({ 
      error: 'Role must be either ADMIN or CUSTOMER' 
    });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(409).json({ 
        error: 'User with this email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name: name?.trim() || null,
        password: hashedPassword,
        role
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return res.status(201).json(user);
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

// PUT /api/users - Update user
async function handlePut(req, res) {
  const { id, email, name, password, role } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  // Validation for provided fields
  if (email !== undefined && (!email || typeof email !== 'string' || !isValidEmail(email))) {
    return res.status(400).json({ 
      error: 'Valid email is required' 
    });
  }

  if (password !== undefined && (!password || typeof password !== 'string' || password.length < 6)) {
    return res.status(400).json({ 
      error: 'Password must be at least 6 characters long' 
    });
  }

  if (name !== undefined && name !== null && (typeof name !== 'string' || name.trim().length === 0)) {
    return res.status(400).json({ 
      error: 'Name must be a non-empty string if provided' 
    });
  }

  if (role !== undefined && !['ADMIN', 'CUSTOMER'].includes(role)) {
    return res.status(400).json({ 
      error: 'Role must be either ADMIN or CUSTOMER' 
    });
  }

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if email is already taken by another user
    if (email && email.toLowerCase() !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (emailExists) {
        return res.status(409).json({ 
          error: 'Email is already taken by another user' 
        });
      }
    }

    // Prepare update data
    const updateData = {};
    if (email !== undefined) updateData.email = email.toLowerCase();
    if (name !== undefined) updateData.name = name?.trim() || null;
    if (role !== undefined) updateData.role = role;
    
    // Hash new password if provided
    if (password !== undefined) {
      updateData.password = await bcrypt.hash(password, 12);
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return res.status(200).json(user);
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

// DELETE /api/users - Delete user
async function handleDelete(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
      include: {
        orders: true
      }
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user has orders
    if (existingUser.orders.length > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete user with existing orders. Consider deactivating instead.' 
      });
    }

    await prisma.user.delete({
      where: { id }
    });

    return res.status(200).json({ 
      message: 'User deleted successfully',
      deletedUser: {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name
      }
    });
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
}

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// pages/api/category.js

import { PrismaClient } from '../../app/generated/prisma';

const prisma = new PrismaClient();

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
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}

// GET /api/category - Get all categories or single category by ID
async function handleGet(req, res) {
  const { id, includeProducts } = req.query;

  try {
    if (id) {
      // Get single category by ID
      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          products: includeProducts === 'true' ? {
            select: {
              id: true,
              name: true,
              price: true,
              stock: true,
              imageUrl: true
            }
          } : false,
          _count: {
            select: { products: true }
          }
        }
      });

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      return res.status(200).json(category);
    } else {
      // Get all categories
      const categories = await prisma.category.findMany({
        include: {
          _count: {
            select: { products: true }
          }
        },
        orderBy: {
          name: 'asc'
        }
      });

      return res.status(200).json(categories);
    }
  } catch (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
}

// POST /api/category - Create a new category
async function handlePost(req, res) {
  const { name, description } = req.body;

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Category name is required and must be a non-empty string' 
    });
  }

  if (name.trim().length > 100) {
    return res.status(400).json({ 
      error: 'Category name must be 100 characters or less' 
    });
  }

  if (description && typeof description !== 'string') {
    return res.status(400).json({ 
      error: 'Description must be a string' 
    });
  }

  try {
    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null
      },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    return res.status(201).json(category);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ 
        error: 'A category with this name already exists' 
      });
    }
    throw new Error(`Failed to create category: ${error.message}`);
  }
}

// PUT /api/category - Update a category
async function handlePut(req, res) {
  const { id, name, description } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Category ID is required' });
  }

  // Validation
  if (name !== undefined) {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Category name must be a non-empty string' 
      });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({ 
        error: 'Category name must be 100 characters or less' 
      });
    }
  }

  if (description !== undefined && description !== null && typeof description !== 'string') {
    return res.status(400).json({ 
      error: 'Description must be a string or null' 
    });
  }

  try {
    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id }
    });

    if (!existingCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Prepare update data
    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description?.trim() || null;

    const category = await prisma.category.update({
      where: { id },
      data: updateData,
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    return res.status(200).json(category);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ 
        error: 'A category with this name already exists' 
      });
    }
    throw new Error(`Failed to update category: ${error.message}`);
  }
}

// DELETE /api/category - Delete a category
async function handleDelete(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Category ID is required' });
  }

  try {
    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    if (!existingCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Check if category has products
    if (existingCategory._count.products > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete category that contains products. Please remove or reassign products first.' 
      });
    }

    await prisma.category.delete({
      where: { id }
    });

    return res.status(200).json({ 
      message: 'Category deleted successfully',
      deletedCategory: existingCategory
    });
  } catch (error) {
    throw new Error(`Failed to delete category: ${error.message}`);
  }
}

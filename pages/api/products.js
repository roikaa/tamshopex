// pages/api/products.js
// pages/api/products.js

import { PrismaClient, Prisma } from "../../app/generated/prisma";

// Create a single PrismaClient instance and reuse it
let prisma;

// Initialize PrismaClient only if it's not already initialized
// This prevents issues with hot reloading in development
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to maintain a singleton instance
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default async function handler(req, res) {
  const { method } = req;

  try {
    // Check if Prisma is properly initialized
    if (!prisma) {
      throw new Error("Prisma client not initialized");
    }
    
    switch (method) {
      case 'GET':
        return await handleGetProducts(req, res);
        
      case 'POST':
        // Create a new product (would require authentication/authorization)
        // For now, just return a 401 unauthorized
        return res.status(401).json({ message: "Unauthorized" });
        
      default:
        // Method not allowed
        return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error("API Error:", error);
    
    // Check for specific Prisma errors
    if (error.message.includes("PrismaClient") || 
        error.message.includes("prisma") || 
        error.code === 'P1001' || 
        error.code === 'P1012') {
      return res.status(500).json({ 
        error: "Database connection error", 
        message: "There was a problem connecting to the database. Please try again later.",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    
    // Generic server error
    return res.status(500).json({ 
      error: "Internal server error", 
      message: "An unexpected error occurred",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

async function handleGetProducts(req, res) {
  const { 
    search, 
    categoryId, 
    minPrice, 
    maxPrice, 
    sortBy, 
    inStock,
    page = '1',
    limit = '50'
  } = req.query;

  try {
    // Build the where clause based on filters
    const where = {};
    
    // Text search in name and description
    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ];
    }
    
    // Category filter
    if (categoryId) {
      where.categoryId = categoryId;
    }
    
    // Price range filters
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        const min = parseFloat(minPrice);
        if (!isNaN(min) && min >= 0) {
          where.price.gte = min;
        }
      }
      if (maxPrice) {
        const max = parseFloat(maxPrice);
        if (!isNaN(max) && max >= 0) {
          where.price.lte = max;
        }
      }
    }
    
    // In stock filter
    if (inStock === 'true') {
      where.stock = {
        gt: 0
      };
    }
    
    // Build the orderBy clause based on sortBy
    let orderBy = {};
    switch (sortBy) {
      case 'price_asc':
        orderBy = { price: 'asc' };
        break;
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;
      case 'name_asc':
        orderBy = { name: 'asc' };
        break;
      case 'name_desc':
        orderBy = { name: 'desc' };
        break;
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'relevance':
      default:
        // For relevance, we'll use name ascending as default
        // In a real app, you might want to implement relevance scoring
        orderBy = search ? { name: 'asc' } : { createdAt: 'desc' };
        break;
    }
    
    // Parse pagination parameters
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 50));
    const skip = (pageNum - 1) * limitNum;
    
    // Execute the query with pagination
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy,
        skip,
        take: limitNum
      }),
      prisma.product.count({ where })
    ]);
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;
    
    // Return products with metadata
    return res.status(200).json({
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage
      },
      // For backwards compatibility, also include total at root level
      total: totalCount
    });
    
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

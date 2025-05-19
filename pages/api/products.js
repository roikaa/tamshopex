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
        // Get all products with their categories
        const products = await prisma.product.findMany({
          include: {
            category: true,
          },
        });
        
        return res.status(200).json(products);
        
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

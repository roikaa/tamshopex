// pages/api/cart.js
import { PrismaClient, Prisma } from "../../app/generated/prisma";

// Create a single PrismaClient instance and reuse it
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
    if (!prisma) {
      throw new Error("Prisma client not initialized");
    }

    // For now, we'll use a session-based approach or user ID from request
    // In a real app, you'd get the user ID from authentication middleware
    const userId = req.body.userId || req.query.userId;

    if (!userId) {
      return res.status(401).json({ error: "User authentication required" });
    }

    switch (method) {
      case 'GET':
        // Get user's cart with products
        const cart = await prisma.cart.findFirst({
          where: { userId: parseInt(userId) },
          include: {
            items: {
              include: {
                product: {
                  include: {
                    category: true
                  }
                }
              }
            }
          }
        });

        if (!cart) {
          // Create empty cart for user
          const newCart = await prisma.cart.create({
            data: {
              userId: parseInt(userId)
            },
            include: {
              items: {
                include: {
                  product: {
                    include: {
                      category: true
                    }
                  }
                }
              }
            }
          });
          return res.status(200).json(newCart);
        }

        return res.status(200).json(cart);

      case 'POST':
        // Add item to cart
        const { productId, quantity = 1 } = req.body;

        if (!productId) {
          return res.status(400).json({ error: "Product ID is required" });
        }

        // Check if product exists
        const product = await prisma.product.findUnique({
          where: { id: parseInt(productId) }
        });

        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }

        // Find or create cart
        let cart = await prisma.cart.findFirst({
          where: { userId: parseInt(userId) }
        });

        if (!cart) {
          cart = await prisma.cart.create({
            data: { userId: parseInt(userId) }
          });
        }

        // Check if item already exists in cart
        const existingItem = await prisma.cartItem.findFirst({
          where: {
            cartId: cart.id,
            productId: parseInt(productId)
          }
        });

        if (existingItem) {
          // Update quantity
          const updatedItem = await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + parseInt(quantity) },
            include: {
              product: true
            }
          });
          return res.status(200).json(updatedItem);
        } else {
          // Create new cart item
          const newItem = await prisma.cartItem.create({
            data: {
              cartId: cart.id,
              productId: parseInt(productId),
              quantity: parseInt(quantity)
            },
            include: {
              product: true
            }
          });
          return res.status(201).json(newItem);
        }

      case 'PUT':
        // Update cart item quantity
        const { itemId, newQuantity } = req.body;

        if (!itemId || !newQuantity) {
          return res.status(400).json({ error: "Item ID and quantity are required" });
        }

        if (newQuantity <= 0) {
          // Remove item if quantity is 0 or negative
          await prisma.cartItem.delete({
            where: { id: parseInt(itemId) }
          });
          return res.status(200).json({ message: "Item removed from cart" });
        }

        const updatedItem = await prisma.cartItem.update({
          where: { id: parseInt(itemId) },
          data: { quantity: parseInt(newQuantity) },
          include: {
            product: true
          }
        });

        return res.status(200).json(updatedItem);

      case 'DELETE':
        // Clear cart or remove specific item
        const { itemId: deleteItemId } = req.query;

        if (deleteItemId) {
          // Remove specific item
          await prisma.cartItem.delete({
            where: { id: parseInt(deleteItemId) }
          });
          return res.status(200).json({ message: "Item removed from cart" });
        } else {
          // Clear entire cart
          const cart = await prisma.cart.findFirst({
            where: { userId: parseInt(userId) }
          });

          if (cart) {
            await prisma.cartItem.deleteMany({
              where: { cartId: cart.id }
            });
          }

          return res.status(200).json({ message: "Cart cleared" });
        }

      default:
        return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error("API Error:", error);

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

    return res.status(500).json({ 
      error: "Internal server error", 
      message: "An unexpected error occurred",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

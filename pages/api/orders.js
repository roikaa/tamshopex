// pages/api/orders.js
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
        // Get user's orders
        const orders = await prisma.order.findMany({
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
          },
          orderBy: {
            createdAt: 'desc'
          }
        });

        return res.status(200).json(orders);

      case 'POST':
        // Create a new order from cart
        const { 
          shippingAddress, 
          billingAddress, 
          paymentMethod,
          cartId 
        } = req.body;

        if (!shippingAddress || !paymentMethod) {
          return res.status(400).json({ 
            error: "Shipping address and payment method are required" 
          });
        }

        // Get user's cart
        const cart = await prisma.cart.findFirst({
          where: { 
            userId: parseInt(userId),
            ...(cartId && { id: parseInt(cartId) })
          },
          include: {
            items: {
              include: {
                product: true
              }
            }
          }
        });

        if (!cart || cart.items.length === 0) {
          return res.status(400).json({ error: "Cart is empty" });
        }

        // Calculate total
        const total = cart.items.reduce((sum, item) => {
          return sum + (item.product.price * item.quantity);
        }, 0);

        // Create order using transaction
        const result = await prisma.$transaction(async (prisma) => {
          // Create order
          const order = await prisma.order.create({
            data: {
              userId: parseInt(userId),
              total: total,
              status: 'PENDING',
              shippingAddress: JSON.stringify(shippingAddress),
              billingAddress: JSON.stringify(billingAddress || shippingAddress),
              paymentMethod: paymentMethod,
              items: {
                create: cart.items.map(item => ({
                  productId: item.productId,
                  quantity: item.quantity,
                  price: item.product.price
                }))
              }
            },
            include: {
              items: {
                include: {
                  product: true
                }
              }
            }
          });

          // Clear cart after successful order creation
          await prisma.cartItem.deleteMany({
            where: { cartId: cart.id }
          });

          return order;
        });

        return res.status(201).json(result);

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

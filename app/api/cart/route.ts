import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

// GET - Get cart items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const sessionId = searchParams.get('sessionId');

    if (!userId && !sessionId) {
      return NextResponse.json({ error: 'User ID or Session ID required' }, { status: 400 });
    }

    let cart = await prisma.cart.findFirst({
      where: userId ? { userId } : { sessionId },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!cart) {
      // Create empty cart if it doesn't exist
      cart = await prisma.cart.create({
        data: {
          userId: userId || undefined,
          sessionId: sessionId || undefined,
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
    }

    const total = cart.items.reduce((sum, item) => {
      return sum + (Number(item.product.price) * item.quantity);
    }, 0);

    return NextResponse.json({
      cart: {
        ...cart,
        total: total.toFixed(2)
      }
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

// POST - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, quantity = 1, userId, sessionId } = body;

    if (!productId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    if (!userId && !sessionId) {
      return NextResponse.json({ error: 'User ID or Session ID required' }, { status: 400 });
    }

    // Check if product exists and has enough stock
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (product.stock < quantity) {
      return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 });
    }

    // Find or create cart
    let cart = await prisma.cart.findFirst({
      where: userId ? { userId } : { sessionId }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: userId || undefined,
          sessionId: sessionId || undefined,
        }
      });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId
      }
    });

    let cartItem;
    if (existingItem) {
      // Update quantity
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: {
          product: true
        }
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity
        },
        include: {
          product: true
        }
      });
    }

    return NextResponse.json({ cartItem }, { status: 201 });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}

// PUT - Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartItemId, quantity } = body;

    if (!cartItemId || quantity < 0) {
      return NextResponse.json({ error: 'Valid cart item ID and quantity required' }, { status: 400 });
    }

    if (quantity === 0) {
      // Delete item if quantity is 0
      await prisma.cartItem.delete({
        where: { id: cartItemId }
      });
      return NextResponse.json({ message: 'Item removed from cart' });
    }

    // Check stock availability
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { product: true }
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
    }

    if (cartItem.product.stock < quantity) {
      return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 });
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
      include: {
        product: true
      }
    });

    return NextResponse.json({ cartItem: updatedItem });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

// DELETE - Remove item from cart
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cartItemId = searchParams.get('cartItemId');

    if (!cartItemId) {
      return NextResponse.json({ error: 'Cart item ID required' }, { status: 400 });
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId }
    });

    return NextResponse.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json({ error: 'Failed to remove from cart' }, { status: 500 });
  }
}

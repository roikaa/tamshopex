//products/[id].js
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../../app/generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    // Validate product ID (should be a UUID string)
    if (!id || Array.isArray(id) || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    // Basic UUID format validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ error: 'Invalid product ID format' });
    }

    // Fetch product from database with category information
    const product = await prisma.product.findUnique({
      where: {
        id: id
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}

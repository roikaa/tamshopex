// prisma/seed.ts
import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
 

  // Create categories
  const categories = [
    {
      name: 'Electronics',
      description: 'Electronic devices and accessories',
    },
    {
      name: 'Clothing',
      description: 'Apparel and fashion items',
    },
    {
      name: 'Home & Kitchen',
      description: 'Home decor and kitchen appliances',
    },
    {
      name: 'Books',
      description: 'Books and literature',
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  // Get created categories
  const electronicsCat = await prisma.category.findUnique({
    where: { name: 'Electronics' },
  });
  
  const clothingCat = await prisma.category.findUnique({
    where: { name: 'Clothing' },
  });
  
  const homeCat = await prisma.category.findUnique({
    where: { name: 'Home & Kitchen' },
  });
  
  const booksCat = await prisma.category.findUnique({
    where: { name: 'Books' },
  });

  // Create products
  const products = [
    {
      name: 'Smartphone X',
      description: 'Latest smartphone with advanced features',
      price: 699.99,
      imageUrl: 'https://placehold.co/400x300?text=Smartphone+X',
      stock: 50,
      categoryId: electronicsCat?.id || '',
    },
    {
      name: 'Laptop Pro',
      description: 'High-performance laptop for professionals',
      price: 1299.99,
      imageUrl: 'https://placehold.co/400x300?text=Laptop+Pro',
      stock: 30,
      categoryId: electronicsCat?.id || '',
    },
    {
      name: 'Wireless Earbuds',
      description: 'Premium sound quality with noise cancellation',
      price: 149.99,
      imageUrl: 'https://placehold.co/400x300?text=Wireless+Earbuds',
      stock: 100,
      categoryId: electronicsCat?.id || '',
    },
    {
      name: 'Casual T-Shirt',
      description: 'Comfortable cotton t-shirt for everyday wear',
      price: 19.99,
      imageUrl: 'https://placehold.co/400x300?text=Casual+T-Shirt',
      stock: 200,
      categoryId: clothingCat?.id || '',
    },
    {
      name: 'Denim Jeans',
      description: 'Classic denim jeans with modern fit',
      price: 49.99,
      imageUrl: 'https://placehold.co/400x300?text=Denim+Jeans',
      stock: 150,
      categoryId: clothingCat?.id || '',
    },
    {
      name: 'Coffee Maker',
      description: 'Automatic coffee maker for perfect brew every time',
      price: 89.99,
      imageUrl: 'https://placehold.co/400x300?text=Coffee+Maker',
      stock: 75,
      categoryId: homeCat?.id || '',
    },
    {
      name: 'Bedside Lamp',
      description: 'Modern bedside lamp with adjustable brightness',
      price: 34.99,
      imageUrl: 'https://placehold.co/400x300?text=Bedside+Lamp',
      stock: 120,
      categoryId: homeCat?.id || '',
    },
    {
      name: 'Fantasy Novel',
      description: 'Bestselling fantasy novel from renowned author',
      price: 12.99,
      imageUrl: 'https://placehold.co/400x300?text=Fantasy+Novel',
      stock: 200,
      categoryId: booksCat?.id || '',
    },
    {
      name: 'Cookbook',
      description: 'Collection of gourmet recipes from around the world',
      price: 24.99,
      imageUrl: 'https://placehold.co/400x300?text=Cookbook',
      stock: 85,
      categoryId: booksCat?.id || '',
    },
    {
      name: 'Smart Watch',
      description: 'Track your fitness and stay connected',
      price: 199.99,
      imageUrl: 'https://placehold.co/400x300?text=Smart+Watch',
      stock: 60,
      categoryId: electronicsCat?.id || '',
    },
    {
      name: 'Winter Jacket',
      description: 'Warm winter jacket with water-resistant material',
      price: 129.99,
      imageUrl: 'https://placehold.co/400x300?text=Winter+Jacket',
      stock: 70,
      categoryId: clothingCat?.id || '',
    },
    {
      name: 'Blender',
      description: 'High-speed blender for smoothies and more',
      price: 79.99,
      imageUrl: 'https://placehold.co/400x300?text=Blender',
      stock: 45,
      categoryId: homeCat?.id || '',
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(`Database has been seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

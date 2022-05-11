import { PrismaClient } from '@prisma/client';

export const productsToInsert = [
  {
    name: 'Product 1',
    image: 'https://api.lorem.space/image/shoes?w=150&h=150',
    category: {
      connect: {
        id: 1,
      },
    },
    description: 'Teste de Descricao',
    short_description: 'teste de short descricao',
    discount: 0,
    height: 0,
    price: 1000,
    weight: 10,
    width: 10,
    length: 10,
    is_featured: false,
  },
  {
    name: 'IPHONE 13 PRO MAX',
    image: 'https://api.lorem.space/image/shoes?w=150&h=150',
    category: {
      connect: {
        id: 2,
      },
    },
    description: 'IPHONE 13 PRO MAX VERDE',
    short_description: 'IPHONE 13 PRO MAX VERDE',
    discount: 0,
    height: 0,
    price: 5000,
    weight: 10,
    width: 10,
    length: 10,
    is_featured: true,
  },
];

export async function seedProducts() {
  const prima = new PrismaClient();
  for (const product of productsToInsert) {
    const prod = await prima.product.findFirst({
      where: { name: product.name },
    });
    if (!prod) {
      await prima.product.create({ data: product });
    }
  }
}

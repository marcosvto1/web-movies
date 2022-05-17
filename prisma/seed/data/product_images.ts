import { PrismaClient } from '@prisma/client';

export const productImagesToInsert = [
  {
    product_id: 1,
    description: 'Image 01 Product 1',
    image_url: 'https://api.lorem.space/image/shoes?w=150&h=150',
  },
  {
    product_id: 2,
    description: 'Image 01 Product 2',
    image_url: 'https://api.lorem.space/image/shoes?w=150&h=150',
  },
  {
    product_id: 2,
    description: 'Image 02 Product 2',
    image_url: 'https://api.lorem.space/image/shoes?w=150&h=150',
  },
];

export async function seedProductImages() {
  const prima = new PrismaClient();
  for (const imgProduct of productImagesToInsert) {
    const obj = await prima.productImage.findFirst({
      where: {
        description: imgProduct.description,
      },
    });
    if (!obj) {
      await prima.productImage.create({ data: imgProduct });
    }
  }
}

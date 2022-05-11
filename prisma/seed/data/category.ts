import { PrismaClient } from '@prisma/client';

export const categoriesToInsert = [
  {
    name: 'Category 1',
    image_url: 'https://api.lorem.space/image/shoes?w=150&h=150',
  },
  {
    name: 'Category 2',
    image_url: 'https://api.lorem.space/image/shoes?w=150&h=150',
  },
  {
    name: 'Category 3',
    image_url: 'https://api.lorem.space/image/shoes?w=150&h=150',
  },
];

export async function seedCategories() {
  const prima = new PrismaClient();
  for (const category of categoriesToInsert) {
    const cat = await prima.category.findFirst({
      where: { name: category.name },
    });
    if (!cat) {
      await prima.category.create({ data: category });
    }
  }
}

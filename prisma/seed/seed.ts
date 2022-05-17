import { seedProducts } from './data/product';
import { seedCategories } from './data/category';
import { seedProductImages } from './data/product_images';

async function main() {
  await seedCategories();
  await seedProducts();
  await seedProductImages();
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});

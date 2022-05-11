import { seedProducts } from './data/product';
import { seedCategories } from './data/category';

async function main() {
  await seedCategories();
  await seedProducts();
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});

const mongoose = require("mongoose");
const connectToDatabase = require("../src/config/db");
const { User, Category, Product } = require("../src/models");
const { createSlug } = require("../src/utils/slug");
const seedData = require("./seed-data");

async function seedCategories() {
  const operations = seedData.categories.map((category) => ({
    updateOne: {
      filter: { slug: category.slug },
      update: {
        $set: category,
      },
      upsert: true,
    },
  }));

  if (operations.length === 0) {
    return { matchedCount: 0, modifiedCount: 0, upsertedCount: 0 };
  }

  return Category.bulkWrite(operations);
}

async function buildCategoryMap() {
  const categories = await Category.find({}, { _id: 1, slug: 1 }).lean();
  return new Map(categories.map((category) => [category.slug, category._id]));
}

async function seedProducts(categoryMap) {
  const operations = seedData.products.map((product) => {
    const categoryId = categoryMap.get(product.categorySlug);

    if (!categoryId) {
      throw new Error(
        `Cannot seed product "${product.name}" because category "${product.categorySlug}" was not found.`
      );
    }

    const { categorySlug, ...productData } = product;
    const slug = productData.slug || createSlug(productData.name);
    const heroImage =
      productData.heroImage ||
      (Array.isArray(productData.images) && productData.images.length > 0
        ? productData.images[0]
        : "");

    return {
      updateOne: {
        filter: { slug },
        update: {
          $set: {
            ...productData,
            slug,
            heroImage,
            categoryId,
          },
        },
        upsert: true,
      },
    };
  });

  if (operations.length === 0) {
    return { matchedCount: 0, modifiedCount: 0, upsertedCount: 0 };
  }

  return Product.bulkWrite(operations);
}

async function getCounts() {
  const [users, categories, products] = await Promise.all([
    User.countDocuments(),
    Category.countDocuments(),
    Product.countDocuments(),
  ]);

  return { users, categories, products };
}

async function main() {
  await connectToDatabase();

  const beforeCounts = await getCounts();
  const categoryResult = await seedCategories();
  const categoryMap = await buildCategoryMap();
  const productResult = await seedProducts(categoryMap);
  const afterCounts = await getCounts();

  console.log("Seed run complete.");
  console.log("Prepared seed payload sizes:");
  console.table({
    users: seedData.users.length,
    categories: seedData.categories.length,
    products: seedData.products.length,
  });
  console.log("Collection counts before seed:");
  console.table(beforeCounts);
  console.log("Collection counts after seed:");
  console.table(afterCounts);
  console.log("Write results:");
  console.table({
    categoriesMatched: categoryResult.matchedCount || 0,
    categoriesModified: categoryResult.modifiedCount || 0,
    categoriesUpserted: categoryResult.upsertedCount || 0,
    productsMatched: productResult.matchedCount || 0,
    productsModified: productResult.modifiedCount || 0,
    productsUpserted: productResult.upsertedCount || 0,
  });
}

main()
  .catch((error) => {
    console.error("Seed script failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });

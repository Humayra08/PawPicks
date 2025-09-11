import mongoose from 'mongoose';
import Product from './models/productsModel.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Utility function to create URL-friendly slugs
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Base content for food products
const baseBenefitsFood = [
  'Supports healthy skin and coat with Omega fatty acids.',
  'Boosts vitality through balanced vitamins & taurine.',
  'Prebiotic content supports optimal digestion and gut health.',
  'Irresistible flavor encourages picky eaters.',
];

const baseDescriptionFood = `A premium complete pet food crafted for optimal daily nutrition.
Combines savory taste with high-quality protein sources, enriched with Omega fatty acids,
prebiotics, and essential vitamins to support overall wellness, digestion, and immune health.
Each pack is sealed for freshness.`;

const baseNutrition = [
  { label: 'Protein', value: 35 },
  { label: 'Fat', value: 12 },
  { label: 'Fiber', value: 3 },
  { label: 'Ash', value: 8 },
  { label: 'Moisture', value: 10 },
];

// Common product options
const foodColors = ['Green', 'Sky Blue', 'Orange', 'Pink Light', 'Black'];
const foodVariants = ['50g', '100g', '250g', '1kg'];

// Complete products data with proper image file names
const products = [
  // FOOD PRODUCTS
  {
    title: 'FILLET \'O\' LAKES - KIT CAT',
    img: 'Food1.png',
    rating: 5.0,
    sold: 900,
    price: 100.00,
    category: 'Pet Food',
    brand: 'Kit Cat',
    colors: foodColors,
    variants: foodVariants,
    defaultColor: 'Green',
    defaultVariant: '50g',
    description: baseDescriptionFood,
    benefits: baseBenefitsFood,
    nutrition: baseNutrition,
    type: 'food',
    stock: 150,
    isActive: true,
    specifications: {
      weight: '50g',
      ageGroup: 'Adult',
      petSize: 'All Sizes'
    }
  },
  {
    title: 'ENCORE - CAT FOOD',
    img: 'Food2.png',
    rating: 4.0,
    sold: 329,
    price: 400.00,
    category: 'Pet Food',
    brand: 'Encore',
    colors: foodColors,
    variants: foodVariants,
    defaultColor: 'Sky Blue',
    defaultVariant: '50g',
    description: baseDescriptionFood,
    benefits: baseBenefitsFood,
    nutrition: baseNutrition,
    type: 'food',
    stock: 85,
    isActive: true,
    specifications: {
      weight: '50g',
      ageGroup: 'Adult',
      petSize: 'All Sizes'
    }
  },
  {
    title: 'ROYAL CANIN - CARE DIGEST',
    img: 'Food3.png',
    rating: 4.5,
    sold: 900,
    price: 600.00,
    category: 'Pet Food',
    brand: 'Royal Canin',
    colors: foodColors,
    variants: foodVariants,
    defaultColor: 'Orange',
    defaultVariant: '100g',
    description: baseDescriptionFood,
    benefits: baseBenefitsFood,
    nutrition: baseNutrition,
    type: 'food',
    stock: 120,
    isActive: true,
    specifications: {
      weight: '100g',
      ageGroup: 'Adult',
      petSize: 'All Sizes'
    }
  },
  {
    title: 'WELLNESS - SIGNATURE...',
    img: 'Food4.png',
    rating: 3.0,
    sold: 12,
    price: 200.00,
    category: 'Pet Food',
    brand: 'Wellness',
    colors: foodColors,
    variants: foodVariants,
    defaultColor: 'Pink Light',
    defaultVariant: '50g',
    description: baseDescriptionFood,
    benefits: baseBenefitsFood,
    nutrition: baseNutrition,
    type: 'food',
    stock: 45,
    isActive: true,
    specifications: {
      weight: '50g',
      ageGroup: 'Adult',
      petSize: 'All Sizes'
    }
  },
  {
    title: 'FRISKIES WITH CHICKEN...',
    img: 'Food5.png',
    rating: 5.0,
    sold: 1000,
    price: 400.00,
    category: 'Pet Food',
    brand: 'Friskies',
    colors: foodColors,
    variants: foodVariants,
    defaultColor: 'Green',
    defaultVariant: '250g',
    description: baseDescriptionFood,
    benefits: baseBenefitsFood,
    nutrition: baseNutrition,
    type: 'food',
    stock: 200,
    isActive: true,
    specifications: {
      weight: '250g',
      ageGroup: 'Adult',
      petSize: 'All Sizes'
    }
  },
  {
    title: 'THÉRIE - THE FINESIT SE...',
    img: 'Food6.png',
    rating: 4.0,
    sold: 329,
    price: 550.00,
    category: 'Pet Food',
    brand: 'Thérie',
    colors: foodColors,
    variants: foodVariants,
    defaultColor: 'Black',
    defaultVariant: '100g',
    description: baseDescriptionFood,
    benefits: baseBenefitsFood,
    nutrition: baseNutrition,
    type: 'food',
    stock: 75,
    isActive: true,
    specifications: {
      weight: '100g',
      ageGroup: 'Adult',
      petSize: 'All Sizes'
    }
  },
  {
    title: 'NORTH PAW - GAIN FREE',
    img: 'Food7.png',
    rating: 4.5,
    sold: 900,
    price: 140.00,
    category: 'Pet Food',
    brand: 'North Paw',
    colors: foodColors,
    variants: foodVariants,
    defaultColor: 'Green',
    defaultVariant: '50g',
    description: baseDescriptionFood,
    benefits: baseBenefitsFood,
    nutrition: baseNutrition,
    type: 'food',
    stock: 180,
    isActive: true,
    specifications: {
      weight: '50g',
      ageGroup: 'Adult',
      petSize: 'All Sizes'
    }
  },
  {
    title: 'PEDIGREE - DOG FOOD',
    img: 'Food8.png',
    rating: 3.0,
    sold: 12,
    price: 200.00,
    category: 'Pet Food',
    brand: 'Pedigree',
    colors: foodColors,
    variants: foodVariants,
    defaultColor: 'Orange',
    defaultVariant: '1kg',
    description: baseDescriptionFood,
    benefits: baseBenefitsFood,
    nutrition: baseNutrition,
    type: 'food',
    stock: 90,
    isActive: true,
    specifications: {
      weight: '1kg',
      ageGroup: 'Adult',
      petSize: 'Large'
    }
  },

  // TOY PRODUCTS
  {
    title: 'DOG TOYS TO MOUTH',
    img: 'Toy1.png',
    rating: 5.0,
    sold: 1000,
    price: 320.00,
    category: 'Pet Toy',
    brand: 'PawFun',
    colors: ['Blue', 'Red', 'Yellow'],
    variants: ['Small', 'Medium', 'Large'],
    defaultColor: 'Blue',
    defaultVariant: 'Medium',
    description: 'Durable chew toy designed to promote dental health while providing engaging play.',
    benefits: [
      'Helps reduce plaque build-up.',
      'Keeps dogs mentally stimulated.',
      'Non-toxic, bite-resistant material.',
    ],
    nutrition: null,
    type: 'toy',
    stock: 250,
    isActive: true,
    specifications: {
      material: 'Natural Rubber',
      ageGroup: 'Adult',
      petSize: 'Medium to Large',
      dimensions: '15cm x 8cm x 8cm'
    }
  },
  {
    title: 'BASKETBALL AND FOOTBALL TOY',
    img: 'Toy2.png',
    rating: 4.0,
    sold: 329,
    price: 300.00,
    category: 'Pet Toy',
    brand: 'PlayBall',
    colors: ['Orange', 'Black'],
    variants: ['Single', 'Pack of 2'],
    defaultColor: 'Orange',
    defaultVariant: 'Single',
    description: 'Lightweight textured balls ideal for fetch and agility games.',
    benefits: ['Improves coordination.', 'Encourages exercise.', 'Floatable material.'],
    nutrition: null,
    type: 'toy',
    stock: 150,
    isActive: true,
    specifications: {
      material: 'Synthetic Leather',
      ageGroup: 'All Ages',
      petSize: 'Medium to Large',
      dimensions: '12cm diameter'
    }
  },
  {
    title: 'BONE SHAPED PET TOYS',
    img: 'Toy3.png',
    rating: 4.5,
    sold: 900,
    price: 700.00,
    category: 'Pet Toy',
    brand: 'ChewMaster',
    colors: ['White', 'Brown'],
    variants: ['Small', 'Large'],
    defaultColor: 'White',
    defaultVariant: 'Large',
    description: 'Heavy-duty bone-shaped toy for aggressive chewers.',
    benefits: ['Stress relief chewing.', 'Long-lasting durability.', 'Safe rounded edges.'],
    nutrition: null,
    type: 'toy',
    stock: 180,
    isActive: true,
    specifications: {
      material: 'Nylon Composite',
      ageGroup: 'Adult',
      petSize: 'Medium to Large',
      dimensions: '20cm x 5cm x 5cm'
    }
  },
  {
    title: 'BALL FOR DOG',
    img: 'Toy4.png',
    rating: 3.0,
    sold: 12,
    price: 300.00,
    category: 'Pet Toy',
    brand: 'ActivePup',
    colors: ['Green'],
    variants: ['Standard'],
    defaultColor: 'Green',
    defaultVariant: 'Standard',
    description: 'Classic bounce ball for everyday outdoor fun.',
    benefits: ['Encourages active lifestyle.', 'Easy to clean.', 'Resilient core.'],
    nutrition: null,
    type: 'toy',
    stock: 80,
    isActive: true,
    specifications: {
      material: 'Rubber',
      ageGroup: 'All Ages',
      petSize: 'All Sizes',
      dimensions: '8cm diameter'
    }
  },
  {
    title: 'TAMAGOTCHI TOY DIGITAL',
    img: 'Toy5.png',
    rating: 5.0,
    sold: 1000,
    price: 600.00,
    category: 'Pet Toy',
    brand: 'PetTech',
    colors: ['Pink', 'Blue', 'Purple'],
    variants: ['Standard'],
    defaultColor: 'Pink',
    defaultVariant: 'Standard',
    description: 'Interactive digital pet companion device themed for real pet owners.',
    benefits: ['Educational responsibility play.', 'Lightweight device.', 'Multiple mini games.'],
    nutrition: null,
    type: 'toy',
    stock: 120,
    isActive: true,
    specifications: {
      material: 'Plastic Electronics',
      ageGroup: 'All Ages',
      petSize: 'N/A',
      dimensions: '6cm x 5cm x 2cm'
    }
  },
  {
    title: 'STUFFED ANIMALS & CUTE PET TOYS',
    img: 'Toy6.png',
    rating: 4.0,
    sold: 329,
    price: 700.00,
    category: 'Pet Toy',
    brand: 'SnugglePet',
    colors: ['Beige', 'Brown'],
    variants: ['Single'],
    defaultColor: 'Beige',
    defaultVariant: 'Single',
    description: 'Soft plush toys for gentle play and comfort.',
    benefits: ['Soothing for anxious pets.', 'Soft stitching.', 'Machine washable cover.'],
    nutrition: null,
    type: 'toy',
    stock: 95,
    isActive: true,
    specifications: {
      material: 'Soft Plush Fabric',
      ageGroup: 'All Ages',
      petSize: 'Small to Medium',
      dimensions: '25cm x 15cm x 10cm'
    }
  },
  {
    title: 'MOSCOW AMAZON.COM TOY',
    img: 'Toy7.png',
    rating: 4.5,
    sold: 900,
    price: 800.00,
    category: 'Pet Toy',
    brand: 'GlobalPet',
    colors: ['Red', 'Black'],
    variants: ['Large'],
    defaultColor: 'Red',
    defaultVariant: 'Large',
    description: 'Unique themed toy built with reinforced layers.',
    benefits: ['High durability.', 'Eye-catching design.', 'Safe fabrics.'],
    nutrition: null,
    type: 'toy',
    stock: 65,
    isActive: true,
    specifications: {
      material: 'Reinforced Canvas',
      ageGroup: 'Adult',
      petSize: 'Large',
      dimensions: '30cm x 20cm x 15cm'
    }
  },
  {
    title: 'DOG TOYS RAWHIDE PET TOY',
    img: 'Toy8.png',
    rating: 3.0,
    sold: 12,
    price: 190.00,
    category: 'Pet Toy',
    brand: 'RawhideCo',
    colors: ['Natural'],
    variants: ['Single', 'Pack of 3'],
    defaultColor: 'Natural',
    defaultVariant: 'Single',
    description: 'Natural rawhide chew promoting oral hygiene and engagement.',
    benefits: ['Reduces boredom.', 'Helps clean teeth.', 'Natural flavor.'],
    nutrition: null,
    type: 'toy',
    stock: 110,
    isActive: true,
    specifications: {
      material: 'Natural Rawhide',
      ageGroup: 'Adult',
      petSize: 'Medium to Large',
      dimensions: '15cm x 3cm x 3cm'
    }
  }
];

// Add slugs to all products
products.forEach(p => {
  p.slug = slugify(p.title);
});

// Database seeding function
async function seedProducts() {
  try {
    // Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pawpicks');
    console.log('✅ Connected to MongoDB');
    
    // Clear existing products
    console.log('🔄 Clearing existing products...');
    await Product.deleteMany({});
    console.log('✅ Existing products cleared');
    
    // Insert new products
    console.log('🔄 Inserting new products...');
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${insertedProducts.length} products!`);
    
    // Display detailed summary
    console.log('\n📊 Seeding Summary:');
    console.log(`   - Total Products: ${insertedProducts.length}`);
    
    const foodProducts = insertedProducts.filter(p => p.type === 'food');
    const toyProducts = insertedProducts.filter(p => p.type === 'toy');
    
    console.log(`   - Food Products: ${foodProducts.length}`);
    console.log(`   - Toy Products: ${toyProducts.length}`);
    
    // Display food brands
    const foodBrands = [...new Set(foodProducts.map(p => p.brand))];
    console.log(`   - Food Brands: ${foodBrands.join(', ')}`);
    
    // Display toy brands
    const toyBrands = [...new Set(toyProducts.map(p => p.brand))];
    console.log(`   - Toy Brands: ${toyBrands.join(', ')}`);
    
    // Price statistics
    const prices = insertedProducts.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2);
    
    console.log(`\n💰 Price Statistics:`);
    console.log(`   - Minimum Price: ৳${minPrice}`);
    console.log(`   - Maximum Price: ৳${maxPrice}`);
    console.log(`   - Average Price: ৳${avgPrice}`);
    
    // Stock statistics
    const totalStock = insertedProducts.reduce((sum, p) => sum + p.stock, 0);
    console.log(`\n📦 Stock Statistics:`);
    console.log(`   - Total Stock: ${totalStock} items`);
    console.log(`   - Average Stock per Product: ${Math.round(totalStock / insertedProducts.length)} items`);
    
    // Display image file names for verification
    console.log(`\n🖼️  Image Files Used:`);
    const uniqueImages = [...new Set(insertedProducts.map(p => p.img))].sort();
    uniqueImages.forEach(img => {
      console.log(`   - ${img}`);
    });
    
    // Display some sample slugs for testing
    console.log(`\n🔗 Sample Product Slugs (for testing URLs):`);
    insertedProducts.slice(0, 5).forEach(p => {
      console.log(`   - ${p.title} → /product/${p.slug}`);
    });
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('💡 You can now test your API endpoints:');
    console.log('   - GET /api/products (all products)');
    console.log('   - GET /api/products/type/food (food products only)');
    console.log('   - GET /api/products/type/toy (toy products only)');
    console.log(`   - GET /api/products/slug/${insertedProducts[0].slug} (single product)`);
    
    // Close connection
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    
    // Display more detailed error information
    if (error.name === 'ValidationError') {
      console.error('📝 Validation errors:');
      Object.keys(error.errors).forEach(key => {
        console.error(`   - ${key}: ${error.errors[key].message}`);
      });
    }
    
    if (error.code === 11000) {
      console.error('🔄 Duplicate key error - some products may already exist');
      console.error('   Consider running the script again to clear and re-seed');
    }
    
    process.exit(1);
  }
}

// Display startup message
console.log('🌟 PawPicks Product Database Seeder');
console.log('===================================');
console.log(`📅 Starting seed process at: ${new Date().toISOString()}`);
console.log(`👤 Running as user: ${process.env.USER || process.env.USERNAME || 'Humayra08'}`);
console.log(`🗄️  Target database: ${process.env.MONGO_URI || 'mongodb://localhost:27017/pawpicks'}`);
console.log('');

// Run the seeding function
seedProducts();
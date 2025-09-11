// Data-only module. Uses .jsx per your preference.

import Food1 from '../Assets/Food1.png';
import Food2 from '../Assets/Food2.png';
import Food3 from '../Assets/Food3.png';
import Food4 from '../Assets/Food4.png';
import Food5 from '../Assets/Food5.png';
import Food6 from '../Assets/Food6.png';
import Food7 from '../Assets/Food7.png';
import Food8 from '../Assets/Food8.png';

import Toy1 from '../Assets/Toy1.png';
import Toy2 from '../Assets/Toy2.png';
import Toy3 from '../Assets/Toy3.png';
import Toy4 from '../Assets/Toy4.png';
import Toy5 from '../Assets/Toy5.png';
import Toy6 from '../Assets/Toy6.png';
import Toy7 from '../Assets/Toy7.png';
import Toy8 from '../Assets/Toy8.png';

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const baseBenefitsFood = [
  'Supports healthy skin and coat with Omega fatty acids.',
  'Boosts vitality through balanced vitamins & taurine.',
  'Prebiotic content supports optimal digestion and gut health.',
  'Irresistible flavor encourages picky eaters.',
];

const baseDescriptionFood = `
A premium complete pet food crafted for optimal daily nutrition.
Combines savory taste with high-quality protein sources, enriched with Omega fatty acids,
prebiotics, and essential vitamins to support overall wellness, digestion, and immune health.
Each pack is sealed for freshness.
`.trim();

const baseNutrition = [
  { label: 'Protein', value: 35 },
  { label: 'Fat', value: 12 },
  { label: 'Fiber', value: 3 },
  { label: 'Ash', value: 8 },
  { label: 'Moisture', value: 10 },
];

const foodColors = ['Green', 'Sky Blue', 'Orange', 'Pink Light', 'Black'];
const foodVariants = ['50g', '100g', '250g', '1kg'];

export const allProducts = [
  {
    title: 'FILLET ‘O’ LAKES - KIT CAT',
    img: Food1,
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
  },
  {
    title: 'ENCORE - CAT FOOD',
    img: Food2,
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
  },
  {
    title: 'ROYAL CANIN - CARE DIGEST',
    img: Food3,
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
  },
  {
    title: 'WELLNESS - SIGNATURE...',
    img: Food4,
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
  },
  {
    title: 'FRISKIES WITH CHICKEN...',
    img: Food5,
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
  },
  {
    title: 'THÉRIE - THE FINESIT SE...',
    img: Food6,
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
  },
  {
    title: 'NORTH PAW - GAIN FREE',
    img: Food7,
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
  },
  {
    title: 'PEDIGREE - DOG FOOD',
    img: Food8,
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
  },
  {
    title: 'DOG TOYS TO MOUTH',
    img: Toy1,
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
  },
  {
    title: 'BASKETBALL AND FOOTBALL TOY',
    img: Toy2,
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
  },
  {
    title: 'BONE SHAPED PET TOYS',
    img: Toy3,
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
  },
  {
    title: 'BALL FOR DOG',
    img: Toy4,
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
  },
  {
    title: 'TAMAGOTCHI TOY DIGITAL',
    img: Toy5,
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
  },
  {
    title: 'STUFFED ANIMALS & CUTE PET TOYS',
    img: Toy6,
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
  },
  {
    title: 'MOSCOW AMAZON.COM TOY',
    img: Toy7,
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
  },
  {
    title: 'DOG TOYS RAWHIDE PET TOY',
    img: Toy8,
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
  },
];

allProducts.forEach(p => {
  if (!p.slug) p.slug = slugify(p.title);
});

export function getProductBySlug(slug) {
  return allProducts.find(p => p.slug === slug);
}
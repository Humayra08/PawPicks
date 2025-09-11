import mongoose from 'mongoose';

const nutritionSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: Number, required: true }
}, { _id: false });

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    sold: { type: Number, default: 0 },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    type: { type: String, required: true, enum: ['food', 'toy'] },
    
    // Product variants and options
    colors: [{ type: String }],
    variants: [{ type: String }],
    defaultColor: { type: String, default: '' },
    defaultVariant: { type: String, default: '' },
    
    // Content fields
    description: { type: String, required: true },
    benefits: [{ type: String }],
    
    // Image field (store filename or URL)
    img: { type: String, required: true },
    
    // Nutrition info (only for food items)
    nutrition: [nutritionSchema],
    
    // Inventory
    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Pre-save middleware to generate slug if not provided
productSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/['']/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Index for better search performance
productSchema.index({ title: 'text', description: 'text' });
productSchema.index({ category: 1, type: 1 });
productSchema.index({ slug: 1 });

const Product = mongoose.model('Product', productSchema);
export default Product;
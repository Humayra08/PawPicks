import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    selectedColor: { type: String, default: '' },
    selectedVariant: { type: String, default: '' }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sessionId: { type: String }, // optional
    items: [orderItemSchema],
    total: { type: Number, required: true, min: 0 },
    shippingAddress: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      contactNumber: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true, enum: ['COD'] },
    status: { type: String, default: 'pending', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] }
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
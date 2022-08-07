import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'product name must be provided']
   },
   price: {
      type: Number,
      required: [true, 'product name must be provided']
   },
   featured: {
      type: Boolean,
      default: false
   },
   rating: {
      type: Number,
      default: 4.5
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
   company: {
      type: String,
      enum: {
         values: ['marcos', 'liddy', 'ikea', 'caressa'],
         message: '{VALUE} is not supported'
      },
      // enum: ['marcos', 'liddy', 'ikea', 'caressa'],
   }
})

export default mongoose.model('Product', ProductSchema);
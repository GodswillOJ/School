// models/User.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  nin: {
    type: String,
    required: true,
    unique: true
  }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, min: 2, max: 100 },
  email: { type: String, required: true, min: 50, unique: true },
  password: { type: String, required: true, min: 5 },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  occupation: String,
  phoneNumber: { type: String, required: true },
  image: { type: String, required: true },
  product: {
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    }]
  },
  cart: {
    totalPrice: { type: Number, default: 0 },
    items: [{
      name: { type: String, required: true },
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number },
      image: { type: String },
    }]
  },
  orders:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  }],
  role: { type: String, enum: ['admin', 'user', 'superadmin'], default: 'user', required: true },
  is_verified: { type: Number, default: 0 },
}, { timestamps: true });



const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);

export {Post, User};



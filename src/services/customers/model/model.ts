
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  discount: { type: String, required: true },

});

const Customer = mongoose.model('Customer', userSchema);

export default Customer;
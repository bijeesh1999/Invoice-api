import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema({
  customerId: { type: mongoose.Types.ObjectId, required: true },
  productId: { type: mongoose.Types.ObjectId, required: true },
  customerName:{type: String},
  productName:{type: String},
  totalPrice:{ type: Number },
  discountedPercent:{ type: Number},
  discountedPrice:{ type: Number},
  quantity: { type: Number },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;


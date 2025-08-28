import mongoose from 'mongoose';

const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  contactNumber: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  lastActive: { type: Date, required: true, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Vendor', VendorSchema);

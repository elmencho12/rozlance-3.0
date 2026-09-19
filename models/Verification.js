import mongoose from 'mongoose';
const s = new mongoose.Schema({
  email: String,
  otp: String,
  name: String,
  password: String,
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 10 * 60 * 1000),
  },
});
export default mongoose.models.Verification ||
  mongoose.model('Verification', s);

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bmi: { type: Number, required: true },
  goal: { type: String, required: true },
  activityLevel: { type: String, required: true },
  buddy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  healthData: { type: mongoose.Schema.Types.ObjectId, ref: 'HealthData' },
});

const User = mongoose.model('User', userSchema);
export default User;

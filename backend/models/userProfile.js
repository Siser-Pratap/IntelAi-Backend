import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  date: {
    type: Date,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  avatar:{
    type: String,
  },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
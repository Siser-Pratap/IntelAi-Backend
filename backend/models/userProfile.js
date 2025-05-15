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
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
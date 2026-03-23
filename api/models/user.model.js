import mongoose from 'mongoose';

/** Same URL used when Google OAuth has no photoURL — keep in sync with client `defaultAvatarUrl.js` */
export const DEFAULT_PROFILE_PICTURE =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: DEFAULT_PROFILE_PICTURE,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;

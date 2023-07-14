import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [6, 'minimum username length is 6'],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, 'minimum password length is 6'],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesIn: String,
    worksAt: String,
    relationship: String,
    country: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
)

const UserModel = mongoose.model('Users', UserSchema)
export default UserModel

import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: String,
    likes: [],
    comments: [{ username: String, comment: String }],
    image: String,
  },
  { timestamps: true }
)

const PostModel = mongoose.model('Posts', postSchema)
export default PostModel

import mongoose from 'mongoose'
import PostModel from '../Models/postModal.js'
import UserModel from '../Models/userModel.js'

// Create new Post
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body)

  try {
    await newPost.save()
    res.status(200).json(newPost)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get a post
export const getPost = async (req, res) => {
  const id = req.params.id

  try {
    const post = await PostModel.find({ userId: id })
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update a post
export const updatePost = async (req, res) => {
  const postId = req.params.id
  const { userId } = req.body

  try {
    const post = await PostModel.findById(postId)
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body })
      res.status(200).json('Post Updated')
    } else {
      res.status(403).json('Action forbidden')
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id
  const { userId } = req.body

  try {
    const post = await PostModel.findById(id)
    if (post.userId === userId) {
      await post.deleteOne()
      res.status(200).json('Post Deleted')
    } else {
      res.status(403).json('Action forbidden')
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Like/Dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id
  const { userId } = req.body

  try {
    const post = await PostModel.findById(id)
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } })
      res.status(200).json('Post liked')
    } else {
      await post.updateOne({ $pull: { likes: userId } })
      res.status(200).json('Post UnLiked')
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Timeline posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id
  try {
    const currentUserPosts = await PostModel.find({ userId: userId })

    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'posts',
          localField: 'following',
          foreignField: 'userId',
          as: 'followingPosts',
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ])

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt)
        })
    )
  } catch (error) {
    res.status(500).json(error)
  }
}

//Comment on a post
export const createComments = async (req, res) => {
  const username = req.params.id
  const { id } = req.body

  const comment = {
    username: username,
    comment: req.body.comment,
  }
  try {
    const post = await PostModel.findById({ _id: id })

    await post.updateOne({ $push: { comments: comment } })
    res.status(200).json('Post Commented')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteComment = async (req, res) => {
  const commentId = req.params.id
  const { postId } = req.body

  try {
    const post = await PostModel.findById(postId)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const commentIndex = post.comments.findIndex(
      (c) => c._id.toString() == commentId
    )
    if (commentIndex === -1) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    post.comments.splice(commentIndex, 1)
    await post.save()

    res.status(200).json('Comment deleted')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

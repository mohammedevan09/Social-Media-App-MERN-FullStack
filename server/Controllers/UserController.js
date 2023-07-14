import UserModel from '../Models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find().select('-password')

    if (users?.length !== 0) {
      res.status(200).json(users)
    } else {
      res.status(404).json('No user exists')
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUser = async (req, res) => {
  const id = req.params.id

  try {
    const user = await UserModel.findById(id).select('-password')

    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json('No Such user exists')
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// update a user
export const updateUser = async (req, res) => {
  const id = req.params.id
  const { _id, currentUserAdminStatus, password } = req.body

  if (password) {
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(password, salt)
  }

  if (id === _id) {
    try {
      const user = await UserModel.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
      })
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      )

      res.status(200).json({ user, token })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } else {
    res.status(404).json('Access Denied! You can only update your own profile')
  }
}

// Delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id
  const { _id, currentUserAdminStatus } = req.body

  if (_id === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete({ _id: id })
      res.status(200).json('User deleted successfully')
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } else {
    res.status(404).json('Access Denied! You can only delete your own profile')
  }
}

// Follow a User
export const followUser = async (req, res) => {
  const id = req.params.id

  const { _id } = req.body

  if (_id === id) {
    res.status(403).json('Action forbidden')
  } else {
    try {
      const followUser = await UserModel.findById({ _id: id })
      const followingUser = await UserModel.findById({ _id: _id })

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } })
        await followingUser.updateOne({ $push: { following: id } })
        res.status(200).json('User followed!')
      } else {
        res.status(403).json('User is Already followed by you')
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

// UnFollow a User
export const unFollowUser = async (req, res) => {
  const id = req.params.id

  const { _id } = req.body

  if (_id === id) {
    res.status(403).json('Action forbidden')
  } else {
    try {
      const followUser = await UserModel.findById({ _id: id })
      const followingUser = await UserModel.findById({ _id: _id })

      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id } })
        await followingUser.updateOne({ $pull: { following: id } })
        res.status(200).json('User UnFollowed!')
      } else {
        res.status(403).json('User is not followed by you')
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

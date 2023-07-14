import express from 'express'
import {
  createPost,
  deletePost,
  getPost,
  getTimelinePosts,
  likePost,
  updatePost,
  createComments,
  deleteComment,
} from '../Controllers/PostController.js'
const router = express.Router()

router.post('/', createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimelinePosts)
router.put('/:id/comment', createComments)
router.delete('/:id/comment', deleteComment)

export default router

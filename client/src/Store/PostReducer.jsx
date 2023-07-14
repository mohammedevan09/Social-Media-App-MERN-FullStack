import { createSlice } from '@reduxjs/toolkit'

const postReducer = createSlice({
  name: 'Post',
  initialState: {
    post: null,
    loading: false,
    error: false,
    uploading: false,
  },
  reducers: {
    uploadStart: (state, action) => {
      return { ...state, uploading: true, error: false }
    },
    uploadSuccessfully: (state, action) => {
      return {
        ...state,
        post: [action.payload, ...state.post],
        uploading: false,
        error: false,
      }
    },
    uploadFailed: (state, action) => {
      return { ...state, loading: false, error: true }
    },
    retrivingStart: (state, action) => {
      return { ...state, loading: true, error: false }
    },
    retrivingSuccessfully: (state, action) => {
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: false,
      }
    },
    retrivingFailed: (state, action) => {
      return { ...state, loading: false, error: true }
    },
    commentingPost: (state, { username, postId, comment }) => {
      return {
        ...state,
        post: state.post.map((p) => {
          if (postId === p._id) {
            const updatedComments = [
              ...p.comments,
              { username: username, comment: comment },
            ]
            return { ...p, comments: updatedComments }
          }
          return p
        }),
      }
    },
    deletingPostComment: (state, { postCommentId, postId }) => {
      const updatedPosts = state.post.map((post) => {
        if (post._id === postId) {
          const updatedComments = post.comments.filter(
            (comment) => comment._id !== postCommentId
          )
          return { ...post, comments: updatedComments }
        }
        return post
      })

      return {
        ...state,
        post: updatedPosts,
      }
    },
  },
})

export const {
  uploadStart,
  uploadSuccessfully,
  uploadFailed,
  retrivingSuccessfully,
  retrivingStart,
  retrivingFailed,
  commentingPost,
  deletingPostComment,
} = postReducer.actions
export default postReducer.reducer

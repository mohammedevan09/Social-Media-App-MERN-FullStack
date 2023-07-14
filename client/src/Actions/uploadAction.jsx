import * as UploadApi from '../Api/UploadRequest.jsx'
import {
  uploadStart,
  uploadFailed,
  uploadSuccessfully,
} from '../Store/PostReducer.jsx'

export const uploadImage = (data) => async (dispatch) => {
  try {
    await UploadApi.uploadImage(data)
  } catch (error) {
    console.log(error)
  }
}

export const uploadPost = (newPost) => async (dispatch) => {
  dispatch(uploadStart())
  try {
    const { data } = await UploadApi.uploadPost(newPost)
    dispatch(uploadSuccessfully(data))
  } catch (error) {
    console.log(error)
    dispatch(uploadFailed())
  }
}

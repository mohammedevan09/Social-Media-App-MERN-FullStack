import * as PostApi from '../Api/PostRequest.jsx'
import {
  retrivingStart,
  retrivingFailed,
  retrivingSuccessfully,
} from '../Store/PostReducer.jsx'

export const getTimeLinePosts = (id) => async (dispatch) => {
  dispatch(retrivingStart())
  try {
    const { data } = await PostApi.getTimeLinePosts(id)
    dispatch(retrivingSuccessfully(data))
  } catch (error) {
    console.log(error)
    dispatch(retrivingFailed())
  }
}

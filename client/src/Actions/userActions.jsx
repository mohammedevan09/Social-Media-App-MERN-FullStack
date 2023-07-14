import * as UserApi from '../Api/UserRequest.jsx'
import {
  updateStart,
  updateFailed,
  updateSuccessfully,
  followingUser,
  unFollowingUser,
} from '../Store/AuthReducer.jsx'

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch(updateStart())
  try {
    const { data } = await UserApi.updateUser(id, formData)
    dispatch(updateSuccessfully(data))
  } catch (error) {
    dispatch(updateFailed())
  }
}

export const followUser = (id, data) => async (dispatch) => {
  dispatch(followingUser(id))
  UserApi.followUser(id, data)
}

export const unFollowUser = (id, data) => async (dispatch) => {
  dispatch(unFollowingUser(id))
  UserApi.unFollowUser(id, data)
}

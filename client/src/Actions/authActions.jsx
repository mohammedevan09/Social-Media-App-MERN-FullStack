import * as AuthApi from '../Api/AuthRequest.jsx'
import {
  authStart,
  authFailed,
  authSuccess,
  logout,
} from '../Store/AuthReducer.jsx'

export const logIn = (formData) => async (dispatch) => {
  dispatch(authStart())
  try {
    const { data } = await AuthApi.logIn(formData)
    dispatch(authSuccess(data))
  } catch (error) {
    dispatch(authFailed())
  }
}

export const signUp = (formData) => async (dispatch) => {
  dispatch(authStart())
  try {
    const { data } = await AuthApi.signUp(formData)
    dispatch(authSuccess(data))
  } catch (error) {
    dispatch(authFailed())
  }
}

export const logOut = () => async (dispatch) => {
  dispatch(logout())
}

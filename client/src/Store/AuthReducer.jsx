import { createSlice } from '@reduxjs/toolkit'

const authReducer = createSlice({
  name: 'Auth',
  initialState: {
    authData: null,
    loading: false,
    error: false,
    updateLoading: false,
  },
  reducers: {
    authStart: (state, action) => {
      return { ...state, loading: true, error: false }
    },
    authSuccess: (state, action) => {
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
      return {
        ...state,
        authData:
          action?.payload || JSON.stringify(localStorage.getItem('profile')),
        loading: false,
        error: false,
      }
    },
    authFailed: (state, action) => {
      return { ...state, loading: false, error: true }
    },
    updateStart: (state, action) => {
      return { ...state, updateLoading: true, error: false }
    },
    updateSuccessfully: (state, action) => {
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
      return {
        ...state,
        authData: action?.payload,
        updateLoading: false,
        error: false,
      }
    },
    updateFailed: (state, action) => {
      return { ...state, updateLoading: false, error: true }
    },
    followingUser: (state, action) => {
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.payload],
          },
        },
      }
    },
    unFollowingUser: (state, action) => {
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following.filter(
                (personId) => personId !== action.payload
              ),
            ],
          },
        },
      }
    },
    logout: (state, action) => {
      localStorage.clear()
      return { ...state, authData: null, loading: false, error: false }
    },
  },
})

export const {
  authStart,
  authSuccess,
  authFailed,
  updateStart,
  updateSuccessfully,
  updateFailed,
  followingUser,
  unFollowingUser,
  logout,
} = authReducer.actions
export default authReducer.reducer

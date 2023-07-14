import axios from 'axios'
let baseUrl = process.env.REACT_APP_PUBLIC_FOLDER
baseUrl = baseUrl.slice(0, baseUrl.length - 8)

const API = axios.create({ baseURL: baseUrl })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }

  return req
})
export const getUser = (userId) => API.get(`/user/${userId}`)

export const updateUser = (id, formData) => API.put(`/user/${id}`, formData)

export const getAllUser = () => API.get(`/user`)

export const followUser = (id, data) =>
  API.put(`/user/${id}/follow`, { _id: data })

export const unFollowUser = (id, data) =>
  API.put(`/user/${id}/unfollow`, { _id: data })

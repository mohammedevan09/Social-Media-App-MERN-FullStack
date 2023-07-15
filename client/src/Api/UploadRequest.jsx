import axios from 'axios'

let baseUrl = process.env.REACT_APP_PUBLIC_FOLDER
baseUrl = baseUrl.slice(0, baseUrl.length - 8)

const API = axios.create({ baseURL: baseUrl })

export const uploadImage = (data) => API.post('/upload/', data)

export const uploadPost = (data) => API.post('/posts', data)

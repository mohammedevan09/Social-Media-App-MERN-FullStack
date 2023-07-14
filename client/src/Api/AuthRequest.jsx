import axios from 'axios'
let baseUrl = process.env.REACT_APP_PUBLIC_FOLDER
baseUrl = baseUrl.slice(0, baseUrl.length - 8)

const API = axios.create({ baseURL: baseUrl })

export const logIn = (formData) => API.post('/auth/login', formData)
export const signUp = (formData) => API.post('/auth/register', formData)

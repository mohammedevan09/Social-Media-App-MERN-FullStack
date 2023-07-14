import axios from 'axios'

let baseUrl = process.env.REACT_APP_PUBLIC_FOLDER
baseUrl = baseUrl.slice(0, baseUrl.length - 8)

const API = axios.create({ baseURL: baseUrl })

export const getTimeLinePosts = (id) => API.get(`/posts/${id}/timeline`)

export const likePost = (id, userId) =>
  API.put(`posts/${id}/like`, { userId: userId })

export const commentPost = (username, id, comment) => {
  API.put(`/posts/${username}/comment`, { id: id, comment: comment })
}

export const deleteComment = (id, postId) => {
  API.delete(`/posts/${id}/comment`, { data: { postId } })
}

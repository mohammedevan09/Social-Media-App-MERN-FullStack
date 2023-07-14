import React, { useEffect } from 'react'
import './Posts.css'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../Post/Post'
import { getTimeLinePosts } from '../../Actions/postActions.jsx'
import { useParams } from 'react-router-dom'

const Posts = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { user } = useSelector((state) => state?.AuthReducer?.authData)
  let { post, loading } = useSelector((state) => state?.PostReducer)
  // console.log(post)
  useEffect(() => {
    dispatch(getTimeLinePosts(user._id))
  }, [])

  if (params.id) post = post.filter((post) => post.userId === params.id)
  // console.log(params.id)

  if (!post || post.length == 0) {
    return <div>No post available!</div>
  }

  return (
    <div className="Posts">
      {loading
        ? 'Fetching posts....'
        : post?.map((post, id) => {
            return <Post data={post} key={id} />
          })}
    </div>
  )
}

export default Posts

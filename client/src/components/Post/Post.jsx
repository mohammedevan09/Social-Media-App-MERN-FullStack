import React, { useState, useRef } from 'react'
import './Post.css'
import { UilTrash, UilEllipsisV } from '@iconscout/react-unicons'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteComment,
  likePost,
  commentPost,
  deletingPost,
} from '../../Api/PostRequest.jsx'
import {
  commentingPost,
  deletingPostComment,
} from '../../Store/PostReducer.jsx'

const Post = ({ data, id }) => {
  const deletePostRef = useRef()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.AuthReducer.authData)

  const [comment, setComment] = useState('')
  const [isComment, setIsComment] = useState(false)
  const [liked, setLiked] = useState(data?.likes?.includes(user._id))
  const [likes, setLikes] = useState(data?.likes?.length)

  const handleLike = () => {
    setLiked((prev) => !prev)
    likePost(data._id, user._id)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }

  const handlePostRef = () => {
    deletePostRef.current.style.display =
      deletePostRef.current.style.display === 'none' ? 'block' : 'none'
  }

  const handlePostDelete = (id) => {
    deletingPost(id, user._id)
    alert('Post deleted! Refresh to see.')
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (comment.length !== 0 && comment) {
      commentPost(user.username, data._id, comment)
      dispatch(commentingPost(user.username, data._id, comment))
      alert('Commented! Refresh the page to see')
    }
    setIsComment(false)
  }

  const handleCommentDelete = async (
    currentUsername,
    commentUsername,
    postCommentId
  ) => {
    if (currentUsername === commentUsername) {
      try {
        await deleteComment(postCommentId, data._id)
        dispatch(deletingPostComment(postCommentId, data._id))
        alert('Comment Deleted! Refresh the page to see')
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  return (
    <div className="Post" key={id}>
      <img
        src={
          data?.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ''
        }
        alt=""
      />
      <div style={{ textAlign: 'left', fontSize: '24px' }}>
        {!data?.image && data?.desc}
      </div>
      {isComment ? (
        <form className="postReact" onSubmit={handleComment}>
          <input
            type="text"
            placeholder="Write a comment"
            className="commentInput"
            name="comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="button fc-button" type="submit">
            post
          </button>
        </form>
      ) : (
        <div className="postReact">
          <div>
            <img
              src={liked ? Heart : NotLike}
              alt="Likes"
              style={{ cursor: 'pointer' }}
              onClick={handleLike}
            />
            <div>{likes} Likes</div>
          </div>
          <div>
            <img
              src={Comment}
              alt="comments"
              onClick={() => setIsComment(true)}
            />
            <div> {data.comments.length} Comments</div>
          </div>
          <div>
            <img src={Share} alt="" />
            <div>Not available</div>
          </div>
        </div>
      )}
      <div className="details flex">
        <div className="flex">
          <b>{user?.username} &nbsp;</b>
          <span style={{ color: 'white' }}>
            {' '}
            {!data.image ? '' : data?.desc}
          </span>
        </div>
        <div
          onClick={handlePostRef}
          style={{ position: 'relative' }}
          className="flex"
        >
          <span
            onClick={() => handlePostDelete(data._id)}
            ref={deletePostRef}
            style={{ display: 'none' }}
            className="relative button home_btn"
          >
            Delete post
          </span>{' '}
          {<UilEllipsisV />}
        </div>
      </div>{' '}
      {data?.comments?.map((c, i) => {
        return (
          <div className="flex" key={i}>
            <div className="details">
              <span>
                <b>
                  <>{c?.username} </>
                </b>
              </span>
              <div>{c?.comment}</div>
            </div>
            <i
              style={{ cursor: 'pointer' }}
              onClick={() =>
                handleCommentDelete(user.username, c?.username, c?._id)
              }
            >
              {user.username === c?.username ? <UilTrash /> : ''}
            </i>
          </div>
        )
      })}
    </div>
  )
}

export default Post


import React, { useState, useRef } from 'react'
import './PostShare.css'
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from '@iconscout/react-unicons'
import { useSelector, useDispatch } from 'react-redux'
import { uploadImage, uploadPost } from '../../Actions/uploadAction.jsx'

const option = [
  { icon: <UilScenery />, name: 'Photo', color: 'var(--photo)' },
  // { icon: <UilPlayCircle />, name: 'Video', color: 'var(--video)' },
  // { icon: <UilLocationPoint />, name: 'Location', color: 'var(--location)' },
  // { icon: <UilSchedule />, name: 'Schedule', color: 'var(--schedule)' },
]

const PostShare = () => {
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const imageRef = useRef()
  const desc = useRef()
  const { user } = useSelector((state) => state?.AuthReducer?.authData)
  // console.log(user)
  const { uploading } = useSelector((state) => state?.PostReducer)
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      setImage(img)
    }
  }

  const handleClick = (name) => {
    if (name === 'Photo') {
      imageRef.current.click()
    }
  }

  const reset = () => {
    setImage(null)
    desc.current.value = ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPost = {
      userId: user?._id,
      desc: desc.current.value,
    }

    if (image) {
      const data = new FormData()
      const filename = Date.now() + image.name
      data.append('name', filename)
      data.append('file', image)
      newPost.image = filename
      // console.log(newPost)
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
      if (desc.current.value) {
      dispatch(uploadPost(newPost))
      reset()
    } else {
      alert('Please enter a description')
    }
  }

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className="PostShare">
      <img
        src={
          user?.profilePicture
            ? serverPublic + user?.profilePicture
            : serverPublic + 'defaultProfile.png'
        }
        alt={user?.username}
        className="postShareImg"
      />
      <div>
        <input ref={desc} type="text" placeholder="What's happening" required />
        <div className="postOptions">
          {option?.map(({ icon, name, color }, i) => (
            <div
              key={i}
              className="option"
              style={{ color: color }}
              onClick={() => handleClick(name)}
            >
              {icon}
              {name}
            </div>
          ))}

          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Share'}
          </button>

          <div style={{ display: 'none' }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostShare

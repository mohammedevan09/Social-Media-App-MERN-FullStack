import React, { useState } from 'react'
import './User.css'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unFollowUser } from '../../Actions/userActions.jsx'
import { getUser } from '../../Api/UserRequest.jsx'

const User = ({ person }) => {
  const { user } = useSelector((state) => state.AuthReducer.authData)
  const [data, setData] = useState({})

  const handleData = async (id) => {
    if (Object.keys(data).length === 0) {
      let newData = await getUser(id)
      setData(newData?.data)
    } else {
      setData({})
    }
  }
  // console.log(data)

  const dispatch = useDispatch()

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  )

  const handleFollow = () => {
    if (following) {
      dispatch(unFollowUser(person._id, user._id))
      alert('UnFollowed user')
    } else {
      dispatch(followUser(person._id, user._id))
      alert('Followed user, Refresh to see timeline post')
    }

    setFollowing((prev) => !prev)
  }
  // console.log(following)
  return (
    <>
      <div className="follower">
        <div onClick={() => handleData(person._id)}>
          <img
            src={
              person.profilePicture !== undefined || null
                ? publicFolder + person.profilePicture
                : `${publicFolder}defaultProfile.png`
            }
            alt="profile"
            className="followerImg"
          />
          <div className="name">
            <span>
              {person.firstName} {person.lastName}
            </span>
            <span>
              @
              {person?.username.length > 18
                ? `${person?.username.substr(0, 16)}...`
                : person?.username}
            </span>
          </div>
        </div>
        <button
          className={
            following ? 'button fc-button UnFollowButton' : 'button fc-button'
          }
          onClick={handleFollow}
        >
          {following ? 'UnFollow' : 'Follow'}
        </button>
      </div>
      {Object.keys(data).length !== 0 ? (
      <div className="selectedUser">
          <div>{data?.username?.substr(0,10)}</div>
          <div className="line"></div>
          <div>Followers : {data?.followers?.length}</div>
          <div className="line"></div>
          <div>Following : {data?.following?.length}</div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default User

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unFollowUser } from '../../Actions/userActions.jsx'

const User = ({ person }) => {
  const { user } = useSelector((state) => state.AuthReducer.authData)
  const dispatch = useDispatch()
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  )

  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(person._id, user._id))
      : dispatch(followUser(person._id, user._id))

    setFollowing((prev) => !prev)
  }
  // console.log(following)
  return (
    <div className="follower">
      <div>
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
  )
}

export default User

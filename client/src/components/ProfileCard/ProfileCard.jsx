import React from 'react'
import './ProfileCard.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProfileCard = ({ location }) => {
  let profilePage = location === 'profilePage'

  const { user } = useSelector((state) => state.AuthReducer.authData)
  const posts = useSelector((state) => state.PostReducer.post)

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            user?.coverPicture
              ? serverPublic + user?.coverPicture
              : serverPublic + 'defaultCover.jpg'
          }
          alt=""
        />
        <img
          src={
            user?.profilePicture
              ? serverPublic + user?.profilePicture
              : serverPublic + 'defaultProfile.png'
          }
          alt=""
        />
      </div>

      <div className="ProfileName">
        <span>
          {user?.firstName} {user?.lastName}
        </span>
        <span>{user.worksAt ? user?.worksAt : 'Write about yourself!'}</span>
      </div>

      <div className="followStatus">
        {!profilePage && <hr />}
        {profilePage && <div style={{ margin: '4px 0' }}></div>}
        <div>
          <div className="follow">
            <span>{user?.following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user?.followers.length}</span>
            <span>Followers</span>
          </div>

          <>
            <div className="vl"></div>
            <div className="follow">
              <span>
                {posts !== null
                  ? posts.filter((post) => post.userId === user._id).length
                  : 0}
              </span>
              <span>Posts</span>
            </div>
          </>
        </div>
        {profilePage && <div style={{ margin: '4px 0' }}></div>}
        {!profilePage && <hr />}
      </div>

      {profilePage ? (
        ''
      ) : (
        <span>
          <Link to={`/profile/${user?._id}`}>My Profile</Link>
        </span>
      )}
    </div>
  )
}

export default ProfileCard

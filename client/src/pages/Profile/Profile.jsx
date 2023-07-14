import React from 'react'
import './Profile.css'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import PostSide from '../../components/PostSide/PostSide'
import RightSide from '../../components/RightSide/RightSide'

const Profile = () => {
  return (
    <div className="Profile">
      <div className="newProfileLeft">
        <ProfileLeft />
      </div>

      <div className="Profile-center">
        <ProfileCard location="profilePage" />
        <div className="oldProfileLeft">
          <ProfileLeft />
        </div>
        <PostSide />
      </div>

      <RightSide location="profile" />
    </div>
  )
}

export default Profile

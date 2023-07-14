import React, { useEffect, useState } from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import ProfileModal from '../ProfileModal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from '../../Api/UserRequest.jsx'
import { logOut } from '../../Actions/authActions'

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false)

  const dispatch = useDispatch()
  const params = useParams()
  const profileUserId = params.id

  const [profileUser, setProfileUser] = useState()

  const { user } = useSelector((state) => state.AuthReducer.authData)

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user)
      } else {
        const profileUser = await UserApi.getUser(profileUserId)
        setProfileUser(profileUser)
      }
    }
    fetchProfileUser()
  }, [user])
  // console.log(profileUser)

  const handleLogOut = () => {
    dispatch(logOut())
  }
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ''
        )}
      </div>

      <div className="info">
        <span>
          <b>Status - </b>
        </span>
        <span>{profileUser?.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in - </b>
        </span>
        <span>{profileUser?.livesIn}</span>
      </div>

      <div className="info">
        <span>
          <b>Works in - </b>
        </span>
        <span>{profileUser?.worksAt}</span>
      </div>

      <div className="info">
        <span>
          <b>Country - </b>
        </span>
        <span>{profileUser?.country}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  )
}

export default InfoCard

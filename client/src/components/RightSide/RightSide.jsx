import React, { useState } from 'react'
import './RightSide.css'
import {
  UilSetting,
  UilEstate,
  UilBell,
  UilCommentExclamation,
} from '@iconscout/react-unicons'
import TrendCard from '../TrendCard/TrendCard'
import ShareModal from '../ShareModal/ShareModal'
import { Link } from 'react-router-dom'

const RightSide = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to={'/home'}>
          <UilEstate />
          {location !== 'home' && <div className="home_btn button">Home</div>}
        </Link>
      </div>

      <TrendCard />

      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  )
}

export default RightSide

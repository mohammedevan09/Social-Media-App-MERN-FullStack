import React from 'react'
import './LogoSearch.css'
import Logo from '../../img/logo.png.png'
import { UilSearch } from '@iconscout/react-unicons'

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" className="logo" />
      <div className="Search">
        <input type="text" placeholder="Explore now" />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>
    </div>
  )
}

export default LogoSearch

import React, { useEffect, useState } from 'react'
import './FollowersCard.css'
import User from '../user/User'
import { useSelector } from 'react-redux'
import { getAllUser } from '../../Api/UserRequest.jsx'

const FollowersCard = () => {
  const [persons, setPersons] = useState([])
  const { user } = useSelector((state) => state.AuthReducer.authData)

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser()
      setPersons(data)
    }
    fetchPersons()
  }, [])

  // console.log(persons)

  return (
    <div className="FollowersCard">
      <h3>Who is following you</h3>

      {persons?.map((person, i) => {
        if (person?._id !== user._id) {
          return <User person={person} key={i} />
        }
      })}
    </div>
  )
}

export default FollowersCard

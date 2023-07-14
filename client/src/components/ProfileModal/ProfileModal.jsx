import React, { useState } from 'react'
import './ProfileModal.css'
import { Modal, useMantineTheme } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { uploadImage } from '../../Actions/uploadAction'
import { updateUser } from '../../Actions/userActions'

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme()
  const { password, ...other } = data
  const [formData, setFormData] = useState(other)
  const [profileImage, setProfileImage] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const dispatch = useDispatch()
  const param = useParams()
  const { user } = useSelector((state) => state.AuthReducer.authData)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  // console.log(formData)

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      event.target.name === 'profilePicture'
        ? setProfileImage(img)
        : setCoverImage(img)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let UserData = formData
    if (profileImage) {
      const data = new FormData()
      const fileName = Date.now() + profileImage.name
      data.append('name', fileName)
      data.append('file', profileImage)
      UserData.profilePicture = fileName
      try {
        dispatch(uploadImage(data))
      } catch (err) {
        console.log(err)
      }
    }
    if (coverImage) {
      const data = new FormData()
      const fileName = Date.now() + coverImage.name
      data.append('name', fileName)
      data.append('file', coverImage)
      UserData.coverPicture = fileName
      try {
        dispatch(uploadImage(data))
      } catch (err) {
        console.log(err)
      }
    }
    dispatch(updateUser(param.id, UserData))
    setModalOpened(false)
    // console.log(UserData)
  }
  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[9]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div className="names">
          <input
            type="text"
            className="infoInput"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstName}
          />
          <input
            type="text"
            className="infoInput"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastName}
          />
        </div>

        <div className="worksAt">
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>

        <div className="locations">
          <input
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="Lives In"
            onChange={handleChange}
            value={formData.livesIn}
          />
          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        <div className="relation-status">
          <input
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="RelationShip Status"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>

        <div className="imageModal">
          <div className="profileImageModal">
            Profile Image{' '}
            <input type="file" name="profilePicture" onChange={onImageChange} />
          </div>
          <div className="coverImageModal">
            Cover Image{' '}
            <input type="file" name="coverPicture" onChange={onImageChange} />
          </div>
        </div>

        <button
          className="button infoButton updateButton"
          onClick={handleSubmit}
        >
          Update
        </button>
      </form>
    </Modal>
  )
}

export default ProfileModal

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Auth.css'
import Logo from '../../img/logo.png.png'
import { logIn, signUp } from '../../Actions/authActions.jsx'

const Auth = () => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state?.AuthReducer)
  const [isSignUp, setIsSignUp] = useState(true)
  const [confirmPass, setConfirmPass] = useState(true)
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPass: '',
    username: '',
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignUp) {
      data.password === data.confirmPass
        ? dispatch(signUp(data))
        : setConfirmPass(false)
    } else {
      dispatch(logIn(data))
    }
  }

  const resetForm = () => {
    setConfirmPass(true)
    setData({
      firstName: '',
      lastName: '',
      password: '',
      confirmPass: '',
      username: '',
    })
  }

  return (
    <div className="Auth">
      {/* Left Side */}
      <div className="a-left">
        <img src={Logo} alt="" className="authLogo" />
        <div className="Webname">
          <h1>Futuristic</h1>
          <h6>Explore the ideas throughout the universe</h6>
        </div>
      </div>

      {/* Right Side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? 'Sign up' : 'Log In'}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              className="infoInput"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
          </div>
          {isSignUp && (
            <div>
              <input
                type="password"
                className="infoInput"
                placeholder="Confirm Password"
                name="confirmPass"
                onChange={handleChange}
                value={data.confirmPass}
              />
            </div>
          )}
          <span
            style={{
              color: 'red',
              fontSize: '12px',
              alignSelf: 'center',
              marginRight: '5px',
              display: confirmPass ? 'none' : 'block',
            }}
          >
            *Confirm password is not same
          </span>
          <div>
            <span
              style={{ fontSize: '16px', cursor: 'pointer' }}
              onClick={() => {
                setIsSignUp((prev) => !prev)
                resetForm()
              }}
            >
              {isSignUp
                ? 'Already have an account? Login!'
                : "Don't have an account? SignUp!"}
            </span>
          </div>
          {error ? 'Wrong password' : ''}
          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading....' : isSignUp ? 'Sign up' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth

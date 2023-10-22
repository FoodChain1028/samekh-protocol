import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import { Link } from 'react-router-dom'
import { User, UserId } from '../contexts/User'

const SignUp: React.FC = () => {
  const [success, setSuccess] = useState<boolean>(false)
  const [dataRender, setDataRender] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  const handleSignUp = async () => {
    const random = Math.floor(Math.random() * 10000000000)
    const userId = { secret: random, index: 0 } as UserId
    const newUser = new User(userId)
    const index = await newUser.signUp()
    newUser.setIndex(index)
    setUser(newUser)
    setSuccess(true)
  }

  useEffect(() => {
    if (success) {
      setDataRender(true)
      setSuccess(false)
    }
  }, [success])

  return (
    <div className="page-container">
      <Banner />
      <h2 className="page-header">This is Sign Up Page!</h2>
      <h2 className="page-header">Please sign up with your own secret.</h2>
      <div className="login-form">
        <button
          className="sign-up-button page-button"
          onClick={() => {
            handleSignUp()
          }}
        >
          Sign Up
        </button>
      </div>
      {dataRender && (
        <div>
          <div> This is your secret and index: </div>
          <br />
          <div> Secret: {user?.userId.secret.toString()} </div>
          <br />
          <div> Index: {user?.userId.index.toString()} </div>
        </div>
      )}

      <br />
      <div className="login-link">
        <Link to="/login">I already have an account, go `Log In`</Link>
      </div>
    </div>
  )
}

export default SignUp

import User, { UserId } from './contexts/User'

function App() {
  const handleButtonClick = async () => {
    const userId = {
      secret: 'secret',
      index: 0,
    } as UserId
    const user = new User(userId)
    const isSucceeded = await user.signUp()
    console.log(isSucceeded)
  }

  return (
    <div className="App">
      <button onClick={handleButtonClick} className="custom-button">
        SignUp
      </button>
    </div>
  )
}

export default App

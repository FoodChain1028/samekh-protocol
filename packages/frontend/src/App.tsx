import User, { UserId } from './contexts/User'

const userId = {
  secret: 12345,
  index: 0,
} as UserId
const user = new User(userId)

function App() {
  const handleSignUp = async () => {
    const index = await user.signUp()
    user.setIndex(index)
    console.log(`App.tsx(11): ${index}`)
  }

  const handleExecute = async () => {
    const res = await user.execute()
    console.log(res);
    
  }

  return (
    <div className="App">
      <button onClick={handleSignUp} className="custom-button">
        SignUp
      </button>
      <button onClick={ handleExecute } className="custom-button">Execute</button>
    </div>
  )
}

export default App

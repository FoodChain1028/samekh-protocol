import User, { UserId } from './contexts/User'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';

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
    // const res = await user.execute()
    // console.log(res);
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={ <SignUp/> } />
        {/* <Route path='/dashboard' Component={}/> */}
      </Routes>
    </Router>
  )
}

export default App

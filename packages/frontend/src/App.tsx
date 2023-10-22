import User, { UserId } from './contexts/User'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        {/* <Route path='/dashboard' Component={}/> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App

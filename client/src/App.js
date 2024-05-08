import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedPage from './components/protectedPage'
import Spinner from './components/spinner'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import Admin from './pages/Admin/admin'
import ProductInfo from './pages/productInfo'
function App() {
  const { loading } = useSelector((state) => state.loaders)
  return (
    <div className="h-screen ">
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedPage><Home /></ProtectedPage>} />
          <Route path='/profile' element={<ProtectedPage><Profile /></ProtectedPage>} />
          <Route path='/admin' element={<ProtectedPage> <Admin /> </ProtectedPage>} />
          <Route path='/product/:id' element={<ProtectedPage><ProductInfo /></ProtectedPage>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

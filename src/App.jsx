import './App.css'
import ProductCard from './components/productCard'
import HomePage from './pages/homePage'
import RegisterPage from './pages/registerPage'
import LoginPage from './pages/loginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'


function App() {
  
  
  return (
    
    <BrowserRouter>
          <div className='w-full h-screen bg-green-100 flex justify-center items-center'>
            <Toaster position="bottom-left" reverseOrder={false}/>
            <div className='w-full h-screen flex items-center justify-center'>
              <Routes path='/'>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/test' element={<TestPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/admin/*' element={<AdminPage/>}/>
                
              </Routes>
            </div>
          </div>
    </BrowserRouter>
  )
}

export default App

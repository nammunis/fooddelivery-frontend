import './App.css'
import ProductCard from './components/productCard'
import HomePage from './pages/homePage'
import RegisterPage from './pages/registerPage'
import LoginPage from './pages/loginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'
import clientPage from './pages/client/clientPage'
import ClientPage from './pages/client/clientPage'


function App() {
  
  
  return (
    
    <BrowserRouter>
          <div className='w-full h-screen'>
            <Toaster position="bottom-left" reverseOrder={false}/>
            <div className='w-full h-screen'>
              <Routes path='/'>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/test' element={<TestPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/admin/*' element={<AdminPage/>}/>
                <Route path='/*' element={<ClientPage/>}/>
                
              </Routes>
            </div>
          </div>
    </BrowserRouter>
  )
}

export default App

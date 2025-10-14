import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassowrd from './pages/ForgotPassowrd'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import useGetCity from './hooks/useGetCity'
import useGetMyShop from './hooks/useGetMyShop'
import CreateEditShop from './pages/CreateEditShop'
import AddItem from './pages/AddItem'
import EditItem from './pages/EditItem'
import usegetShopByCity from './hooks/useGetShopByCity'
import useGetItemsByCity from './hooks/useGetItemsBycity'

export const serverUrl="http://localhost:8000"

const App = () => {
  useGetCurrentUser()
  useGetCity()
  useGetMyShop()
  useGetMyShop()
  usegetShopByCity()
  useGetItemsByCity()
  const {userData}=useSelector(state=>state.user)
  return (
    <Routes>
      <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
      <Route path='/signin' element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>
      <Route path='/forgot-password' element={!userData?<ForgotPassowrd/>:<Navigate to={"/"}/>}/>
      <Route path='/' element={userData?<Home/>:<Navigate to={"/signin"}/>}/>
      <Route path='/create-edit-shop' element={userData?<CreateEditShop/>:<Navigate to={"/signin"}/>}/>
      <Route path='/add-item' element={userData?<AddItem/>:<Navigate to={"/signin"}/>}/>
      <Route path='/edit-item/:itemId' element={userData?<EditItem/>:<Navigate to={"/signin"}/>}/>
    </Routes>
  )
}

export default App

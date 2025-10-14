import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import axios from 'axios'
import { setShopsInMyCity } from '../redux/userSlice'


function usegetShopByCity(){
  const dispatch=useDispatch()
  const {currentCity}=useSelector(state=>state.user)
  useEffect(()=>{
    const fetchShop=async () =>{
      try {
        const result=await axios.get(`${serverUrl}/api/shop/get-by-city/${currentCity}`,
          {withCredentials:true})
        dispatch(setShopsInMyCity(result.data))
        console.log(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchShop()
  },[currentCity])
}

export default usegetShopByCity

import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { serverUrl } from '../App'
import axios from 'axios'
import { setMyShopData } from '../redux/ownerSlice'


function useGetMyShop (){
  const dispatch=useDispatch()
  useEffect(()=>{
    const fetchUser=async () =>{
      try {
        const result=await axios.get(`${serverUrl}/api/shop/get-my`,
          {withCredentials:true})
        dispatch(setMyShopData(result.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  },[])
}

export default useGetMyShop

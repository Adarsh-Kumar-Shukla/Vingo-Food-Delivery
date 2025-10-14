import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import { categories } from '../category'
import CategoryCard from './CategoryCard'
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaCircleChevronRight } from "react-icons/fa6";
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import FoodCart from './FoodCart';

const UserDashboard = () => {
  const {currentCity,shopInMyCity,itemsInMyCity }=useSelector(state=>state.user)
  const cateScrollRef=useRef()
  const shopScrollRef=useRef()
  const [showLeftCateButton,setShowLeftCateButton]=useState(false);
  const [showrightCateButton,setShowrightCateButton]=useState(false);
  const [showLeftShopButton,setShowLeftShopButton]=useState(false);
  const [showRightShopButton,setShowRightShopButton]=useState(false);

  const updateButtom=(ref,setLeftButton,setRightButton)=>{
    const element=ref.current
    if(element){
      setLeftButton(element.scrollLeft>0)
      setRightButton(element.scrollLeft+element.clientWidth < element.scrollWidth)
    }
  }

  const scrollHandler=(ref,direction)=>{
    if(ref.current){
      ref.current.scrollBy({
        left:direction=="left"?-200:200,
        behavior:"smooth"
      })
    }
  }
  useEffect(()=>{
    if(cateScrollRef.current){
      updateButtom(cateScrollRef,setShowLeftCateButton,setShowrightCateButton)
      updateButtom(shopScrollRef,setShowLeftShopButton,setShowRightShopButton)

      cateScrollRef.current.addEventListener('scroll',()=>{
        updateButtom(cateScrollRef,setShowLeftCateButton,setShowrightCateButton)
      })
      shopScrollRef.current.addEventListener('scroll',()=>{
        updateButtom(shopScrollRef,setShowLeftShopButton,setShowRightShopButton)
      })
    }
    return ()=>{cateScrollRef.current.removeEventListener('scroll',()=>{
        updateButtom(cateScrollRef,setShowLeftCateButton,setShowrightCateButton)
      }),
      shopScrollRef.current.removeEventListener('scroll',()=>{
        updateButtom(shopScrollRef,setShowLeftShopButton,setShowRightShopButton)
      })
    }
  },[categories])
  return (
    <div className='w-screen min-h-screen bg-[#fff9f6] flex flex-col gap-5 items-center overflow-y-auto'>
      <Nav/>

        {/* categories div */}

      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px] pt-23' >
        <h1 className='text-gray-800 text-2xl sm:text-3xl' >Inspiration for your first order</h1>
        <div className='w-full relative'>
          {showLeftCateButton && 
            <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={()=>{
                scrollHandler(cateScrollRef,"left")
              }} >
                <FaChevronCircleLeft size={25} />
            </button>
          }
          <div className='w-full flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-[#ff4d2d] scrollbar-track-transparent scroll-smooth' ref={cateScrollRef} >
            {categories.map((shop,index)=>(
              <CategoryCard name={shop.name} image={shop.image} key={index}/>
            ))}
          </div>
          {showrightCateButton && 
            <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={()=>{
              scrollHandler(cateScrollRef,"right")
            }} >
              <FaCircleChevronRight size={25} />
            </button>
          }
        </div>
      </div>

      {/* shop div */}

      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]' >
          <h1 className='text-gray-800 text-2xl sm:text-3xl' >Best shop in {currentCity}</h1>
          <div className='w-full relative'>
          {showLeftShopButton && 
            <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={()=>{
                scrollHandler(shopScrollRef,"left")
              }} >
                <FaChevronCircleLeft size={25} />
            </button>
          }
          <div className='w-full flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-[#ff4d2d] scrollbar-track-transparent scroll-smooth' ref={shopScrollRef} >
            {shopInMyCity.map((cate,index)=>(
              <CategoryCard name={cate.category} image={cate.image} key={index}/>
            ))}
          </div>
          {showRightShopButton && 
            <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={()=>{
              scrollHandler(shopScrollRef,"right")
            }} >
              <FaCircleChevronRight size={25} />
            </button>
          }
        </div>
      </div>

      {/* product */}

      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]' >
          <h1 className='text-gray-800 text-2xl sm:text-3xl' >Suggested Food Items</h1>
          <div className='w-full h-auto flex flex-wrap gap-[20px] justify-center' >
            {itemsInMyCity?.map((item,index)=>(
              <FoodCart key={index} data={item} />
            ))}
          </div>
      </div>
    </div>
  )
}

export default UserDashboard
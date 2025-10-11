import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import {} from "react-spinners"
import { ClipLoader } from "react-spinners"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";


const SignIn = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgcolor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword , setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [err,setErr]=useState("")
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()

  const handleSignIn = async () => {
    try{
      setLoading(true)
      const result = await axios.post(`${serverUrl}/api/auth/signin`,{
        email,password,
      },{withCredentials:true})
      dispatch(setUserData(result.data))
      setErr("")
      setLoading(false)
    }
    catch(error) {
      setErr(error?.response?.data?.message)
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    const provider=new GoogleAuthProvider()
    const result=await signInWithPopup(auth,provider)
    try {
      const {data}=await axios.post(`${serverUrl}/api/auth/google-auth`,{
        email:result.user.email,
      },{withCredentials:true})
      dispatch(setUserData(result.data))
      setErr("")
    } catch (error) {
      setErr(error?.response?.data?.message)
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundColor: bgcolor,
      }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`}
        style={{
          border: `1px solid ${borderColor}`,
        }}
      >
        <h1
          className=" text-3xl font-bold mb-2 "
          style={{ color: primaryColor }}
        >
          Vingo
        </h1>
        <p className="text gray-600 mb-8">Sign In your account to get started with delicious food deliveries</p>

        {/* email */}

        <div className="mb-4" >
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email :</label>
          <input type="email" className="w-full border rounded-lg px-3 py-2 focus:outline-none" placeholder="Enter your Email Address" style={{border:`1px solid ${borderColor}`}} onChange={(e)=>setEmail(e.target.value)} value={email} required ></input>
        </div>

        {/* password */}

        <div className="mb-4" >
          <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password :</label>
          <div className="relative flex" >
            <input type={`${showPassword?"text":"password"}`} className="w-full border rounded-lg px-3 py-2 focus:outline-none " placeholder="Enter your Password" style={{border:`1px solid ${borderColor}`}} onChange={(e)=>{setPassword(e.target.value)}} value={password} required ></input>
            <div className="absolute right-4 m-2" onClick={()=>setShowPassword(!showPassword)} >
                {showPassword?<FaEyeSlash size={20}  />:<FaEye size={20}  />}
            </div>
          </div>
          <div className="text-right text-[#ff4d2d] font-medium cursor-pointer" onClick={()=>navigate("/forgot-password")} >
            Forgot Password?
          </div>
        </div>

        <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer `} onClick={handleSignIn} disabled={loading} >
          {loading?<ClipLoader size={20} color="white" />:"Sign In"}
        </button>    

        {err && <p className="text-red-500 text-center py-[10px]" >*{err}</p>}

        <button className="w-full mt-4 cursor-pointer flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-200" onClick={handleGoogleAuth} >
          <FcGoogle size={20} />
          <span>Sign In with Google</span>
        </button>
        <p className="text-center mt-6 cursor-pointer" onClick={()=>{navigate("/signup")}} >Does not have Account?<span className="text-[#ff4d2d]" >Sign Up</span></p>
      </div>
    </div>
  );
};

export default SignIn;

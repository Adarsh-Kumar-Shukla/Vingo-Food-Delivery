import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";


const SignUp = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgcolor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword , setShowPassword] = useState(false)
  const [role,setRole] = useState("user")
  const navigate = useNavigate()
  const [fullName, setFullName]=useState("")
  const [email, setEmail]=useState("")
  const [mobile,setMobile]=useState("")
  const [password, setPassword]=useState("")
  const [err,setErr]=useState("")
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()

  
  const handleSignUp = async () => {
    setLoading(true)
    try{
      const result = await axios.post(`${serverUrl}/api/auth/signup`,{
        fullName,email,password,mobile,role
      },{withCredentials:true})
      dispatch(setUserData(result.data))
      setErr("")
      setFullName("")
      setEmail("")
      setMobile("")
      setPassword("")
      setRole("user")
      setLoading(false)
    }
    catch(error) {
      setErr(error?.response?.data?.message)
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    if(!mobile){
      return setErr("Mobile Number is required")
    }
    const provider=new GoogleAuthProvider()
    const result=await signInWithPopup(auth,provider)
    try {
      const {data}=await axios.post(`${serverUrl}/api/auth/google-auth`,{
        fullName:result.user.displayName,
        email:result.user.email,
        role,
        mobile
      },{withCredentials:true})
      dispatch(setUserData(data))
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
        <p className="text gray-600 mb-8">Create your account to get started with delicious food deliveries</p>

        {/* fullname */}

        <div className="mb-4" >
          <label htmlFor="fullname" className="block text-gray-700 font-medium mb-1">Full Name :</label>
          <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none" placeholder="Enter your Full Name" style={{border:`1px solid ${borderColor}`}} onChange={(e)=>setFullName(e.target.value)} value={fullName} required ></input>
        </div>

        {/* email */}

        <div className="mb-4" >
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email :</label>
          <input type="email" className="w-full border rounded-lg px-3 py-2 focus:outline-none" placeholder="Enter your Email Address" style={{border:`1px solid ${borderColor}`}} onChange={(e)=>setEmail(e.target.value)} value={email} required ></input>
        </div>

        {/* mobile */}

        <div className="mb-4" >
          <label htmlFor="mobile" className="block text-gray-700 font-medium mb-1">Mobile Number :</label>
          <input type="number" className="w-full border rounded-lg px-3 py-2 focus:outline-non" placeholder="Enter your Mobile Number" style={{border:`1px solid ${borderColor}`}} onChange={(e)=>{setMobile(e.target.value)}} value={mobile} required ></input>
        </div>
        
        {/* password */}

        <div className="mb-4" >
          <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password :</label>
          <div className="relative flex " >
            <input type={`${showPassword?"text":"password"}`} className="w-full border rounded-lg px-3 py-2 focus:outline-none " placeholder="Enter your Password" style={{border:`1px solid ${borderColor}`}} onChange={(e)=>{setPassword(e.target.value)}} value={password} required ></input>
            <div className="absolute right-4 m-2" onClick={()=>setShowPassword(!showPassword)} >
               {showPassword?<FaEyeSlash size={20}  />:<FaEye size={20}  />}
            </div>
          </div>
          
        </div>

        {/* Role */}

        <div className="mb-4" >
          <label htmlFor="role" className="block text-gray-700 font-medium mb-1">Role :</label>
          <div className="flex gap-2" >
            {["user","owner","deliveryBoy"].map((r,)=>(
              <button key={Math.random(10)}
                className="flex-1 border cursor-pointer rounded-lg px-3 py-2 text-center font-medium transition-colors" 
                onClick={()=>setRole(r)}
                style={
                  role==r?
                  {backgroundColor:primaryColor,color:"white"}
                  :{border:`1px solid ${primaryColor}`,color:primaryColor}
                }
              >{r}</button>
            ))}
          </div>
          
        </div>

        <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer `} onClick={handleSignUp} disabled={loading} >
          {loading?<ClipLoader size={20} color="white"/>:"Sign Up"}</button>

        {err && <p className="text-red-500 text-center py-[10px]" >*{err}</p>}    

        <button className="w-full mt-4 cursor-pointer flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-200" onClick={handleGoogleAuth} >
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>
        <p className="text-center mt-6 cursor-pointer" onClick={()=>{navigate("/signin")}} >Already have an acount?<span className="text-[#ff4d2d]" >Sign In</span></p>
      </div>
    </div>
  );
};

export default SignUp;

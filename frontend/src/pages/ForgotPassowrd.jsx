import React, { useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App.jsx'
import axios from 'axios';
import { ClipLoader } from "react-spinners"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword,setShowConfirmPassword]=useState(false)
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [err,setErr]=useState("")
  const [loading,setLoading]=useState(false)

  const handleSendOtp = async () => {
    try {
      setLoading(true)
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      )
      console.log(result);
      setErr("")
      setLoading(false)
      setStep(2);
    } catch (error) {
      setErr(error?.response?.data?.message)
      setLoading(false)
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true)
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result);
      setStep(3);
      setLoading(false)
      setErr("")
    } catch (error) {
      setErr(error?.response?.data?.message)
      setLoading(false)
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      setLoading(true)
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      console.log(result);
      setErr("")
      setLoading(false)
      navigate("/signin");
    } catch (error) {
      setErr(error?.response?.data?.message)
      setLoading(false)
    }
  };

  return (
    <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
      <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
        <div className='flex items-center gap-4 mb-4'>
          <IoMdArrowRoundBack
            size={30}
            className='text-[#ff4d2d] cursor-pointer'
            onClick={() => navigate("/signin")}
          />
          <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>
            Forgot Password
          </h1>
        </div>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email :
              </label>
              <input
                type="email"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter your Email Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button
              className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
              onClick={handleSendOtp} disabled={loading}
            >
              {loading?<ClipLoader size={20}color='white'/>:"Send OTP"}
            </button>

            {err && <p className="text-red-500 text-center py-[10px]" >*{err}</p>}  
          </div>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <div>
            <div className="mb-6">
              <label htmlFor="otp" className="block text-gray-700 font-medium mb-1">
                OTP :
              </label>
              <input
                type="text"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
            <button
              className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
              onClick={handleVerifyOtp} disabled={loading}
            >
              {loading?<ClipLoader size={20}color='white'/>:"Verify"}
            </button>
            {err && <p className="text-red-500 text-center py-[10px]" >*{err}</p>}
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <div>
            <div className="mb-6">
              <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">
                New Password :
              </label>
              <div className="relative flex">
                <input
                  type={`${showPassword?"text":"password"}`} 
                  className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                  placeholder="Enter New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  required
                />
                <div className="absolute right-4 m-2" onClick={()=>setShowPassword(!showPassword)} >
                    {showPassword?<FaEyeSlash size={20}  />:<FaEye size={20}  />}
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
                Confirm Password :
              </label>
              <div className="relative flex">
                <input
                  type={`${showConfirmPassword?"text":"password"}`}
                  className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                />
                <div className="absolute right-4 m-2" onClick={()=>setShowConfirmPassword(!showConfirmPassword)} >
                    {showConfirmPassword?<FaEyeSlash size={20}  />:<FaEye size={20}  />}
                </div>
              </div>
            </div>
            <button
              className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
              onClick={handleResetPassword} disabled={loading}
            >
              {loading?<ClipLoader size={20}color='white'/>:"Reset Password"}
            </button>
            {err && <p className="text-red-500 text-center py-[10px]" >*{err}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Account created successfully! Please login.");
      navigate("/login");
    }, 1200);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 font-['Plus_Jakarta_Sans']"
      style={{
        background:
          "radial-gradient(circle at 80% 20%, rgba(4, 58, 37, 1) 20%, rgba(6, 43, 43, 1) 50%, rgb(2, 11, 44) 100%)",
      }}
    >
      <div className="bg-[#1a2223] rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] px-6 sm:px-8 md:px-10 py-6 sm:py-7 md:py-8 w-full max-w-md border border-white/10 backdrop-blur-md relative">
        {/* Back button */}
        <button
          onClick={() => navigate("/login")}
          className="absolute top-5 left-4 sm:top-6 sm:left-6 text-gray-500 hover:text-[#22c55e] transition-colors"
        >
          <FaArrowLeft size={16} />
        </button>

        {/* Header */}
        <div className="text-center mb-5 sm:mb-6 mt-2">
          <div className="inline-block bg-[#1a2223] px-4 sm:px-6 py-2 rounded-xl mb-2 border border-[#22c55e]/30">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">
              <span className="text-[#22c55e]">Register</span>
            </h2>
          </div>
          <p className="text-gray-300 text-sm sm:text-base font-medium">
            Set up your manager account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-3 sm:space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">
              Full Name
            </label>
            <div className="group flex items-center bg-[#252d2e] rounded-xl px-3 sm:px-4 py-2 border border-white/5 focus-within:border-[#22c55e]/50 transition-all">
              <FaUser className="text-gray-500 text-sm sm:text-base" />
              <input
                type="text"
                placeholder="John Doe"
                required
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-600 ml-3 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <div className="group flex items-center bg-[#252d2e] rounded-xl px-3 sm:px-4 py-2 border border-white/5 focus-within:border-[#22c55e]/50 transition-all">
              <FaEnvelope className="text-gray-500 text-sm sm:text-base" />
              <input
                type="email"
                placeholder="manager@company.com"
                required
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-600 ml-3 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">
              Create Password
            </label>
            <div className="group flex items-center bg-[#252d2e] rounded-xl px-3 sm:px-4 py-2 border border-white/5 focus-within:border-[#22c55e]/50 transition-all">
              <FaLock className="text-gray-500 text-sm sm:text-base" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                required
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-600 ml-3 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="text-gray-500 hover:text-[#22c55e] ml-2"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">
              Confirm Password
            </label>
            <div className="group flex items-center bg-[#252d2e] rounded-xl px-3 sm:px-4 py-2 border border-white/5 focus-within:border-[#22c55e]/50 transition-all">
              <FaLock className="text-gray-500 text-sm sm:text-base" />
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="••••••••"
                required
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-600 ml-3 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="text-gray-500 hover:text-[#22c55e] ml-2"
              >
                {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#22c55e] hover:bg-[#1eb054] text-[#0f111a] py-3.5 rounded-xl font-black text-base transition-all shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Create Account"} <FaCheckCircle />
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            Already a member?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#22c55e] font-bold hover:underline ml-1"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

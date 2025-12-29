import React, { useState } from "react";
import { FaUser, FaLock, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 font-['Plus_Jakarta_Sans'] overflow-auto"
      style={{
        background:
          "radial-gradient(circle at 80% 20%, rgba(4, 58, 37, 1) 20%, rgba(6, 43, 43, 1) 50%, rgb(2, 11, 44) 100%)",
      }}
    >
      {/* Container */}
      <div className="bg-[#1a2223] rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] p-6 sm:p-8 md:p-10 w-full max-w-md border border-white/10 backdrop-blur-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block bg-[#1a2223] px-4 sm:px-6 py-2 rounded-xl mb-4 border border-[#22c55e]/30">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">
              <span className="text-[#22c55e]">INV</span>ENTORY
            </h2>
          </div>
          <p className="text-gray-300 text-sm sm:text-base font-medium">
            Please enter your details to login
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
          {/* Email */}
          <div className="space-y-1 sm:space-y-2">
            <label className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <div className="group flex items-center bg-[#252d2e] rounded-xl px-3 sm:px-4 py-2.5 border border-white/5 focus-within:border-[#22c55e]/50 transition-all">
              <FaUser className="text-gray-500 text-sm sm:text-base" />
              <input
                type="email"
                required
                placeholder="name@company.com"
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-600 ml-3 text-sm sm:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1 sm:space-y-2">
            <label className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">
              Password
            </label>
            <div className="group flex items-center bg-[#252d2e] rounded-xl px-3 sm:px-4 py-2.5 border border-white/5 focus-within:border-[#22c55e]/50 transition-all">
              <FaLock className="text-gray-500 text-sm sm:text-base" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-600 ml-3 text-sm sm:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-[#22c55e] ml-2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#22c55e] hover:bg-[#1eb054] text-[#0f111a] py-3.5 rounded-xl font-black text-base transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
          >
            {loading ? "Verifying..." : "Login to Dashboard"} <FaArrowRight />
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-400 mt-6 sm:mt-8 text-sm sm:text-base">
          New here?
          <button
            onClick={() => navigate("/signup")}
            className="text-[#22c55e] font-bold hover:underline ml-1"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;

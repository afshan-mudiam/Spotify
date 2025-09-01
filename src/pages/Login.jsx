import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = React.useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter valid details");
      return;
    }

    const loginApiUrl = "https://apis.ccbp.in/login";
    const userDetails = { username, password };
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(loginApiUrl, options);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("jwt_token", data.jwt_token);
        login(username); 
        navigate("/home");
      } else {
        setError(data.error_msg || "Login failed. Try again.");
      }
    } catch  {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url('https://cdn.wallpapersafari.com/0/35/ihpwMs.jpg')",
      }}
    >
      <div className="absolute inset-0 "></div>
      <div className="relative z-10 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md bg-black bg-opacity-80 backdrop-blur-sm transform transition-all duration-500 ease-in-out hover:scale-105">
        {/* Logo / Wave */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTqxtmaRjflish9djBX6QSMnKk787vqj7AK25zcWO_3VDhezatS" alt="" />
           
          </div>
        </div>

        {error && (
          <div className="bg-red-600 text-white text-sm text-center py-2 px-4 rounded-lg mb-4 animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 border-2 border-transparent transition-all duration-300 text-sm sm:text-base"
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 border-2 border-transparent transition-all duration-300 text-sm sm:text-base"
          />

          <label className="flex items-center space-x-2 text-gray-300 text-sm sm:text-base select-none">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <span>Show Password</span>
          </label>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from "react";
import API from "./api";

const Register = ({ onLogin }) => {  // ✅ Accept onLogin as a prop
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/register", { 
        name, 
        email, 
        password, 
        password_confirmation: confirmPassword, 
        withCredentials: true,  
      });

      localStorage.setItem("token", res.data.token); // Save JWT token
      onLogin(res.data.user);  // ✅ Call onLogin to update state
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-700">Register</h2>
        
        {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleRegister} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Name</label>
            <input 
              type="text"  // ✅ Change type="name" to type="text"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-indigo-200"
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-indigo-200"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-indigo-200"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Confirm Password</label>
            <input 
              type="password"  // ✅ Fix security issue by using type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-indigo-200"
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Have an account? <a href="/login" className="text-indigo-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

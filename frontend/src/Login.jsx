import { useState } from "react";
import API from "./api";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/login", { email, password, withCredentials: true, },);
      localStorage.setItem("token", res.data.token); // Save JWT token
      onLogin(res.data.user); // Save user details
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        
        {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleLogin} className="mt-6">
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

          <button 
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <a href="/register" className="text-indigo-500">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useLogin } from "../../hook/useLogin"
import { Toaster, toast } from 'react-hot-toast'; 

function Login() {
  // State for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login,error} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);

    if (response?.success) {
      toast.success("Login successful!");
    } else {
      toast.error(error || "Login failed. Please try again.");
    }
  };

  return (
    <div>
    <Toaster position="top-right" reverseOrder={false} /> 
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-green-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded-lg text-black focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-white font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 rounded-lg text-black focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white text-sm">Don't have an account? 
            <Link to="/register" className="text-green-400 hover:underline"> Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Login;

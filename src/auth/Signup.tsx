import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import bg from "../assets/auth/bg.png"

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
const Signup = () => {

  const [form, setForm] = useState({ name: '', email: '', password: '' }) 

      // const localhost = 'http://localhost:5000/auth/'
      const vercelhost = 'https://mind-canvas-backend.vercel.app/api/auth'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Name:", form.name, "Email:", form.email , "Password:", form.password);
    try{
      const response = await fetch(`${vercelhost}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await response.json()
      console.log(data)
 if (response.ok) {
      toast.success("Account created successfully! Please login.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500); 
    } else {
      toast.error(data.message || "Failed to create account. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("An error occurred. Please try again.");
  }    }

  return (
    <div 
    style={{ backgroundImage: `url(${bg})` }}
    className="flex justify-center items-center min-h-screen">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Seonds to Signup!</h1>
        <p className="text-sm text-gray-500 mb-6">Welcome please enter your details</p>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary p-2 focus:ring-primary"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary p-2 focus:ring-primary"
              placeholder="Enter Your Email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary p-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-primary rounded-md hover:bg-orange-600 transition"
          >
            Sign Up
          </button>

          <button
            type="button"
            className="w-full py-2 px-4 text-gray-700 border border-gray-300 rounded-md flex items-center justify-center space-x-2 mt-2"
          >
            <FcGoogle size={24} />
            <span>Sign in with Google</span>
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

import { useState } from "react";

export default function Signup() {
  
  const[form,setForm] = useState({
    firstname:"",
    lastname:"",
    username:"",
    password:"",
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e:any) => {
    setForm({...form,[e.target.name]:e.target.value});
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(form),
      });
      const data = await res.json();
      if(res.ok){
        alert('Signup successful !!');
        window.location.href = "/signin";
      }else{
        alert("Signup Failed: " + data.message);
      }
    } catch (error) {
      alert("Network error, Please try again later."+ error)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-gray-700">First Name</label>
            <input
              name="firstname"
              type="text"
              placeholder="John"
              value={form.firstname}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">UserName</label>
            <input
              type="text"
              placeholder="john_doe"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

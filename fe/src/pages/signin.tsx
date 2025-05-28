import { useState } from "react";
import { data, useNavigate } from "react-router-dom";


export default function Signin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/signin", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({username: form.username,password:form.password}),
      });

      const data = await res.json()

      if(res.ok){
        alert(data.message);
        localStorage.setItem("token", data.token);
  
        navigate('/dashboard');
      }else{
        alert("Signin Failed: " + data.message);
      }
      
    } catch (error) {
      alert("Network error: " + error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-gray-700">Username</label>
            <input
              type="Username"
              placeholder="username"
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
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

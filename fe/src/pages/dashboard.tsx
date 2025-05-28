import { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode }from "jwt-decode"; 
import { useNavigate } from "react-router-dom";
import { UserIcon } from "../assets/userIcon";


export default function Dashboard() {
  

  return (
    <div className="flex bg-gray-100 min-h-screen p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Payment Dashboard
          </h1>
          <div className="flex items-center space-x-2  px-3 py-1 rounded-full">
            <div className="flex items-center space-x-3 bg-gray-200 px-4 py-2 rounded-full shadow-sm">
              <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white">
                <UserIcon />
              </div>
              <span className="text-sm font-semibold text-gray-800 select-none">
                username
              </span>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        {/* Balance */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Your Balance</h2>
          <p className="text-3xl font-bold text-green-600 mt-1">
            $0000
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Search Users
          </h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search by name, email..."
              className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition duration-200">
              Search
            </button>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        {/* Users List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Users</h2>
          card
        </div>
      </div>
    </div>
  );
}

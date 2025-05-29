import { useEffect, useState } from "react";
import { UserIcon } from "../assets/userIcon";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Send from "./send";


type DecodedToken = {
  id: string;
  username?: string;
};

type User = {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
};

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const[isModalOpen,setIsModalOpen] = useState(false);
  const[selectedUser,setSelectedUser] = useState<User | null>(null);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log(`No token found redirecting...`);
      navigate("/signin");
      return;
    }

    let decoded: DecodedToken;

    try {
      decoded = jwtDecode(token);
      console.log("Decoded token :", decoded);
      setUserId(decoded.id);
    } catch (error) {
      console.log(`Invalid token:`, error);
      navigate("/signin");
      return;
    }

    const fetchData = async () => {
      try {
        const balanceRes = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBalance(balanceRes.data.balance || 0);

        if (balanceRes.data.username) {
          setUsername(balanceRes.data.username);
        } else if (decoded.username) {
          setUsername(decoded.username);
        }

        const userRes = await axios.get(
          "http://localhost:3000/api/v1/user/bulk",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const allUsers: User[] = userRes.data.user || [];
        console.log("Fetched users:", allUsers);

        const otherUsers = allUsers.filter(
          (u) => u._id.toString() !== decoded.id.toString()
        );

        setUsers(otherUsers);
      } catch (error) {
        console.log("Error fetching data:", error);
        navigate("/signin");
      }
    };

    fetchData();
  }, [navigate]);

  const handleSendClick = (user:User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }
  const handleTransactionConfirm = async(amount:number) => {
    if(!selectedUser){
      return;
    }
    console.log(`Sending $${amount} to ${selectedUser.username}`)
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/v1/account/transfer",{
          to: selectedUser._id,
          amount,
        },{
          headers:{Authorization:`Bearer ${token}`},
        }
      );

      alert(`Successfully send $${amount} to ${selectedUser.username}`);
      setBalance((prev) => prev - amount);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Try again.")
    }
    setIsModalOpen(false);
  }

  return (
    <div className="flex bg-gray-100 min-h-screen p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Payment Dashboard
          </h1>
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full">
            <div className="flex items-center space-x-3 bg-gray-200 px-4 py-2 rounded-full shadow-sm">
              <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white">
                <UserIcon />
              </div>
              <span className="text-sm font-semibold text-gray-800 select-none">
                @{username || "loading..."}
              </span>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        {/* Balance */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Your Balance</h2>
          <p className="text-3xl font-bold text-green-600 mt-1">
            ${balance.toFixed(2)}
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
              placeholder="Search by name, username..."
              className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition duration-200">
              Search
            </button>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        {/* Users List */}
        <div className="flex gap-4 flex-wrap">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex flex-col justify-between h-36 w-52 p-4 border border-gray-300 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {user.firstname} {user.lastname}
                </h2>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>

              <button
                onClick={() => handleSendClick(user)}
                className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-xl transition-all duration-200"
              >
                Send
              </button>
            </div>
          ))}

          {users.length === 0 && (
            <p className="text-gray-500 text-sm">No other users found.</p>
          )}
        </div>
      </div>
      {selectedUser && (
        <Send
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleTransactionConfirm}
          userName={selectedUser.username}
        />
      )}
    </div>
  );
}

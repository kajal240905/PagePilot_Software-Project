import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/Auth-Bg.webp.jpg";

import NITLogo from "../assets/NIT.jpg"; // Adjust if your path differs

import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const studentPattern = /^(bt|mt|phd)\d{2}(cse|ece|eee|mech|civ)\d{3}@nituk\.ac\.in$/;
    const librarianPattern = /^librarian\d+@nituk\.ac\.in$/;
    return studentPattern.test(email.toLowerCase()) || librarianPattern.test(email.toLowerCase());
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("❌ Invalid email! Use your official college mail ID.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password
      });

      setSuccess("✅ Account created successfully! Redirecting to login...");
      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000); // 2 seconds delay
    } catch (err) {
      setError("❌ " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` 
  }}>
      <div className="relative w-[400px] h-[600px] bg-white border-2 border-black rounded-lg shadow-lg flex flex-col items-center p-5">
        <div className="absolute top-0 left-0 w-full bg-yellow-200 p-4 rounded-t-lg text-center">
         < img src={NITLogo} 
                  alt="NIT Logo" className="w-44 mx-auto" />
        </div>
        <h2 className="mt-20 text-lg font-semibold text-red-600 shadow-md p-2 text-center">Library User Registration Portal</h2>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
        <form onSubmit={handleSignup} className="w-full flex flex-col items-center mt-4">
          <div className="w-4/5 mb-3">
            <input
              type="text"
              className="w-full p-3 border border-gray-400 rounded-md"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="w-4/5 mb-3">
            <input
              type="email"
              className="w-full p-3 border border-gray-400 rounded-md"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-4/5 mb-6">
            <input
              type="password"
              className="w-full p-3 border border-gray-400 rounded-md"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="w-4/5 mb-4">
            <button type="submit" className="w-full py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition">
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-blue-500 font-semibold hover:underline">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;

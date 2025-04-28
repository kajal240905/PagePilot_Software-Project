
// import NITLogo from "../assets/NIT.jpg";
// import LoginBg from "../assets/LogIn-Bg.webp.jpg";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const validateEmail = (email) => {
//     const studentPattern = /^bt\d{2}(cse|ece|civ|mech|eee)\d{3}@nituk\.ac\.in$/;
//     const librarianPattern = /^librarian\d+@nituk\.ac\.in$/;
//     return studentPattern.test(email.toLowerCase()) || librarianPattern.test(email.toLowerCase());
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!validateEmail(email)) {
//       setError("❌ Invalid email format! Use student or librarian email.");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       const token = res.data.token;

//       // Store and update state using the passed-in onLogin callback
//       onLogin && onLogin(token, email);

//       // Redirect based on email type
//       if (email.toLowerCase().startsWith("librarian")) {
//         navigate("/admin-dashboard");
//       } else {
//         navigate("/student-dashboard");
//       }

//     } catch (err) {
//       setError("❌ Login failed. Check your credentials.");
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${LoginBg})` }}>
//       <div className="relative w-[400px] h-[480px] bg-white border-2 border-black rounded-lg shadow-lg flex flex-col items-center p-5">
//         <div className="absolute top-0 left-0 w-full bg-yellow-200 p-4 rounded-t-lg text-center">
//           <img src={NITLogo} alt="NIT Logo" className="w-44 mx-auto" />
//         </div>
//         <h2 className="mt-20 text-lg font-semibold text-red-600 shadow-md p-2 text-center">Library User Authentication Portal</h2>
//         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//         <form onSubmit={handleLogin} className="w-full flex flex-col items-center mt-4">
//           <div className="w-4/5 mb-4">
//             <input
//               type="email"
//               className="w-full p-3 border border-gray-400 rounded-md focus:ring focus:ring-blue-300 text-black bg-gray-50 hover:bg-blue-50"
//               placeholder="Username"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="w-4/5 mb-4">
//             <input
//               type="password"
//               className="w-full p-3 border border-gray-400 rounded-md focus:ring focus:ring-blue-300 text-black bg-gray-50 hover:bg-blue-50"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="w-4/5 mb-2">
//             <button type="submit" className="w-full py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition">
//               Login
//             </button>
//           </div>
//         </form>
//         <p className="text-sm text-gray-600 mt-3">
//           Don't have an account?{" "}
//           <button onClick={() => navigate("/signup")} className="text-blue-500 font-semibold hover:underline">
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import NITLogo from "../assets/NIT.jpg";
import LoginBg from "../assets/LogIn-Bg.webp.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const studentPattern = /^bt\d{2}(cse|ece|civ|mech|eee)\d{3}@nituk\.ac\.in$/;
    const librarianPattern = /^librarian\d+@nituk\.ac\.in$/;
    return studentPattern.test(email.toLowerCase()) || librarianPattern.test(email.toLowerCase());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("❌ Invalid email format! Use student or librarian email.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;

      // Store and update state using the passed-in onLogin callback
      onLogin && onLogin(token, email);

      // Redirect based on email type
      if (email.toLowerCase().startsWith("librarian")) {
        navigate("/admin-dashboard");
      } else {
        navigate("/student-dashboard");
      }

    } catch (err) {
      setError("❌ Login failed. Check your credentials.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${LoginBg})` }}>
      <div className="relative w-[400px] h-[480px] bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-lg flex flex-col items-center p-6 bg-opacity-80 backdrop-blur-md">
        <div className="absolute top-0 left-0 w-full bg-yellow-200 p-4 rounded-t-lg text-center">
          <img src={NITLogo} alt="NIT Logo" className="w-44 mx-auto" />
        </div>
        <h2 className="mt-20 text-lg font-semibold text-white shadow-md p-2 text-center">Library User Authentication Portal</h2>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <form onSubmit={handleLogin} className="w-full flex flex-col items-center mt-4">
          <div className="w-4/5 mb-4">
            <input
              type="email"
              className="w-full p-3 border-2 border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white placeholder-gray-700"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-4/5 mb-4">
            <input
              type="password"
              className="w-full p-3 border-2 border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white placeholder-gray-700"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="w-4/5 mb-2">
            <button type="submit" className="w-full py-3 rounded-md bg-green-800 text-white font-semibold hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105">
              Login
            </button>
          </div>
        </form>
        <p className="text-sm text-gray-600 mt-3">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="text-blue-500 font-semibold hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

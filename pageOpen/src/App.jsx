
// import React from 'react';
// import "./App.css";

// import { Routes, Route, Navigate } from "react-router-dom";

// import Signup from "./components/Signup";
// import StudentDashboard from './components/StudentDashboard'; 
// import Login from "./components/Login";
// import Home from "./pages/Home";
// import About from "./pages/About";  
// import Contact from "./pages/Contact";
// import Others from "./pages/Others";
// import AdminDashboard from "./components/AdminDashboard";
// import SearchBooks from "./components/SearchBooks";
// import StudentProfile from "./components/StudentProfile";


// function App() {
//   const isAuthenticated = !!localStorage.getItem("token");
//   const email = localStorage.getItem("email") || "";
//   const isAdmin = email.startsWith("librarian");

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="/others" element={<Others />} />
//       <Route path="/login" element={<Login onLogin={() => window.location.reload()} />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* Conditional Routing */}
//       {!isAuthenticated ? (
//         <>
//           <Route path="/student-dashboard/*" element={<Navigate to="/login" />} />
//           <Route path="/admin-dashboard/*" element={<Navigate to="/login" />} />
//         </>
//       ) : isAdmin ? (
//         <>
//           <Route path="/admin-dashboard/*" element={<AdminDashboard onLogout={handleLogout} />} />
//           <Route path="*" element={<Navigate to="/admin-dashboard" />} />
//         </>
//       ) : (
//         <>
//           <Route path="/student-dashboard/*" element={<StudentDashboard onLogout={handleLogout} />}>
//             <Route path="search-books" element={<SearchBooks />} />
//             <Route path="profile" element={<StudentProfile />} />
            
//             <Route path="*" element={<Navigate to="search-books" />} />
//           </Route>

//           <Route path="*" element={<Navigate to="/student-dashboard" />} />
//         </>
//       )}
//     </Routes>
//   );
// }

// export default App;


import React, { useState } from 'react';
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "./components/Signup";
import StudentDashboard from './components/StudentDashboard'; 
import Login from "./components/Login";
import Home from "./pages/Home";
import About from "./pages/About";  
import Contact from "./pages/Contact";
import Others from "./pages/Others";
import AdminDashboard from "./components/AdminDashboard";
import SearchBooks from "./components/SearchBooks";
import StudentProfile from "./components/StudentProfile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const isAdmin = email.startsWith("librarian");

  const handleLogin = (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setIsAuthenticated(true);
    setEmail(email);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setEmail("");
    window.location.href = "/login";
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/others" element={<Others />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup />} />

      {!isAuthenticated ? (
        <>
          <Route path="/student-dashboard/*" element={<Navigate to="/login" />} />
          <Route path="/admin-dashboard/*" element={<Navigate to="/login" />} />
        </>
      ) : isAdmin ? (
        <>
          <Route path="/admin-dashboard/*" element={<AdminDashboard onLogout={handleLogout} />} />
          {/* <Route path="*" element={<Navigate to="/admin-dashboard" />} /> */}
        </>
      ) : (
        <>
          <Route path="/student-dashboard/*" element={<StudentDashboard onLogout={handleLogout} />}>
            <Route path="search-books" element={<SearchBooks />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="*" element={<Navigate to="search-books" />} />
          </Route>
          <Route path="*" element={<Navigate to="/student-dashboard" />} />
        </>
      )}
    </Routes>
  );
}

export default App;

// // export default AdminDashboard;



// import { Routes, Route, Link } from 'react-router-dom';
// import React from "react";
// import AddBook from "./AddBook";
// import DeleteBook from "./DeleteBook";
// import UpdateBook from "./UpdateBook";
// import ViewUser from "./ViewUser";
// import SearchBooks from "./SearchBooks"; 

// import IssueBook from "./IssueBook";
// import ReturnBook from "./ReturnBook";

// const AdminDashboard = () => {
//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Remove token
//     window.location.href = '/login'; // Redirect to login page
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-green-400 via-lime-500 to-teal-600">
//       {/* Sidebar */}
//       <aside className="w-1/4 bg-gradient-to-b from-green-500 via-lime-600 to-teal-500 shadow-lg rounded-xl p-6 space-y-6 border-r-4 border-green-700">
//         <h2 className="text-3xl font-extrabold text-white tracking-wide">📚 Admin Panel</h2>
//         <ul className="space-y-4">
//           <li>
//             <Link to="/admin-dashboard/add-book" className="block px-6 py-3 bg-green-700 text-white font-medium rounded-lg shadow-md hover:bg-green-800 transition-all ease-in-out transform hover:scale-105">
//               ➕ Add Book
//             </Link>
//           </li>
//           <li>
//             <Link to="/admin-dashboard/delete-book" className="block px-6 py-3 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition-all ease-in-out transform hover:scale-105">
//               🗑️ Delete Book
//             </Link>
//           </li>
//           <li>
//             <Link to="/admin-dashboard/update-book" className="block px-6 py-3 bg-yellow-600 text-white font-medium rounded-lg shadow-md hover:bg-yellow-700 transition-all ease-in-out transform hover:scale-105">
//               ✏️ Update Book
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/admin-dashboard/search-books"
//               className="block px-6 py-3 bg-#cefad0 text-white font-medium rounded-lg shadow-md hover:bg-teal-700 transition-all ease-in-out transform hover:scale-105"
//             >
//               🔍 Search Books
//             </Link>
//           </li>
//           <li>
//             <Link to="/admin-dashboard/view-user" className="block px-6 py-3 bg-#99FF99 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all ease-in-out transform hover:scale-105">
//               👤 View User
//             </Link>
//           </li>
//           <li>
//             <Link to="/admin-dashboard/issue-book" className="block px-6 py-3 bg-#0A9548 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition-all ease-in-out transform hover:scale-105">
//               📤 Issue Book
//             </Link>
//           </li>
//           <li>
//             <Link to="/admin-dashboard/return-book" className="block px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 transition-all ease-in-out transform hover:scale-105">
//               📥 Return Book
//             </Link>
//           </li>
//         </ul>
//         <button onClick={handleLogout} className="btn px-6 py-3 w-full rounded-xl bg-orange-500 text-white mt-4 hover:bg-orange-600">Logout</button>
//       </aside>

//       {/* Main Content */}
//       <main className="w-3/4 p-8 overflow-y-auto bg-white shadow-xl rounded-xl ml-6">
//         <div className="space-y-8">
//           <h3 className="text-2xl font-semibold text-green-800">Admin Dashboard</h3>
//           <div className="bg-gray-50 p-6 rounded-xl shadow-md">
//             <Routes>
//               <Route path="add-book" element={<AddBook />} />
//               <Route path="delete-book" element={<DeleteBook />} />
//               <Route path="update-book" element={<UpdateBook />} />
//               <Route path="view-user" element={<ViewUser />} />
//               <Route path="issue-book" element={<IssueBook />} />
//               <Route path="return-book" element={<ReturnBook />} />
//               <Route path="search-books" element={<SearchBooks />} />
//             </Routes>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;


import { Routes, Route, Link } from 'react-router-dom';
import React from "react";
import AddBook from "./AddBook";
import DeleteBook from "./DeleteBook";
import UpdateBook from "./UpdateBook";
import ViewUser from "./ViewUser";
import SearchBooks from "./SearchBooks"; 
import IssueBook from "./IssueBook";
import ReturnBook from "./ReturnBook";

const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-green-400 via-lime-500 to-teal-600">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gradient-to-b from-green-500 via-lime-600 to-teal-500 shadow-lg rounded-xl p-6 space-y-6 border-r-4 border-green-700">
        <h2 className="text-3xl font-extrabold text-white tracking-wide">📚 Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/admin-dashboard/add-book" className="block px-6 py-3 bg-dark-green text-white font-medium rounded-lg shadow-md hover:bg-green-800 transition-all ease-in-out transform hover:scale-105">
              ➕ Add Book
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/delete-book" className="block px-6 py-3 bg-dark-green text-white font-medium rounded-lg shadow-md hover:bg-green-800 transition-all ease-in-out transform hover:scale-105">
              🗑️ Delete Book
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/update-book" className="block px-6 py-3 bg-dark-green text-white font-medium rounded-lg shadow-md hover:bg-green-800 transition-all ease-in-out transform hover:scale-105">
              ✏️ Update Book
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/search-books"
              className="block px-6 py-3 bg-dark-green text-white font-medium rounded-lg shadow-md hover:bg-green-800 transition-all ease-in-out transform hover:scale-105"
            >
              🔍 Search Books
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/view-user" className="block px-6 py-3 bg-dark-green text-white font-medium rounded-lg shadow-md hover:bg-green-800 transition-all ease-in-out transform hover:scale-105">
              👤 View User
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/issue-book" className="block px-6 py-3 bg-dark-green text-white font-medium rounded-lg shadow-md hover:bg-green-800 transition-all ease-in-out transform hover:scale-105">
              📤 Issue Book
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/return-book" className="block px-6 py-3 bg-dark-green text-white font-medium rounded-lg shadow-md hover:bg-green-800 transition-all ease-in-out transform hover:scale-105">
              📥 Return Book
            </Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="btn px-6 py-3 w-full rounded-xl bg-orange-500 text-white mt-4 hover:bg-orange-600">Logout</button>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-8 overflow-y-auto bg-white shadow-xl rounded-xl ml-6">
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold text-green-800">Admin Dashboard</h3>
          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <Routes>
              <Route path="add-book" element={<AddBook />} />
              <Route path="delete-book" element={<DeleteBook />} />
              <Route path="update-book" element={<UpdateBook />} />
              <Route path="view-user" element={<ViewUser />} />
              <Route path="issue-book" element={<IssueBook />} />
              <Route path="return-book" element={<ReturnBook />} />
              <Route path="search-books" element={<SearchBooks />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

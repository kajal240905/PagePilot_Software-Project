import { Link, Outlet } from "react-router-dom";



const StudentDashboard = ({ onLogout }) => {
  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-[#dbeafe] to-[#93c5fd] text-gray-900">
      
      {/* Sidebar */}
      <div className="w-1/5 bg-white/10 backdrop-blur-lg p-6 shadow-lg rounded-r-xl">
        <h2 className="text-3xl font-serif font-bold text-blue-900 mb-6 text-center">
          📚 Library System
        </h2>
        <nav className="space-y-4">
          <Link 
            to="/student-dashboard/search-books" 
            className="block p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            🔍 Search Books
          </Link>
          <Link 
            to="/student-dashboard/profile" 
            className="block p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            👤 Profile
          </Link>
          {/* <Link 
            to="/student-dashboard/dues" 
            className="block p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            💰 Check Dues
          </Link> */}
          <button
            onClick={onLogout}
            className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition"
          >
            🚪 Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-8 overflow-y-auto animate-fadeIn">
     <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboard;
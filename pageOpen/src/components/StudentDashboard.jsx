
import { Link, Outlet } from "react-router-dom";

const StudentDashboard = ({ onLogout }) => {
  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-[#00FF00] to-[#66FF66] text-gray-900">
      
      {/* Sidebar */}
      <div className="w-1/5 bg-white/10 backdrop-blur-lg p-6 shadow-lg rounded-r-xl">
        <h2 className="text-4xl font-serif font-extrabold text-[#1b5e20] mb-8 text-center">
          📚 Library System
        </h2>
        <nav className="space-y-6">
          <Link 
            to="/student-dashboard/search-books" 
            className="block p-4 bg-[#1b5e20] text-white rounded-xl hover:bg-[#388e3c] transition-all duration-300"
          >
            🔍 Search Books
          </Link>
          <Link 
            to="/student-dashboard/profile" 
            className="block p-4 bg-[#43a047] text-white rounded-xl hover:bg-[#66bb6a] transition-all duration-300"
          >
            👤 Profile
          </Link>
           {/* <Link 
            to="/student-dashboard/dues" 
            className="block p-4 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all duration-300"
          >
            💰 Check Dues
          </Link>  */}
          <button
            onClick={onLogout}
            className="w-full bg-[#d32f2f] text-white p-4 rounded-xl hover:bg-[#c62828] transition-all duration-300"
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

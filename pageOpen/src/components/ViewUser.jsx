


import { useState } from 'react';
import axios from 'axios';

const ViewUser = () => {
  const [rollNo, setRollNo] = useState('');
  const [studentName, setStudentName] = useState('');
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        'http://localhost:5000/admin/user',
        { rollNo, name: studentName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data.user);
    } catch (error) {
      alert('❌ Failed to fetch user');
      console.error(error);
    }
  };

  // Function to format the date to a readable string
  const formatDate = (date) => {
    const newDate = new Date(date);
    if (newDate.toString() === 'Invalid Date') return 'Invalid Date';
    return newDate.toLocaleDateString();
  };

  return (
    <div className="p-8 max-w-xl mx-auto mt-10 bg-white/20 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-[#1b5e20] mb-6 text-center">
        👤 View Student
      </h2>

      <input
        type="text"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
        placeholder="Roll Number"
        className="input mb-4 w-full p-3 border border-[#43a047] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66bb6a] transition duration-300"
      />
      <input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Student Name"
        className="input mb-6 w-full p-3 border border-[#43a047] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66bb6a] transition duration-300"
      />

      <button
        onClick={fetchProfile}
        disabled={!rollNo || !studentName}
        className="w-full bg-[#66bb6a] text-white px-6 py-3 rounded-lg hover:bg-[#43a047] transition-all duration-300 disabled:opacity-50"
      >
        🔍 View
      </button>

      {profile && (
        <div className="mt-6 bg-white/30 backdrop-blur-xl p-6 rounded-xl shadow-lg">
          <p className="text-lg"><strong>Name:</strong> {profile.name}</p>
          <p className="text-lg"><strong>Email:</strong> {profile.email}</p>
          <p className="text-lg"><strong>Roll No:</strong> {profile.rollNo}</p>

          <p className="mt-4 text-lg font-semibold">Borrowed Books:</p>
          <ul className="list-disc pl-6">
            {profile.borrowedBooks && profile.borrowedBooks.length > 0 ? (
              profile.borrowedBooks.map((entry, index) => (
                <li key={index} className="mb-4">
                  <strong>{entry.book.title}</strong> <br />
                  Borrow Date: {formatDate(entry.borrowDate)} <br />
                  Due Date: {formatDate(entry.dueDate)} <br />
                  Return Date: {entry.returnDate && entry.returnDate !== 'null' ? formatDate(entry.returnDate) : 'Not returned'} <br />
                  Fine: ₹{entry.fine}
                </li>
              ))
            ) : (
              <li>No borrowed books</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewUser;

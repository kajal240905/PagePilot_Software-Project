
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if book is overdue
  const checkOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/student/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setStudent(response.data.user);
        setIssuedBooks(response.data.user.borrowedBooks || []);
      } catch (err) {
        console.error('Error fetching student data:', err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) return <div className="text-center text-lg text-white">Loading...</div>;
  if (error) return <div className="text-center text-lg text-red-400">{error}</div>;
  if (!student) return <div className="text-center text-lg text-red-400">No student data found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-8">
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        👤 Student Profile
      </h2>

      {/* Student Info */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 mb-12">
        <p className="text-lg text-gray-700 mb-2">
          <strong>Name:</strong> {student.name}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Email:</strong> {student.email}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Roll Number:</strong> {student.rollNo || 'N/A'}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Department:</strong> {student.department || 'N/A'}
        </p>
      </div>

      {/* Issued Books */}
      <h3 className="text-3xl font-bold text-center text-white mb-8">
        📚 Issued Books
      </h3>

      {issuedBooks.length === 0 ? (
        <p className="text-center text-lg text-white">
          No books issued yet.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {issuedBooks.map((borrowed, index) => (
            <li
              key={index}
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-green-600 mb-3">
                {borrowed.book?.title || 'Unknown Title'}
              </h3>
              <p className="text-gray-600 mb-1">
                <strong>Genre:</strong> {borrowed.book?.genre || 'No Genre'}
              </p>
              <p className="text-gray-600 mb-1">
                📅 <strong>Issued on:</strong> {borrowed.borrowDate ? new Date(borrowed.borrowDate).toLocaleDateString() : 'N/A'}
              </p>
              <p className="text-gray-600 mb-1">
                📆 <strong>Due date:</strong> {borrowed.dueDate ? new Date(borrowed.dueDate).toLocaleDateString() : 'N/A'}
              </p>
              {checkOverdue(borrowed.dueDate) ? (
                <p className="text-red-500 font-semibold mt-2">
                  ⚠ Overdue! Fine: ₹{borrowed.fine || 0}
                </p>
              ) : (
                <p className="text-green-500 font-semibold mt-2">
                  ✅ On time
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentProfile;


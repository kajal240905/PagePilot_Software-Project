// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const StudentProfile = () => {
//   const [student, setStudent] = useState(null);
//   const [issuedBooks, setIssuedBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to check if a book is overdue
//   const checkOverdue = (dueDate) => {
//     const currentDate = new Date();
//     return new Date(dueDate) < currentDate;
//   };

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/student/profile', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         console.log(response.data); // Optional: for debugging

//         setStudent(response.data.user);
//         setIssuedBooks(response.data.user.borrowedBooks || []);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching data');
//         setLoading(false);
//         console.error('Error fetching student data:', err);
//       }
//     };

//     fetchStudentData();
//   }, []);

//   if (loading) {
//     return <div className="text-center text-lg text-blue-900">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-lg text-red-500">{error}</div>;
//   }

//   if (!student) {
//     return <div className="text-center text-lg text-red-500">No student data found.</div>;
//   }

//   return (
//     <div className="h-screen w-full bg-gradient-to-br from-[#dbeafe] to-[#93c5fd] p-8 animate-fadeIn">
//       <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6 text-center">👤 Student Profile</h2>

//       {/* Student Info */}
//       <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg text-gray-900">
//         <p className="text-lg"><strong>Name:</strong> {student.name}</p>
//         <p className="text-lg"><strong>Email:</strong> {student.email}</p>
//         <p className="text-lg"><strong>Roll Number:</strong> {student.rollNo || 'N/A'}</p> {/* Updated to rollNo */}
//         <p className="text-lg"><strong>Department:</strong> {student.department || 'N/A'}</p> {/* Updated to department */}
//       </div>

//       {/* Issued Books */}
//       <h3 className="text-3xl font-serif font-semibold text-blue-900 mt-8 mb-4 text-center">📚 Issued Books</h3>
//       {issuedBooks.length === 0 ? (
//         <p className="text-center text-gray-700 text-lg">No books issued yet.</p>
//       ) : (
//         <ul className="max-w-3xl mx-auto space-y-6">
//           {issuedBooks.map((borrowed, index) => (
//             <li
//               key={index}
//               className="bg-white/80 backdrop-blur-md p-5 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition"
//             >
//               <h3 className="text-xl font-serif font-semibold text-blue-800">
//                 {borrowed.book?.title || 'Unknown Title'}
//               </h3>
//               <p className="text-gray-600">
//                 {borrowed.book?.genre || 'No Genre'}
//               </p>
//               <p className="text-gray-500 text-sm">
//                 📅 Issued on: {borrowed.issueDate ? new Date(borrowed.issueDate).toLocaleDateString() : 'N/A'}
//               </p>
//               <p className="text-gray-500 text-sm">
//                 📆 Due date: {borrowed.dueDate ? new Date(borrowed.dueDate).toLocaleDateString() : 'N/A'}
//               </p>
//               {checkOverdue(borrowed.dueDate) ? (
//                 <p className="text-red-500 font-semibold">⚠ Overdue! Fine: ₹{borrowed.fine || 0}</p>
//               ) : (
//                 <p className="text-green-500 font-semibold">✅ On time</p>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default StudentProfile;
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

  if (loading) return <div className="text-center text-lg text-blue-900">Loading...</div>;
  if (error) return <div className="text-center text-lg text-red-500">{error}</div>;
  if (!student) return <div className="text-center text-lg text-red-500">No student data found.</div>;

  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-100 to-blue-300 p-8 animate-fadeIn">
      <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6 text-center">👤 Student Profile</h2>

      {/* Student Info */}
      <div className="max-w-3xl mx-auto bg-white/30 backdrop-blur-md p-6 rounded-lg shadow-md text-gray-800">
        <p className="text-lg"><strong>Name:</strong> {student.name}</p>
        <p className="text-lg"><strong>Email:</strong> {student.email}</p>
        <p className="text-lg"><strong>Roll Number:</strong> {student.rollNo || 'N/A'}</p>
        <p className="text-lg"><strong>Department:</strong> {student.department || 'N/A'}</p>
      </div>

      {/* Issued Books */}
      <h3 className="text-3xl font-serif font-semibold text-blue-900 mt-8 mb-4 text-center">📚 Issued Books</h3>
      {issuedBooks.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">No books issued yet.</p>
      ) : (
        <ul className="max-w-3xl mx-auto space-y-6">
          {issuedBooks.map((borrowed, index) => (
            <li
              key={index}
              className="bg-white/80 backdrop-blur-md p-5 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition"
            >
              <h3 className="text-xl font-serif font-semibold text-blue-800">
                {borrowed.book?.title || 'Unknown Title'}
              </h3>
              <p className="text-gray-600">
                Genre: {borrowed.book?.genre || 'No Genre'}
              </p>
              <p className="text-gray-500 text-sm">
                📅 Issued on: {borrowed.borrowDate ? new Date(borrowed.borrowDate).toLocaleDateString() : 'N/A'}
              </p>
              <p className="text-gray-500 text-sm">
                📆 Due date: {borrowed.dueDate ? new Date(borrowed.dueDate).toLocaleDateString() : 'N/A'}
              </p>
              {checkOverdue(borrowed.dueDate) ? (
                <p className="text-red-500 font-semibold">⚠ Overdue! Fine: ₹{borrowed.fine || 0}</p>
              ) : (
                <p className="text-green-500 font-semibold">✅ On time</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentProfile;


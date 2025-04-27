// import { useState } from 'react';
// import axios from 'axios';

// const ViewUser = () => {
//   const [rollNo, setRollNo] = useState('');
//   const [studentName, setStudentName] = useState('');
//   const [profile, setProfile] = useState(null);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');

//       const res = await axios.post(
//         'http://localhost:5000/admin/user',
//         { rollNo, name: studentName },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setProfile(res.data.user);
//     } catch (error) {
//       alert('❌ Failed to fetch user');
//       console.error(error);
//     }
//   };

//   // Function to format the date to a readable string
//   const formatDate = (date) => {
//     const newDate = new Date(date);
//     if (newDate.toString() === 'Invalid Date') return 'Invalid Date'; // Ensure we handle invalid date
//     return newDate.toLocaleDateString(); // Format as 'MM/DD/YYYY' by default
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto mt-10 bg-white/90 rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-4">👤 View Student</h2>

//       <input
//         type="text"
//         value={rollNo}
//         onChange={(e) => setRollNo(e.target.value)}
//         placeholder="Roll Number"
//         className="input mb-2 w-full px-4 py-2 border rounded"
//       />
//       <input
//         type="text"
//         value={studentName}
//         onChange={(e) => setStudentName(e.target.value)}
//         placeholder="Student Name"
//         className="input mb-4 w-full px-4 py-2 border rounded"
//       />

//       <button
//         onClick={fetchProfile}
//         disabled={!rollNo || !studentName}
//         className="btn bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
//       >
//         🔍 View
//       </button>

//       {profile && (
//         <div className="mt-4 bg-white p-4 rounded shadow">
//           <p><strong>Name:</strong> {profile.name}</p>
//           <p><strong>Email:</strong> {profile.email}</p>
//           <p><strong>Roll No:</strong> {profile.rollNo}</p>
//           <p><strong>Borrowed Books:</strong></p>
//           <ul className="list-disc pl-5">
//             {profile.borrowedBooks && profile.borrowedBooks.length > 0 ? (
//               profile.borrowedBooks.map((entry, index) => (
//                 <li key={index}>
//                   <strong>{entry.book.title}</strong> <br />
//                   Borrow Date: {formatDate(entry.borrowDate)} <br />
//                   Due Date: {formatDate(entry.dueDate)} <br />
//                   Return Date: {entry.returnDate ? formatDate(entry.returnDate) : 'Not returned'} <br />
//                   Fine: ₹{entry.fine}
//                 </li>
//               ))
//             ) : (
//               <li>None</li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewUser;
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
    <div className="p-6 max-w-xl mx-auto mt-10 bg-white/90 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">👤 View Student</h2>

      <input
        type="text"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
        placeholder="Roll Number"
        className="input mb-2 w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Student Name"
        className="input mb-4 w-full px-4 py-2 border rounded"
      />

      <button
        onClick={fetchProfile}
        disabled={!rollNo || !studentName}
        className="btn bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        🔍 View
      </button>

      {profile && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Roll No:</strong> {profile.rollNo}</p>
          <p><strong>Borrowed Books:</strong></p>
          <ul className="list-disc pl-5">
            {profile.borrowedBooks && profile.borrowedBooks.length > 0 ? (
              profile.borrowedBooks.map((entry, index) => (
                <li key={index} className="mb-2">
                  <strong>{entry.book.title}</strong> <br />
                  Borrow Date: {formatDate(entry.borrowDate)} <br />
                  Due Date: {formatDate(entry.dueDate)} <br />
                  Return Date: {entry.returnDate && entry.returnDate !== 'null' ? formatDate(entry.returnDate) : 'Not returned'} <br />
                  Fine: ₹{entry.fine}
                </li>
              ))
            ) : (
              <li>None</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewUser;



// import { useState } from 'react';
// import axios from 'axios';

// const IssueBook = () => {
//   const [details, setDetails] = useState({ rollNo: '', isbn: '' });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const token = localStorage.getItem('token');

//   const handleIssue = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/admin/issue',
//         {
//           studentRollNo: details.rollNo,
//           isbn: details.isbn
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  
//       setMessage(response.data.message || '✅ Book issued');
//     } catch (error) {
//       console.error("❌ Error:", error);
//       setMessage(error.response?.data?.message || '❌ Error issuing book');
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="p-6 max-w-md mx-auto mt-10 bg-white/90 rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-4">📥 Issue Book</h2>

//       <input
//         name="rollNo"
//         placeholder="Student Roll Number"
//         onChange={(e) => setDetails({ ...details, rollNo: e.target.value })}
//         className="input mb-2 w-full px-3 py-2 border rounded"
//         value={details.rollNo}
//       />
//       <input
//         name="isbn"
//         placeholder="Book ISBN"
//         onChange={(e) => setDetails({ ...details, isbn: e.target.value })}
//         className="input mb-4 w-full px-3 py-2 border rounded"
//         value={details.isbn}
//       />

//       <button
//         onClick={handleIssue}
//         className="btn bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
//         disabled={loading || !details.rollNo || !details.isbn}
//       >
//         {loading ? 'Issuing...' : '📤 Issue'}
//       </button>

//       {message && <p className="mt-4 text-red-500">{message}</p>}
//     </div>
//   );
// };

// export default IssueBook;





import { useState } from 'react';
import axios from 'axios';

const IssueBook = () => {
  const [details, setDetails] = useState({ rollNo: '', isbn: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleIssue = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/admin/issue',
        {
          studentRollNo: details.rollNo,
          isbn: details.isbn
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setMessage(response.data.message || '✅ Book issued');
    } catch (error) {
      console.error("❌ Error:", error);
      setMessage(error.response?.data?.message || '❌ Error issuing book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto mt-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl shadow-lg shadow-green-500/50">
      <h2 className="text-3xl font-semibold text-white mb-6 text-center">📥 Issue Book</h2>

      <div className="mb-6">
        <label htmlFor="rollNo" className="block text-white text-lg mb-2">Student Roll Number</label>
        <input
          id="rollNo"
          name="rollNo"
          placeholder="Enter Student Roll Number"
          onChange={(e) => setDetails({ ...details, rollNo: e.target.value })}
          className="w-full p-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
          value={details.rollNo}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="isbn" className="block text-white text-lg mb-2">Book ISBN</label>
        <input
          id="isbn"
          name="isbn"
          placeholder="Enter Book ISBN"
          onChange={(e) => setDetails({ ...details, isbn: e.target.value })}
          className="w-full p-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
          value={details.isbn}
        />
      </div>

      <button
        onClick={handleIssue}
        className="w-full py-3 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
        disabled={loading || !details.rollNo || !details.isbn}
      >
        {loading ? 'Issuing...' : '📤 Issue Book'}
      </button>

      {message && (
        <p className={`mt-4 text-lg ${message.includes('❌') ? 'text-red-500' : 'text-green-300'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default IssueBook;


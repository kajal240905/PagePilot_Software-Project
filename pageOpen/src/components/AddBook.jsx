




// import { useState } from 'react';
// import axios from 'axios';

// const AddBook = () => {
//   const [book, setBook] = useState({
//     title: '',
//     author: '',
//     genre: '',
//     totalCopies: ''
//   });
//   const [isbnInput, setIsbnInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const total = parseInt(book.totalCopies);
//     const isbnArray = isbnInput.split(',').map(s => s.trim()).filter(Boolean);

//     if (isNaN(total) || total <= 0) {
//       alert('❌ Total copies must be a positive number');
//       return;
//     }

//     if (isbnArray.length !== total) {
//       alert(`❌ Please enter exactly ${total} ISBNs, separated by commas.`);
//       return;
//     }

//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('❌ No token found. Please log in.');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         'http://localhost:5000/admin/add',
//         {
//           ...book,
//           totalCopies: total,
//           isbn: isbnArray
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       console.log('✅ Response:', response.data);
//       alert('✅ Book added successfully!');

//       // Reset form
//       setBook({ title: '', author: '', genre: '', totalCopies: '' });
//       setIsbnInput('');
//     } catch (error) {
//       console.error('❌ Axios Error:', error);
//       if (error.response?.status === 401) {
//         alert('❌ Unauthorized. Please log in again.');
//       } else {
//         alert('❌ Error adding book. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg max-w-xl mx-auto mt-10 transition-all duration-300">
//       <h2 className="text-3xl font-serif font-bold text-blue-800 mb-8 text-center">📚 Add New Book</h2>

//       <input
//         name="title"
//         placeholder="Book Title"
//         onChange={handleChange}
//         value={book.title}
//         className="p-3 mb-4 w-full rounded-lg shadow-sm border focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />
//       <input
//         name="author"
//         placeholder="Author"
//         onChange={handleChange}
//         value={book.author}
//         className="p-3 mb-4 w-full rounded-lg shadow-sm border focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />
//       <input
//         name="genre"
//         placeholder="Genre"
//         onChange={handleChange}
//         value={book.genre}
//         className="p-3 mb-4 w-full rounded-lg shadow-sm border focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />
//       <input
//         name="totalCopies"
//         type="number"
//         placeholder="Total Copies"
//         onChange={handleChange}
//         value={book.totalCopies}
//         className="p-3 mb-4 w-full rounded-lg shadow-sm border focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />
//       <textarea
//         placeholder="Enter ISBNs separated by commas"
//         value={isbnInput}
//         onChange={(e) => setIsbnInput(e.target.value)}
//         className="p-3 mb-6 w-full rounded-lg shadow-sm border focus:outline-none focus:ring-2 focus:ring-blue-400"
//         rows={3}
//       />
//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-blue-300 transition duration-300 ease-in-out"
//       >
//         {loading ? '⏳ Adding...' : '➕ Add Book'}
//       </button>
//     </form>
//   );
// };

// export default AddBook;

import { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    totalCopies: ''
  });
  const [isbnInput, setIsbnInput] = useState('');

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    console.log('Submitting form...'); // Debug log

    const total = parseInt(book.totalCopies);
    const isbnArray = isbnInput.split(',').map(s => s.trim()).filter(Boolean);

    if (isbnArray.length !== total) {
      alert(`❌ Enter exactly ${total} ISBNs separated by commas`);
      return;
    }

    const token = localStorage.getItem('token'); // Get token from localStorage
    if (!token) {
      alert('❌ No token found. Please log in first.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/admin/add',
        {
          ...book,
          totalCopies: total,
          isbn: isbnArray
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Set token in Authorization header
          }
        }
      );
      console.log('✅ Response:', response.data);
      alert('✅ Book added successfully');
      setBook({ title: '', author: '', genre: '', totalCopies: '' });
      setIsbnInput('');
    } catch (error) {
      console.error('Axios error:', error);
      if (error.response && error.response.status === 401) {
        alert('❌ Unauthorized: Please log in again');
        // Optionally, you can redirect to login here
      } else {
        alert('❌ Error adding book');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white/80 backdrop-blur-md rounded-lg shadow-lg max-w-xl mx-auto mt-10 transition-all duration-300">
      <h2 className="text-2xl font-serif font-semibold text-green-900 mb-6 text-center">📚 Add Book</h2>
      
      <input
        name="title"
        placeholder="Book Title"
        onChange={handleChange}
        value={book.title}
        className="p-3 mb-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <input
        name="author"
        placeholder="Author"
        onChange={handleChange}
        value={book.author}
        className="p-3 mb-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <input
        name="genre"
        placeholder="Genre"
        onChange={handleChange}
        value={book.genre}
        className="p-3 mb-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <input
        name="totalCopies"
        type="number"
        placeholder="Total Copies"
        onChange={handleChange}
        value={book.totalCopies}
        className="p-3 mb-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <textarea
        placeholder="Enter ISBNs (comma separated)"
        value={isbnInput}
        onChange={(e) => setIsbnInput(e.target.value)}
        className="p-3 mb-6 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        rows={3}
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 ease-in-out"
      >
        ➕ Add Book
      </button>
    </form>
  );
};

export default AddBook;

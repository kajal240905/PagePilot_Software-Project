

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const SearchBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
//   const [userRole, setUserRole] = useState(''); // Will be either 'student' or 'admin'

//   // Debounce logic
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm.trim());
//     }, 500); // 500ms delay

//     return () => clearTimeout(timer); // Cleanup on re-typing
//   }, [searchTerm]);

//   // Check if user is logged in and their role (student or admin)
//   useEffect(() => {
//     const role = localStorage.getItem('role'); // Assuming role is stored in localStorage
//     setUserRole(role);
//   }, []);

//   // Fetch books when debounced term changes
//   useEffect(() => {
//     const fetchBooks = async (query = '') => {
//       try {
//         const url = query
//           ? userRole === 'admin'
//             ? `http://localhost:5000/admin/search?query=${encodeURIComponent(query)}`
//             : `http://localhost:5000/student/search?query=${encodeURIComponent(query)}`
//           : userRole === 'admin'
//           ? `http://localhost:5000/admin/search`
//           : `http://localhost:5000/student/search`;

//         const token = localStorage.getItem('token');

//         const response = await axios.get(url, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Cache-Control': 'no-cache',
//           },
//         });

//         setBooks(response.data.books || []);
//       } catch (error) {
//         console.error('Error fetching books:', error);
//         setBooks([]);
//       }
//     };

//     fetchBooks(debouncedSearchTerm);
//   }, [debouncedSearchTerm, userRole]);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200 p-8">
//       <h2 className="text-4xl font-bold text-center text-indigo-800 mb-12">
//         📚 Search Books
//       </h2>

//       <div className="flex justify-center items-center mb-8 space-x-4">
//         <input
//           type="text"
//           placeholder="Search by title, author, genre..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border-2 border-indigo-300 px-6 py-3 rounded-xl text-gray-700 w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
//         />
//       </div>

//       <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {books.length === 0 ? (
//           <li className="col-span-full text-center text-lg text-gray-600">
//             No books found. Try a different search!
//           </li>
//         ) : (
//           books.map((book) => (
//             <li
//               key={book._id}
//               className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
//             >
//               <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
//                 {book.title}
//               </h3>
//               <p className="text-gray-600">
//                 <strong>Author:</strong> {book.author}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Genre:</strong> {book.genre}
//               </p>
//               <p className="text-gray-600">
//                 <strong>ISBN:</strong> {book.isbn?.join(', ')}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Total Copies:</strong> {book.totalCopies}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Available:</strong> {book.availableCopies}
//               </p>
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default SearchBooks;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [userRole, setUserRole] = useState(''); // Will be either 'student' or 'admin'

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 500); // 500ms delay

    return () => clearTimeout(timer); // Cleanup on re-typing
  }, [searchTerm]);

  // Check if user is logged in and their role (student or admin)
  useEffect(() => {
    const role = localStorage.getItem('role'); // Assuming role is stored in localStorage
    setUserRole(role);
  }, []);

  // Fetch books when debounced term changes
  useEffect(() => {
    const fetchBooks = async (query = '') => {
      try {
        const url = query
          ? userRole === 'admin'
            ? `http://localhost:5000/admin/search?query=${encodeURIComponent(query)}`
            : `http://localhost:5000/student/search?query=${encodeURIComponent(query)}`
          : userRole === 'admin'
          ? `http://localhost:5000/admin/search`
          : `http://localhost:5000/student/search`;

        const token = localStorage.getItem('token');

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
          },
        });

        setBooks(response.data.books || []);
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
      }
    };

    fetchBooks(debouncedSearchTerm);
  }, [debouncedSearchTerm, userRole]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-8">
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        📚 Search Books
      </h2>

      <div className="flex justify-center items-center mb-8 space-x-4">
        <input
          type="text"
          placeholder="Search by title, author, genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-green-300 px-6 py-3 rounded-xl text-gray-800 w-80 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
        />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.length === 0 ? (
          <li className="col-span-full text-center text-lg text-gray-600">
            No books found. Try a different search!
          </li>
        ) : (
          books.map((book) => (
            <li
              key={book._id}
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-green-600 mb-3">
                {book.title}
              </h3>
              <p className="text-gray-600">
                <strong>Author:</strong> {book.author}
              </p>
              <p className="text-gray-600">
                <strong>Genre:</strong> {book.genre}
              </p>
              <p className="text-gray-600">
                <strong>ISBN:</strong> {book.isbn?.join(', ')}
              </p>
              <p className="text-gray-600">
                <strong>Total Copies:</strong> {book.totalCopies}
              </p>
              <p className="text-gray-600">
                <strong>Available:</strong> {book.availableCopies}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchBooks;

// import { useState } from 'react';
// import axios from 'axios';

// const DeleteBook = () => {
//   const [isbn, setIsbn] = useState('');
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const token = localStorage.getItem('token'); // Replace if you store token elsewhere

//   const handleDelete = async () => {
//     if (!isbn || !title || !author) {
//       alert("❗Please fill in all fields: ISBN, Title, and Author");
//       return;
//     }

//     try {
//       const response = await axios.delete(`http://localhost:5000/admin/delete/${isbn}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         data: {
//           title,
//           author,
//         },
//       });

//       alert(`✅ ${response.data.message}`);
//       setIsbn('');
//       setTitle('');
//       setAuthor('');
//     } catch (error) {
//       alert('❌ Failed to delete book');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto mt-10 bg-white/90 rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-4">🗑 Delete Book</h2>

//       <input
//         type="text"
//         value={isbn}
//         onChange={(e) => setIsbn(e.target.value)}
//         placeholder="ISBN"
//         className="input mb-2 w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Title"
//         className="input mb-2 w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         value={author}
//         onChange={(e) => setAuthor(e.target.value)}
//         placeholder="Author"
//         className="input mb-4 w-full p-2 border rounded"
//       />
//       <button
//         onClick={handleDelete}
//         className="btn bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//       >
//         ❌ Delete
//       </button>
//     </div>
//   );
// };

// export default DeleteBook;

import { useState } from 'react';
import axios from 'axios';

const DeleteBook = () => {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const token = localStorage.getItem('token'); // Replace if you store token elsewhere

  const handleDelete = async () => {
    if (!isbn || !title || !author) {
      alert("❗Please fill in all fields: ISBN, Title, and Author");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/admin/delete/${isbn}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          title,
          author,
        },
      });

      alert(`✅ ${response.data.message}`);
      setIsbn('');
      setTitle('');
      setAuthor('');
    } catch (error) {
      alert('❌ Failed to delete book');
      console.error(error);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto mt-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl shadow-lg shadow-green-500/50">
      <h2 className="text-3xl font-semibold text-white mb-6 text-center">🗑️ Delete Book</h2>

      <div className="mb-6">
        <label htmlFor="isbn" className="block text-white text-lg mb-2">ISBN</label>
        <input
          id="isbn"
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="Enter ISBN"
          className="w-full p-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="title" className="block text-white text-lg mb-2">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
          className="w-full p-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="author" className="block text-white text-lg mb-2">Author</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter Author"
          className="w-full p-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
        />
      </div>

      <button
        onClick={handleDelete}
        className="w-full py-3 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
      >
        ❌ Delete Book
      </button>
    </div>
  );
};

export default DeleteBook;


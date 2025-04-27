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
    <form onSubmit={handleSubmit} className="p-6 bg-white/90 rounded-lg shadow-md max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">📚 Add Book</h2>
      <input name="title" placeholder="Title" onChange={handleChange} value={book.title} className="input" />
      <input name="author" placeholder="Author" onChange={handleChange} value={book.author} className="input" />
      <input name="genre" placeholder="Genre" onChange={handleChange} value={book.genre} className="input" />
      <input name="totalCopies" type="number" placeholder="Total Copies" onChange={handleChange} value={book.totalCopies} className="input" />
      <textarea
        placeholder="Enter ISBNs (comma separated)"
        value={isbnInput}
        onChange={(e) => setIsbnInput(e.target.value)}
        className="input"
        rows={3}
      />
      <button type="submit" className="btn mt-4">➕ Add Book</button>
    </form>
  );
};

export default AddBook;

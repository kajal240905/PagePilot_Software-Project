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
    <div className="p-6 max-w-md mx-auto mt-10 bg-white/90 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">🗑 Delete Book</h2>

      <input
        type="text"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        placeholder="ISBN"
        className="input mb-2 w-full p-2 border rounded"
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="input mb-2 w-full p-2 border rounded"
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        className="input mb-4 w-full p-2 border rounded"
      />
      <button
        onClick={handleDelete}
        className="btn bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        ❌ Delete
      </button>
    </div>
  );
};

export default DeleteBook;

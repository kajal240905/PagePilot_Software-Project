import { useState } from 'react';
import axios from 'axios';

const UpdateBook = () => {
  const [form, setForm] = useState({
    isbn: '',
    title: '',
    author: '',
    genre: ''
  });

  const token = localStorage.getItem('token'); // Get JWT from local storage

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const { isbn, title, author, genre } = form;

    if (!isbn || !title || !author || !genre) {
      alert("❗ Please fill in all fields");
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:5000/admin/update', // Update route
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      alert(`✅ ${response.data.message || 'Book updated successfully'}`);
      setForm({ isbn: '', title: '', author: '', genre: '' }); // Reset form after update
    } catch (error) {
      alert('❌ Update failed');
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-10 bg-white/90 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">🔄 Update Book</h2>
      <input
        name="isbn"
        value={form.isbn}
        onChange={handleChange}
        placeholder="ISBN"
        className="input mb-2 w-full p-2 border rounded"
      />
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="New Title"
        className="input mb-2 w-full p-2 border rounded"
      />
      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="New Author"
        className="input mb-2 w-full p-2 border rounded"
      />
      <input
        name="genre"
        value={form.genre}
        onChange={handleChange}
        placeholder="New Genre"
        className="input mb-4 w-full p-2 border rounded"
      />
      <button
        onClick={handleUpdate}
        className="btn bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        🔁 Update
      </button>
    </div>
  );
};

export default UpdateBook;
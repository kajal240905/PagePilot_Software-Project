import React, { useState } from 'react';
import axios from 'axios';

const ReturnBook = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [isbn, setIsbn] = useState('');
  const [message, setMessage] = useState('');
  const [fine, setFine] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setFine(null);
    setLoading(true); // Start loading

    try {
      // Send request to return the book
      const response = await axios.post(
        'http://localhost:5000/admin/return', // Updated endpoint path
        {
          rollNo: rollNumber, // Updated field to match your backend model
          isbn,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
        }
      );

      console.log('Response from backend:', response.data);

      if (response.data.message) {
        setMessage(response.data.message); // Set success or error message
      }
      if (response.data.fine !== undefined) {
        setFine(response.data.fine); // Set fine if exists
      }
    } catch (error) {
      console.error('Error response:', error.response);
      const errMsg = error.response?.data?.message || 'Error returning book';
      setMessage(errMsg); // Display error message
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Return Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Enter Student Roll Number"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="Enter Book ISBN"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading} // Disable button during loading
        >
          {loading ? 'Processing...' : 'Return Book'}
        </button>
      </form>
      {message && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <p className="text-gray-800">{message}</p>
          {fine !== null && <p className="text-red-600">Fine: ₹{fine}</p>}
        </div>
      )}
    </div>
  );
};

export default ReturnBook;

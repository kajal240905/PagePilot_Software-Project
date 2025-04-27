
const User = require('../models/User');
const Book = require('../models/Book');
const Transaction = require('../models/Transaction');
const moment = require('moment');
const sendEmail = require('../utils/sendEmail'); // Import the sendEmail utility

// Add a new book
const addBook = async (req, res) => {
  const { title, author, genre, isbn, totalCopies } = req.body;

  try {
    const copiesToAdd = parseInt(totalCopies);

    // Check: isbn must be an array and must match totalCopies
    if (!Array.isArray(isbn) || isbn.length !== copiesToAdd) {
      return res.status(400).json({
        message: 'ISBN array must be provided and match the totalCopies count',
      });
    }

    let existingBook = await Book.findOne({ title, author, genre });

    if (existingBook) {
      // Check for duplicate ISBNs
      const duplicateISBNs = isbn.filter(code => existingBook.isbn.includes(code));
      if (duplicateISBNs.length > 0) {
        return res.status(400).json({
          message: 'Some ISBNs already exist in the system',
          duplicateISBNs,
        });
      }

      // Update copies and append new ISBNs
      existingBook.totalCopies += copiesToAdd;
      existingBook.availableCopies += copiesToAdd;
      existingBook.isbn = [...existingBook.isbn, ...isbn];

      await existingBook.save();
      return res.status(200).json({
        message: 'Book updated successfully',
        book: existingBook,
      });
    } else {
      const newBook = new Book({
        title,
        author,
        genre,
        totalCopies: copiesToAdd,
        availableCopies: copiesToAdd,
        isbn,
      });

      await newBook.save();
      return res.status(201).json({
        message: 'Book added successfully',
        book: newBook,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  const { isbn } = req.params;
  const { title, author } = req.body;

  try {
    const book = await Book.findOne({ title, author, isbn: { $in: [isbn] } });

    if (!book) {
      return res.status(404).json({ message: 'Book not found with provided title, author, and ISBN' });
    }

    // Remove the matching ISBN from the array
    book.isbn = book.isbn.filter(code => code !== isbn);
    book.availableCopies -= 1;
    book.totalCopies -= 1;

    if (book.totalCopies <= 0) {
      await book.deleteOne();
      return res.status(200).json({ message: 'Book completely deleted' });
    } else {
      await book.save();
      return res.status(200).json({
        message: 'One copy removed by ISBN',
        remainingCopies: book.availableCopies,
        book
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
};

// Update a book
const updateBook = async (req, res) => {
  const { isbn, title, author, genre } = req.body;

  try {
    const book = await Book.findOneAndUpdate(
      { isbn: isbn }, // match where isbn array contains this value
      { title, author, genre },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found with the provided ISBN' });
    }

    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Error updating book', error });
  }
};

// View all books
const viewBooks = async (req, res) => {
  try {
    const books = await Book.find();  // Find all books in the database
    res.status(200).json({ books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// const viewUserProfile = async (req, res) => {
//   const { rollNo, name } = req.body;
//   console.log('Searching for:', rollNo, name);

//   try {
//     // Find the user by rollNo and name and populate borrowedBooks with book details
//     const user = await User.findOne({ rollNo, name })
//       .populate('borrowedBooks.book');  // Populate the 'book' field with book details

//     if (!user) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     // Convert date fields to ISO string for consistent formatting
//     user.borrowedBooks = user.borrowedBooks.map(entry => {
//       entry.borrowDate = entry.borrowDate ? entry.borrowDate.toISOString() : null;
//       entry.dueDate = entry.dueDate ? entry.dueDate.toISOString() : null;
//       entry.returnDate = entry.returnDate ? entry.returnDate.toISOString() : null;
//       return entry;
//     });

//     res.status(200).json({ user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };


//   const { rollNo, isbn } = req.body;

//   try {
//     const user = await User.findOne({ rollNo });
//     const book = await Book.findOne({ isbn: { $in: [isbn] } });

//     if (!user || !book) {
//       return res.status(404).json({ message: 'User or book not found' });
//     }

//     if (book.availableCopies <= 0 || !book.isbn.includes(isbn)) {
//       return res.status(400).json({ message: 'Book not available or ISBN not found' });
//     }

//     // Prevent duplicate borrow
//     if (user.borrowedBooks.some(b => b.book.toString() === book._id.toString())) {
//       return res.status(400).json({ message: 'You already borrowed this book' });
//     }

//     // Remove the assigned ISBN from book
//     book.isbn = book.isbn.filter(code => code !== isbn);

//     const borrowDate = moment();
//     const dueDate = moment(borrowDate).add(14, 'days');

//     const transaction = new Transaction({
//       book: book._id,
//       user: user._id,
//       borrowDate: borrowDate.toDate(),
//       dueDate: dueDate.toDate()
//     });

//     await transaction.save();

//     user.borrowedBooks.push({ book: book._id, isbn });
//     book.availableCopies -= 1;

//     await user.save();
//     await book.save();

//     const emailMessage = `
//   <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
//     <p>Hello <strong>${user.name}</strong>,</p>

//     <p>
//       This is a reminder that you have borrowed the book titled 
//       <strong>${book.title}</strong>.
//     </p>

//     <p>
//       Please return it by 
//       <strong>${dueDate.format('MMMM Do, YYYY')}</strong> 
//       to avoid any fines.
//     </p>

//     <p>Regards,<br>Library Team</p>
//   </div>
// `;


//     await sendEmail(user.email, 'Book Issued - Return Within 14 Days', emailMessage);

//     res.status(201).json({ message: 'Book issued successfully', transaction, assignedIsbn: isbn });
//   } catch (error) {
//     res.status(500).json({ message: 'Error issuing book', error });
//   }
// };
const viewUserProfile = async (req, res) => {
  const { rollNo, name } = req.body;
  console.log('Searching for:', rollNo, name);

  try {
    // Find the user by rollNo and name and populate borrowedBooks with book details
    const user = await User.findOne({ rollNo, name })
      .populate('borrowedBooks.book');  // Populate the 'book' field with book details

    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Convert date fields to ISO string for consistent formatting and add extra information
    user.borrowedBooks = user.borrowedBooks.map(entry => {
      return {
        ...entry.toObject(),  // Convert Mongoose subdocument to plain JS object
        borrowDate: entry.borrowDate ? entry.borrowDate.toISOString() : null,
        dueDate: entry.dueDate ? entry.dueDate.toISOString() : null,
        returnDate: entry.returnDate ? entry.returnDate.toISOString() : null,
        isReturned: entry.returnDate ? true : false,  // extra field: isReturned
      };
    });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};




 const issueBook = async (req, res) => {
  const { studentRollNo, isbn } = req.body;

  // Check if studentRollNo or isbn is missing
  if (!studentRollNo || !isbn) {
    return res.status(400).json({ message: 'Student Roll Number and ISBN are required' });
  }

  console.log('Received data:', req.body);  // Debugging line to check the incoming data

  try {
    // 1. Check if the student exists
    const student = await User.findOne({ rollNo: studentRollNo });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // 2. Check if the student has any overdue books with unpaid fines
    const overdueBooks = await Transaction.find({
      studentRollNo,
      returnDate: null, // Book hasn't been returned
      dueDate: { $lt: new Date() }, // Due date is in the past
    });

    // Calculate total fine
    let totalFine = 0;
    for (let transaction of overdueBooks) {
      const daysOverdue = Math.ceil((new Date() - new Date(transaction.dueDate)) / (1000 * 3600 * 24)); // Calculate overdue days
      totalFine += daysOverdue * 10; // Fine of ₹10 per day
    }

    // If total fine is greater than 0, block book issuance
    if (totalFine > 0) {
      return res.status(400).json({ message: `Student has an outstanding fine of ₹${totalFine}. Cannot issue new book.` });
    }

    // 3. Check if the book exists and is available
    const book = await Book.findOne({ isbn });
    if (!book || book.availableCopies <= 0) {
      return res.status(404).json({ message: 'Book not available' });
    }

    // Prevent duplicate borrow (check if the student already borrowed this book)
    if (student.borrowedBooks.some(b => b.book.toString() === book._id.toString())) {
      return res.status(400).json({ message: 'You already borrowed this book' });
    }

    // Deduct a copy from availableCopies in the book
    book.availableCopies -= 1;
    await book.save();

    // 4. Create a new transaction to record the book issuance
    const borrowDate = new Date(); // Current date for borrowDate
    const dueDate = new Date(borrowDate); // Copy borrowDate for dueDate
    dueDate.setDate(borrowDate.getDate() + 14); // Adds 14 days for dueDate

    const transaction = new Transaction({
      studentRollNo,  // Pass studentRollNo here
      isbn,           // Pass isbn here
      borrowDate: borrowDate, // Use the current date for borrowDate
      dueDate: dueDate,       // Set dueDate as 14 days after borrowDate
    });

    await transaction.save();

    // Add book to student's borrowedBooks array
    student.borrowedBooks.push({
      book: book._id,
      isbn,
      borrowDate,
      dueDate,
    });
    await student.save();

   
    const emailMessage = `
  Hello ${student.name},

  We are pleased to inform you that you have successfully borrowed the book titled "${book.title}".

  Please ensure that you return the book by ${dueDate.toLocaleDateString()} to avoid any fines.

  If you have any questions or need further assistance, feel free to reach out to us.

  Regards,
  Library Team

  ----------------------------------------
  For any support, contact us at:
  support@library.com
`;

    // Send the email
    await sendEmail(student.email, 'Book Issued - Return Within 14 Days', emailMessage);

    // Respond with success
    res.status(200).json({ message: 'Book issued successfully', transaction, assignedIsbn: isbn });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error issuing book', error });
  }
 };


 
//  const returnBook = async (req, res) => {
//    try {
//      const { rollNo, isbn } = req.body;
 
//      // Validate input
//      if (!rollNo || !isbn) {
//        return res.status(400).json({ message: 'RollNo and ISBN are required' });
//      }
 
//      // Find the transaction with the given rollNo and isbn that hasn't been returned
//      const transaction = await Transaction.findOne({ 
//        studentRollNo: rollNo,
//        isbn: isbn,
//        returnDate: null  // Ensures the book has not been returned already
//      });
 
//      // If no such transaction exists, return an error
//      if (!transaction) {
//        return res.status(404).json({ message: 'Transaction not found or book already returned' });
//      }
 
//      // Set the returnDate to the current date
//      transaction.returnDate = new Date();
 
//      // Calculate the fine if the book is overdue
//      const currentDate = new Date();
//      const dueDate = new Date(transaction.dueDate);
//      let fine = 0;
 
//      // Only calculate fine if the book is overdue
//      if (currentDate > dueDate) {
//        const overdueDays = Math.ceil((currentDate - dueDate) / (1000 * 60 * 60 * 24)); // Get overdue days
//        fine = overdueDays * 5; // Example fine rate of 5 per day
//      }
 
//      // Update fine if overdue
//      transaction.fine = fine;
 
//      // Save the updated transaction
//      await transaction.save();
 
//      // Update the availableCopies of the book
//      const book = await Book.findOne({ isbn });
//      if (book) {
//        book.availableCopies += 1; // Increment availableCopies since the book is returned
//        await book.save();
//      }
 
//      // Send the response
//      res.status(200).json({
//        message: 'Book returned successfully',
//        transaction
//      });
 
//    } catch (error) {
//      console.error(error);
//      res.status(500).json({ message: 'Error returning book', error });
//    }
//  };
const returnBook = async (req, res) => {
  try {
    const { rollNo, isbn } = req.body;

    // Validate input
    if (!rollNo || !isbn) {
      return res.status(400).json({ message: 'RollNo and ISBN are required' });
    }

    // Find the transaction with the given rollNo and isbn that hasn't been returned
    const transaction = await Transaction.findOne({ 
      studentRollNo: rollNo,
      isbn: isbn,
      returnDate: null  // Ensures the book has not been returned already
    });

    // If no such transaction exists, return an error
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found or book already returned' });
    }

    // Set the returnDate to the current date
    transaction.returnDate = new Date();

    // Calculate the fine if the book is overdue
    const currentDate = new Date();
    const dueDate = new Date(transaction.dueDate);
    let fine = 0;

    if (currentDate > dueDate) {
      const overdueDays = Math.ceil((currentDate - dueDate) / (1000 * 60 * 60 * 24)); 
      fine = overdueDays * 5; // fine rate of 5 per day
    }

    // Update fine
    transaction.fine = fine;

    // Save the updated transaction
    await transaction.save();

 // ➡️ Correct Part: Update the User's borrowedBooks returnDate
const user = await User.findOne({ rollNo });
if (user) {
  const borrowedBook = user.borrowedBooks.find(entry => entry.book.isbn === isbn && entry.returnDate === null);
  if (borrowedBook) {
    borrowedBook.returnDate = new Date();  // Same as transaction return date
    await user.save();  // Save the user document
  }
}


    // Update the availableCopies of the book
    const book = await Book.findOne({ isbn });
    if (book) {
      book.availableCopies += 1; // Increment availableCopies since the book is returned
      await book.save();
    }

    // Send the response
    res.status(200).json({
      message: 'Book returned successfully',
      transaction
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error returning book', error });
  }
};






const searchBooks = async (req, res) => {
  const { title, author, genre } = req.query;

  // Build the query based on provided search parameters
  let searchCriteria = {};

  if (title) searchCriteria.title = { $regex: title, $options: 'i' }; // Case-insensitive search
  if (author) searchCriteria.author = { $regex: author, $options: 'i' };
  if (genre) searchCriteria.genre = { $regex: genre, $options: 'i' };

  try {
    const books = await Book.find(searchCriteria); // Find books matching search criteria
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found matching the criteria' });
    }

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: 'Error searching for books', error });
  }
};

module.exports = {
  addBook,
  deleteBook,
  updateBook,
  viewBooks,
  viewUserProfile,
  issueBook,
  returnBook,
  searchBooks
};


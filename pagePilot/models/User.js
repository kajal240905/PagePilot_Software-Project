// // const mongoose = require('mongoose');
// // const bcrypt = require('bcryptjs');

// // const userSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   role: { type: String, enum: ['admin', 'student'], default: 'student' },
// //   borrowedBooks: [
// //     {
// //       book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
// //       isbn: String
// //     }
// //   ]
// // });

// // // ✅ Single Hashing using pre-save
// // userSchema.pre('save', async function (next) {
// //   if (!this.isModified('password')) return next();
// //   this.password = await bcrypt.hash(this.password, 10);
// //   next();
// // });

// // // ✅ Password comparison
// // userSchema.methods.matchPassword = async function (password) {
// //   return await bcrypt.compare(password, this.password);
// // };

// // module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   name: { 
//     type: String, 
//     required: true 
//   },
//   email: { 
//     type: String, 
//     required: true, 
//     unique: true 
//   },
//   password: { 
//     type: String, 
//     required: true 
//   },
//   role: { 
//     type: String, 
//     enum: ['admin', 'student'], 
//     default: 'student' 
//   },
//   rollNo: { 
//     type: String,  // Roll number for students
//     required: function() { 
//       return this.role === 'student';  // Only required for students
//     }
//   },
//   department: { 
//     type: String,  // Department for students
//     required: function() { 
//       return this.role === 'student';  // Only required for students
//     }
//   },
//   borrowedBooks: [
//     {
//       book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
//       isbn: String,
//       borrowDate: { type: Date },
//       dueDate: { type: Date },
//       returnDate: { type: Date },
//       fine: { type: Number, default: 0 }
//     }
//   ]
// });

// // ✅ Single Hashing using pre-save
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // ✅ Password comparison
// userSchema.methods.matchPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student'], default: 'student' },
  rollNo: { 
    type: String,
    required: function() { return this.role === 'student'; }
  },
  department: { 
    type: String,
    required: function() { return this.role === 'student'; }
  },
  borrowedBooks: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      isbn: String,
      borrowDate: { type: Date },
      dueDate: { type: Date
      },
      returnDate: { type: Date },
      fine: { type: Number, default: 0 }
    }
  ]
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);



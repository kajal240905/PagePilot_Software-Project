

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Email validation regex
const studentEmailRegex = /^(bt|mt|phd)\d{2}(cse|ece|eee|mec|civ)\d{3}@nituk\.ac\.in$/;
const adminEmailRegex = /^librarian\d+@nituk\.ac\.in$/;

// Function to extract department from roll number
const getDepartmentFromRollNo = (rollNo) => {
  // Extract department code from index 4 to 7
  const departmentCode = rollNo.substring(4, 7).toLowerCase();  // Starting from index 4
  

  const departmentMap = {
    'civ': 'Civil Engineering',
    'cse': 'Computer Science Engineering',
    'ece': 'Electronics Engineering',
    'mec': 'Mechanical Engineering',
    'eee': 'Electrical and Electronics Engineering'
  };

  return departmentMap[departmentCode] || 'unknown';
};


// Function to extract roll number from email
const getRollNoFromEmail = (email) => {
  const rollNoPattern = /^([a-zA-Z0-9]+)@nituk.ac.in$/;  // Adjust based on your format
  const match = email.match(rollNoPattern);

  if (match) {
    return match[1].toUpperCase();  // Return the roll number in uppercase
  }
  return null;  // Return null if email doesn't match the expected pattern
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  let role;
  console.log("Email:", email);

  if (studentEmailRegex.test(email)) {
    role = 'student';
    
  } else if (adminEmailRegex.test(email)) {
    role = 'admin';
    
  } else {
    return res.status(400).json({
      message: 'Use your official college email (e.g., bt23cse005@nituk.ac.in or librarian100@nituk.ac.in)'
    });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let rollNo = '';
    let department = '';
    if (role === 'student') {
      rollNo = getRollNoFromEmail(email);
    
      department = getDepartmentFromRollNo(rollNo);
    
    }

    const user = new User({ 
      name, 
      email, 
      password, 
      role, 
      rollNo,  // Store roll number
      department  // Store department
    });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
    console.log(`${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!studentEmailRegex.test(email) && !adminEmailRegex.test(email)) {
    return res.status(400).json({
      message: 'Use your official college email (e.g., bt23cse005@nituk.ac.in or librarian100@nituk.ac.in)'
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
    console.log('Login successful');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser
};

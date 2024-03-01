const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/user');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists with the given email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
     return res.status(400).json({ message: 'User already exists with this email' });
    }
    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored password

    if (user.password === password) {
      // Passwords match, user is successfully logged in
      return res.status(200).json({ message: 'User logged in successfully', user });
    } else {
      // Passwords do not match, invalid credentials
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



app.listen(4000, () => {
  console.log('app is running on port 5000');
});
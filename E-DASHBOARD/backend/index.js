const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // For sending emails
const otpGenerator = require('otp-generator'); // For generating OTPs

require('./db/config');
const User = require('./db/user');
const Product = require('./db/products');

const app = express();
const jwtKey = 'Ecomm'
app.use(cors());
app.use(express.json());



// Implement the forgot password API
// app.post('/send-email', async (req, res) => {
//     // Send the OTP to the user's email
//     const transporter = nodemailer.createTransport({
//       host: 'gmail',
//       port:587,
//       auth: {
//         user: 'bhojrajchavan5@gmail', // Your email
//         pass: 'kptq ksxa baxh lofn' // Your email password
//       }
//     });

//     const mailOptions = {
//       from: ' "Bhojraj Chavan " <bhojrajchavan5@gmail.com', // Your email username
//       to: 'bhojrajchavan5@gmail.com',
//       subject: 'Password Reset OTP',
//       text: `Your OTP for password reset is: `
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         return res.status(500).json({ message: 'Failed to send OTP via email' });
//       }
//       console.log('Email sent: ' + info.response);
//       res.status(200).json({ message: 'OTP sent successfully' });
//     });
//   } );

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    const token = jwt.sign(
      { user: newUser },
      jwtKey,
      { expiresIn: '1h' }
    );
    res.status(201).json({ message: 'User registered successfully', user: newUser, token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (user.password === password) {
      const token = jwt.sign(
        { userId: user._id },
        jwtKey,
        { expiresIn: '1h' }
      );
      return res.status(200).json(
        {
          message: 'User logged in successfully',
          token,
          user: { _id: user._id, name: user.name, email: user.email }
        });
    }
    else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/add-product',verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.status(201).json({ message: 'Product added successfully', product: result });
})

app.get('/products', async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const searchQuery = search ? { name: { $regex: search, $options: 'i' } } : {};
    const totalCount = await Product.countDocuments(searchQuery);
    const products = await Product.find(searchQuery)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const totalPages = Math.ceil(totalCount / limit);
    res.status(200).json({ products, totalPages, currentPage: page, limit, totalCount });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.delete('/delete/:id', async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Product deleted successfully', product: result });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/update/:id', async (req, res) => {

  try {
    const result = await Product.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json({ message: "Product updated successfully", product: result });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

app.get("/getProfile/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

function verifyToken(req, res, next) {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: 'Please provide a token with the header' });
  }

  token = token.split(' ')[1]; 

  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ success: false, message: 'Invalid token' });
    }
    req.user = decoded;

    next(); 
  });
}


app.listen(4000, () => {
  console.log('app is running on port 4000');
});
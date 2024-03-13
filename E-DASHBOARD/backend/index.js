const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('./db/config');
const User = require('./db/user');
const Product = require('./db/products');
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

    if (user.password === password) {
      // Passwords match, generate JWT token
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' }); // Change 'your-secret-key' to a secure key
      // Send the token along with user data
      return res.status(200).json({ message: 'User logged in successfully', token, user: { _id: user._id, name: user.name, email: user.email } });
    } else {
      // Passwords do not match, invalid credentials
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/add-product', async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.status(201).json({ message: 'Product added successfully', product: result });
})
// app.get('/products', async (req, res) => {

//   try {
//     const products = await Product.find();
//     res.status(200).json({ products });
//   } catch (error) {
//     console.error('Error getting products:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// })
app.get('/products', async (req, res) => {
  try {
    // Extract query parameters for search and pagination
    const { search, page = 1, limit = 10 } = req.query;

    // Construct the search query
    const searchQuery = search ? { name: { $regex: search, $options: 'i' } } : {};

    // Count total number of products matching the search query
    const totalCount = await Product.countDocuments(searchQuery);

    // Retrieve paginated list of products based on search query
    const products = await Product.find(searchQuery)
                                  .limit(limit * 1)
                                  .skip((page - 1) * limit)
                                  .exec();

    // Calculate total pages based on total count and limit per page
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({ products, totalPages, currentPage: page });
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
app.get('/search/:key', async (req, res) => {
  const data = await Product.find(
    {
      "$or": [
        { 
          "name": { 
              $regex: req.params.key,
              $options: 'i' 
           } 
        }
      ]
    });
  res.send(data);
})



app.listen(4000, () => {
  console.log('app is running on port 5000');
});
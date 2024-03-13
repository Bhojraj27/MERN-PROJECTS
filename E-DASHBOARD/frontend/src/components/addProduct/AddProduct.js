import React from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ApiConfig from '../../ApiConfig';
import Axios from 'axios'; // Fixed Axios import
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  button: {
    backgroundColor: "gold !important",
  }
}));

function AddProduct() {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [company, setCompany] = React.useState('');
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
console.log(userId);
  const handleFormSubmit = async (e) => {
    try {
      const res = await Axios.post(ApiConfig.addProducts, {
        name: name,
        price: price,
        category: category,
        company: company,
        userId: userId
      });

      if (res.status === 201) { // Check for correct status code
        toast.success("Product added successfully");
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    }
  }

  return (
    <>
      <h1>Add Product</h1>
      
      <Container maxWidth="xs">
        <Box className={classes.textBox}>
          <TextField
            label="Product Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth />
          <TextField
            label="Price"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth />
          <TextField
            label="Category"
            variant="outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth />
          <TextField
            label="Company"
            variant="outlined"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            fullWidth />
          <Button variant="contained" onClick={handleFormSubmit} className={classes.button} fullWidth>
            Add
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default AddProduct;

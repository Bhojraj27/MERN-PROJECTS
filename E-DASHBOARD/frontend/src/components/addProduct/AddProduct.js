import React, { useState } from 'react';
import { Box, Button, Paper, Container, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ApiConfig from '../../ApiConfig';
import Axios from 'axios'; // Fixed Axios import
import { toast } from 'react-toastify';
import ButtonCircularProgress from '../ButtonCircularProgress';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  button: {
    backgroundColor: "gold !important",
  },
  loginmainBox: {
    height: "100%",
    position: "relative",
    zIndex: "999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "auto",
  },
  loginBox: {
    height: "initial",
    margin: "15px auto",
    maxWidth: "95%",
    width: "487px",
    maxHeight: "100%",
    "& .mainBox": {
      padding: "40px 30px",
      "& h2": {
        textAlign: "center",
        paddingBottom: "25px",
      },
    },
    "& .displaySpacebetween": {
      padding: "15px 0px",
    },
  },
}));

function AddProduct() {
  const classes = useStyles();
  const navigate=useNavigate();
  const [isLoading, setIsLoading]=useState(false);
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [company, setCompany] = React.useState('');
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;

  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    try {
      const res = await Axios.post(ApiConfig.addProducts,
        {
        name: name,
        price: price,
        category: category,
        company: company,
        userId: userId
      },{ headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${JSON.parse( localStorage.getItem("token"))}`
        
      },});

      if (res.status === 201) { 
        setIsLoading(true);
        navigate("/")
        toast.success("Product added successfully");
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
      setIsLoading(false);
    }
  }

  return (
    <>
      <Box className={classes.loginmainBox}>
        <Box className={classes.loginBox}>
          <Paper className="mainBox" elevation={2}>
            <Box mt={3} mb={3}>
              <Typography align='center' variant="h3" color="primary">
                Add Products
              </Typography>
            </Box>
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
                <Button  variant="contained"
                    color="primary" onClick={handleFormSubmit}  fullWidth>
                  Add {isLoading && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Container>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default AddProduct;

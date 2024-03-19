import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Container, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ApiConfig from '../../ApiConfig';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

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

function UpdateProduct() {
  const classes = useStyles();
  const location = useLocation();
  const [data] = useState(location.state ? location?.state?.data?.data : null); // Access state object
  const [name, setName] = useState(data?.name || '');
  const [price, setPrice] = useState(data?.price || '');
  const [category, setCategory] = useState(data?.category || '');
  const [company, setCompany] = useState(data?.company || '');
  const [userId] = useState(location?.state?.data?.data?.userId);
  console.log(data)
  const handleFormSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await Axios.put(`${ApiConfig.update}/${data?._id}`, {
        name: name,
        price: price,
        category: category,
        userId: userId,
        company: company
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.status === 200) { // Check for correct status code
        toast.success("Product updated successfully");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  }

  return (
    <>
      <Box className={classes.loginmainBox}>
        <Box className={classes.loginBox}>
          <Paper className="mainBox" elevation={2}>
            <Box mt={3} mb={3}>
              <Typography align='center' variant="h3" color="primary">
                Update Products
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
                <Button variant="contained" onClick={handleFormSubmit} className={classes.button} fullWidth>
                  Update
                </Button>
              </Box>
            </Container>
          </Paper>
        </Box>
      </Box>
    </>
  );
}


export default UpdateProduct;

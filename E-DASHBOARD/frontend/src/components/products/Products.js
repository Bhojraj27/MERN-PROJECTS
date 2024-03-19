import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ApiConfig from '../../ApiConfig';
import DialogBoxCommon from '../DialogBoxCommon';
import { makeStyles, ThemeProvider } from '@mui/styles';
import { Delete, Edit, Search } from '@mui/icons-material';
import { Box, Button, Container, CssBaseline, FormControl, MenuItem, Pagination, Select } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, Paper, TableContainer, TableHead, IconButton, TableRow, TableCell, TableBody, Typography, TextField, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  delete: {
    color: "red !important",
  },
  edit: {
    color: "blue !important",
  },
  SearchField: {
    height: "50px",
    width: "300px",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #000",
  },
  TextBox: {
    "& .MuiOutlinedInput-root": {
      height: "40px !important",

    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "skyblue",

    },
  },
  mainfilter: {
    "& .displayEnd": {
      marginTop: "30px",
    },
    "& .filterpaper": {
      padding: "30px",
    },
  },
}));

function Products() {
  const classes = useStyles();
  const history = useNavigate();
  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({ id: '', data: {} });
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [actionType, setActionType] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const userListHandler = async () => {
    try {
      const res = await Axios({
        method: 'GET',
        url: ApiConfig.products,
        params: {
          search: search,
          page: currentPage,
           lmit: limit,
        }
      });
      if (res.status === 200) {
        setData(res.data.products);
        setTotalPages(res.data.totalPages);
      } else {
        toast.warn('Something is wrong ');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userListHandler();
  }, [search, currentPage,limit]);


  const deleteProduct = async (id) => {
    console.warn(id)
    try {
      const res = await Axios.delete(ApiConfig.delete + `/${id}`);
      if (res.status === 200) {
        userListHandler();
        toast.success('Product deleted successfully');
      } else {
        // Handle error
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editProduct = async (id) => {
    try {
      const res = await Axios.put(ApiConfig.editProduct + `/${id}`);
      if (res.status === 200) {
        userListHandler();
        toast.success('Product updated successfully');
      } else {
        // Handle error
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDialogOpen = (id, type) => {
    setDialogOpen(true);
    setActionType(type);
    const selectedProduct = data.find(product => product._id === id);
    setDialogData({ id: id, data: selectedProduct });
  };


  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    userListHandler();
  };

  const handleClear = () => {
    setSearch('');
  };

  const handleAction = () => {
    if (actionType === 'edit') {
      // Implement edit action here
      editProduct(dialogData.id);
    } else if (actionType === 'delete') {
      // Implement delete action here
      deleteProduct(dialogData.id);

    }
    setDialogOpen(false);
  };


  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
    userListHandler(value);
  };
  
  return (
    <Container maxWidth="xlg"><Box mt={3} mb={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography mb={4} variant="h4" color="primary">
            Products Management
          </Typography>
        </Grid>
        {total < 10 ? (<Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" className={classes.forminputRows}>
            <label style={{ color: "white", margin: "0px" }}>Rows:</label>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={limit}
              onChange={(e) => { setLimit(e.target.value); setPage(1); }}
              label="Age"
              className={`${classes.date} limitTextField`}
              inputProps={{
                classes: {
                  icon: classes.icon,
                },
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={200}>200</MenuItem>
            </Select>
          </FormControl>
        </Grid>) : " "}
      </Grid>
      <Paper elevation={2} sx={{ padding: 4 }}>
        <Box className={classes.mainfilter}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={12} sm={6} md={3}>
              <Typography color="primary">Search</Typography>
              <TextField className={classes.TextBox}
                variant="outlined"
                placeholder="Search by name"
                onChange={handleSearchChange}
                value={search}
                inputProps={{
                  maxLength: 30,
                  endAdornment: (
                    <IconButton onClick={handleSearchSubmit}>
                      <Search />
                    </IconButton>
                  ),
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Button sx={{ height: "40px" }} variant="contained" onClick={handleClear} fullWidth>Clear</Button>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Button sx={{ height: "40px" }} variant="contained" onClick={() => history("/add")} fullWidth>Add Product</Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
      <TableContainer mt={10} maxWidth="md" component={Paper} mb={10}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S. No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {data.length > 0 ? (
    data.map((item, index) => (
      <TableRow key={index}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>$ {item.price}</TableCell>
        <TableCell>{item.category}</TableCell>
        <TableCell>{item.company}</TableCell>
        <TableCell>
          <IconButton className={classes.edit} onClick={() => handleDialogOpen(item._id, 'edit')}><Edit /></IconButton>
          <IconButton className={classes.delete} onClick={() => handleDialogOpen(item._id, 'delete')}><Delete /></IconButton>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={6}>
        <Typography variant='h6' color="primary">No data Found</Typography>
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
      </TableContainer>
      <DialogBoxCommon
        open={dialogOpen}
        handleClose={handleDialogClose}
        handleAction={handleAction}
        actionType={actionType}
        data={dialogData}
      />
    <Pagination
  count={totalPages}
  page={currentPage}
  onChange={handlePaginationChange}
  color="primary"
  sx={{ justifyContent: 'center', mt: 3 }}
/>
</Container>



  );
}


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Products />
    </ThemeProvider>
  );
}
export default App;
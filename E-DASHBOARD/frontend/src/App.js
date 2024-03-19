import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';
import Profile from './components/profile/Profile';
import UpdateProduct from './components/updateProduct/UpdateProduct';
import AddProduct from './components/addProduct/AddProduct';

import Footer from './components/footer/Footer';
import SignUp from './components/signup/SignUp';
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from './PrivateComponent';
import Login from './components/login/Login';

// Import ThemeProvider and createTheme
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from './theme/index.js'; // Adjust the path as needed
import { Container } from '@mui/material';

function App() {
  // Create a theme instance
  // const theme = createTheme();

  return (
    <div className="App">
 

      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <div className="content">
          {/* Wrap your Routes with ThemeProvider and pass the theme */}
            <Routes>
              <Route element={<PrivateComponent />} >
                <Route path="/" element={<Products />} />
                <Route path="/add" element={<AddProduct />} />
                <Route path="/update" element={<UpdateProduct />} />
                {/* <Route path="/logout" element={<Logout/>} /> */}
                <Route path="/profile" element={<Profile/>} />
              </Route>
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/login" element={<Login/>} />
            </Routes>
        </div>
        <Footer />
      </BrowserRouter>
   

    </div>
  );
}

export default App;

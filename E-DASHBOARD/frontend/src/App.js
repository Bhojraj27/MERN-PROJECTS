
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';
import Profile from './components/profile/Profile';
import UpdateProduct from './components/updateProduct/UpdateProduct';
import AddProduct from './components/addProduct/AddProduct';
import Logout from './components/Logout';
import Footer from './components/footer/Footer';
import SignUp from './components/signup/SignUp';
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from './PrivateComponent';
import Login from './components/login/Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
      <Navbar/>
        <Routes>
          <Route  element={<PrivateComponent />} >
          <Route path="/" element={<Products />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update" element={<UpdateProduct />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile/>} />
          </Route>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;

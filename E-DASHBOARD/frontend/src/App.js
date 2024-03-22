import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Products from './pages/products/Products';
import Profile from './pages/profile/Profile';
import UpdateProduct from './pages/products/UpdateProduct';
import AddProduct from './pages/products/AddProduct';
import Footer from './components/footer/Footer';
import SignUp from './pages/Auth/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from './PrivateComponent';
import Login from './pages/Auth/Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <div className="content">
          <Routes>
            <Route element={<PrivateComponent />} >
              <Route path="/" element={<Products />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/update" element={<UpdateProduct />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>


    </div>
  );
}

export default App;

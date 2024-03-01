import React, { useEffect, useState } from 'react';
import './login.css'; // Corrected import statement
import Axios from 'axios';
import ApiConfig from '../../ApiConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

const navigate = useNavigate();

useEffect(()=>{
const auth= localStorage.getItem('email');
if(auth){
    navigate("/");
}
})
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await Axios({
                method: "POST",
                url: ApiConfig.login,
                responseType: 'json',
                data: {
                   email:email,
                   password:password
                },
            });

            if (res.status === 200) {
                toast.success(res.data.message);
               navigate("/");
               localStorage.setItem("email",JSON.stringify(email));
            }
            else if (res.status === 400) {
                toast.error(res.data.message); // Display error message from backend
            }
            // console.log(res);
            else {
                toast.error(res.data.message)
            }

        } catch (error) {
            // toast.error(error.message); // Display error message from backend

        }
    };

    return (
        <div className='signup'>
            <h1>Login</h1>
            <form onSubmit={(values) => {
                handleFormSubmit(values);
            }}
            >
                
                <input
                    className='inputField'
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"

                    placeholder="Enter Email"
                />
                <input
                    className='inputField'
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"

                    placeholder="Enter Password"
                />

                <input className='button' type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Login;

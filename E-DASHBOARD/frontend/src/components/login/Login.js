import React, { useEffect, useState } from 'react';
import './login.css'; // Corrected import statement
import Axios from 'axios';
import ApiConfig from '../../ApiConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, makeStyles } from '@mui/material';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
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
                    email: email,
                    password: password
                },
            });

            if (res.status === 200) {
                toast.success(res.data.message);
                navigate("/");
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("token", res.data.token);
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

                <Box className='box'>

                    <TextField
                        variant='outlined'
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                    />
                    <TextField
                        variant='outlined'
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter Password"
                    />
                    <Button variant='contained' type="submit" value="Submit" >Submit</Button>

                </Box>


            </form>
        </div>
    );
};

export default Login;

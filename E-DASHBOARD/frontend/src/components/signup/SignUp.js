import React, { useState } from 'react';
import './signup.css'; // Corrected import statement
import Axios from 'axios';
import ApiConfig from '../../ApiConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, makeStyles } from '@mui/material';


const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await Axios({
                method: "POST",
                url: ApiConfig.register,
                data: {
                    name: name,
                    email: email,
                    password: password,

                },
            });

            if (res.status === 201) {
                toast.success("user created successfully");
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate("/login");
            }
            else {
                toast.error("Something went wrong ")
            }

        } catch (error) {
            if (error.response.status === 400) {
                // console.log(res.response.data.message);
                toast.error(error.response.data.message); // Display error message from backend
            }
        }
    };

    return (
        <div className='signup'>
            <h1>Register</h1>
            <form onSubmit={(values) => {
                handleFormSubmit(values);
            }}
            >
                <Box className='box'>
                <TextField
                    variant='outlined'
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                />
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

export default SignUp;

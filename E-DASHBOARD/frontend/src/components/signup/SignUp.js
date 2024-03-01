import React, { useState } from 'react';
import './signup.css'; // Corrected import statement
import Axios from 'axios';
import ApiConfig from '../../ApiConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

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
                responseType: 'json',
                data: {
                    name: name,
                    email: email,
                    password: password,

                },
            });

            if (res.status === 201) {
                toast.success("user created successfully");
                localStorage.setItem('email', JSON.stringify(email));
                navigate("/login");
            }
            else if (res.status === 400) {
                toast.error(res.message); // Display error message from backend
            }
            // console.log(res);
            else {
                toast.error("Something went wrong ")
            }

        } catch (error) {
           console.log(error)

        }
    };

    return (
        <div className='signup'>
            <h1>Register</h1>
            <form onSubmit={(values) => {
                handleFormSubmit(values);
            }}
            >
                <input
                    className='inputField'
                    onChange={(e) => setName(e.target.value)}
                    type="text"

                    placeholder="Enter Name"
                />
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

export default SignUp;

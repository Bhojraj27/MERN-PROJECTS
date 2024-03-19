import React, { useState } from 'react';
import './signup.css'; // Corrected import statement
import Axios from 'axios';
import ApiConfig from '../../ApiConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, FormHelperText, InputAdornment, IconButton, Checkbox, Paper } from '@mui/material';
import { Form, Formik } from 'formik';
import { makeStyles } from '@mui/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ButtonCircularProgress from '../ButtonCircularProgress';
import * as yup from "yup";

const useStyles = makeStyles(() => ({
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
            padding: "50px 40px",
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

const SignUp = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formInitialSchema = {
        name: "",
        email: "",
        password: "",
    };

    const formValidationSchema = yup.object().shape({
        name: yup
            .string()
            .required("Name is required"),
        email: yup
            .string()
            .email("Please enter a valid email.")
            .max(256, "Email should not exceed 256 characters.")
            .required("Email is required"),

        password: yup
            .string()
            .trim()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Please enter a valid password with at least one uppercase letter, one lowercase letter, one number, and one special character."
            )
            .max(16, "Password should not exceed 16 characters.")
            .min(8, "Password must be a minimum of 8 characters.")
            .required("Password is required"),
    });
    const handleFormSubmit = async (values) => {
        try {
            const res = await Axios({
                method: "POST",
                url: ApiConfig.register,
                data: {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                },
                
            });
            if (res.status === 201) {
                toast.success("user created successfully");
                localStorage.setItem('user', JSON.stringify(res.data));
                localStorage.setItem("token", res.data.token);
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
        <Box className={classes.loginmainBox}>
            <Box className={classes.loginBox}>
                <Paper className="mainBox" elevation={2}>
                    <Typography variant="h2" color="primary">
                        Signup
                    </Typography>
                    <Formik
                        initialValues={formInitialSchema}
                        validationSchema={formValidationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            touched,
                            values,
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <Box>
                                    <Box mt={2} mb={1}>
                                        <Typography variant="body2" color="primary">
                                            Name
                                        </Typography>
                                    </Box>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Please enter your name"
                                        name="name"
                                        value={values.name}
                                        error={Boolean(touched.name && errors.name)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    <FormHelperText error>
                                        {touched.name && errors.name}
                                    </FormHelperText>
                                </Box>
                                <Box>
                                    <Box mt={2} mb={1}>
                                        <Typography variant="body2" color="primary">
                                            Email
                                        </Typography>
                                    </Box>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Please enter email address"
                                        name="email"
                                        value={values.email}
                                        error={Boolean(touched.email && errors.email)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    <FormHelperText error>
                                        {touched.email && errors.email}
                                    </FormHelperText>
                                </Box>
                                <Box>
                                    <Box mt={2} mb={1}>
                                        <Typography variant="body2" color="primary">Password</Typography>
                                    </Box>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Please enter password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={values.password}
                                        error={Boolean(touched.password && errors.password)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <FormHelperText error>
                                        {touched.password && errors.password}
                                    </FormHelperText>
                                </Box>
                                <Box p={1}>
                                <Link to="/login" >Already have account</Link>
                                </Box>
                                <Box mt={1}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        disabled={isLoading}
                                    >
                                        SignUp {isLoading && <ButtonCircularProgress />}
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Box>
        </Box>
    );
};

export default SignUp;

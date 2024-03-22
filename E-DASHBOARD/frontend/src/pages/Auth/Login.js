import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ApiConfig from '../../ApiConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, FormHelperText, InputAdornment, IconButton, Checkbox } from '@mui/material';
import { Form, Formik } from 'formik';
import { makeStyles } from '@mui/styles';
import * as yup from "yup";
import ButtonCircularProgress from '../../components/ButtonCircularProgress';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

const Login = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formInitialSchema = {
    email: "",
    password: "",
  };

  const formValidationSchema = yup.object().shape({
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

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleFormSubmit = async (values) => {
    
    try {
      setIsLoading(true);
      const res = await Axios.post(ApiConfig.login, {
        email: values.email,
        password: values.password
      },
      
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className={classes.loginmainBox}>
      <Box className={classes.loginBox}>
        <Paper className="mainBox" elevation={2}>
          <Typography variant="h2" color="primary">
            Log in
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
                <Box className="displaySpacebetween">
                  <Box className="displayStart">
                    <Checkbox />
                    <Typography variant="body2" color="primary">
                      Remember me
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    style={{ cursor: "pointer" }}
                  >
                    Forgot Password?
                  </Typography>
                </Box>
                <Box mt={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={isLoading}
                  >
                    Login {isLoading && <ButtonCircularProgress />}
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

export default Login;

import { useState } from 'react';
import { urlLogin } from '../../../../endpoints.ts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { useSelector } from 'react-redux';
import {ScaleLoader} from 'react-spinners';
// material-ui
import { useTheme } from '@mui/material/styles';
import '../../../../css/loader.css';
import {
  Box,
  Button,
  Checkbox,
  //Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  //Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  //useMediaQuery
} from '@mui/material';

// third party
//import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//import Google from 'assets/images/icons/social-google.svg';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  //const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  //const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  // const googleHandler = async () => {
  //   console.error('Login');
  // };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>


      <Formik
        initialValues={{
          email: 'admin',
          password: '123456',
          submit: null
        }}
        // validationSchema={Yup.object().shape({
        //   email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        //   password: Yup.string().max(255).required('Password is required')
        // })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              setLoading(true);
              //let x=  urlLogin; //= 'https://localhost:7120/api/User/Login';
              // Data to be sent in the POST request
              const postData = {
                userId: values.email,
                password: values.password,
              };
              // Making the POST request using Axios
              axios.post(urlLogin, null,
                {
                  params: postData,
                  headers: {
                    'Content-Type': 'application/json', // Replace with the appropriate content type if needed
                    // Add any other required headers here
                  },
                })
                .then(response => {
                  // Handle the response data here
                  console.log('Response:', response.data);
                  setLoading(false);
                  //alert(JSON.stringify(response.data));
                  if (response.data.header.userContext.isAuthenticated == true) {
                    // const token = response.data;
                    // localStorage.setItem('authToken', token);
                    // const isuser=isUserAuthenticated();

                    
                    sessionStorage.setItem("auth", "true");
                    navigate('/dashboard');

                  } else {
                    alert("Invalid Login");
                    setLoading(false);
                  }

                })
                .catch(error => {
                  // Handle errors here
                  setLoading(false);
                  console.error('Error:', error);
                  navigate('/error')
                });




            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth  error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                sx={{ height: '40px' }} // Adjust the width to make it smaller

                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
              
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                sx={{ height: '40px'}} // Adjust the width to make it smaller
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Remember me"
              />
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            {loading && (
              <div className="loader-container">
                <ScaleLoader
                  color={'#36d646'} loading={loading} css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh' // Make the loader cover the entire viewport height
                  }} size={150} />
                {/* <RingLoader color={'#123abc'} loading={loading} css={{ margin: 'auto' }} size={150} /> */}
              </div>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;

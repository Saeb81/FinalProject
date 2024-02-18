import './Sign.css';
import { Container, Typography } from '@mui/material';
import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { get } from '../../utils/httpClient'

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const linkStyle = {
        display: 'flex',
        alignItems: 'center',

    };


    const handleLogin = (e) => {

        e.preventDefault();
        if (username === 'admin' && password === 'admin') {

            setLoggedInUser(username);

            alert('Login successful!');

        } else {

            alert('Invalid username or password');
        }
    };



    return (

        <div className="body" >

            <Container sx={{ height: 350, display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h3' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: 5 }} > Sign</Typography>

                <div>
                    <Box sx={{ display: 'flex', flexDirection: 'column', m: 1, width: '25ch', alignItems: 'flex-end' }}>

                        <Box display={'flex'}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" label="UserName" variant="standard" />
                        </Box>
                        <FormControl sx={{ m: 1, width: '22ch', marginRight: '-5px' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormControl sx={{ m: 1, width: '22ch' }} variant="standard">
                                <TextField sx={{ width: '22ch' }}
                                    // error
                                    id="standard-error"
                                    label="Age"
                                    variant="standard"
                                />
                                <TextField sx={{ width: '22ch' }}
                                    // error
                                    id="standard-error"
                                    label="Email"
                                    variant="standard"
                                />
                            </FormControl>
                        </FormControl>

                    </Box>
                </div>

                <Link to="/" style={linkStyle}><div >Already Having an Account?Login</div></Link>
                <Link to="/" ><div className='sign-btn '><Button>Sign in</Button></div></Link>

            </Container>
        </div>
    );
};




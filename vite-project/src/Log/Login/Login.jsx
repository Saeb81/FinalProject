import './Login.css';
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

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { get } from '../../utils/httpClient'

export default function Login() {
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);

    const [showPassword, setShowPassword] = React.useState(false);

    const loadUser = async () => {
        const data = await get('/users')
        // console.log(data[0].username)
        setUser(data);
    }
    useEffect(() => {
        loadUser()
    }, [])

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const linkStyle = {
        display: 'flex',
        alignItems: 'center',

    };

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertVisible1, setAlertVisible1] = useState(false);

    const handleUserName = (event) => {
        setUsername(event.target.value)
    }

    const handlePassword = () => {
        setPassword(event.target.value)
    }

    const handleForgotPasswordClick = () => {
        setAlertVisible(true);
    };

    const handleForgotPasswordClick1 = () => {
        setAlertVisible(false);
        setAlertVisible1(true);

        setTimeout(() => {
            setAlertVisible1(false);
        }, 3000);
    };


    const DemoPaper = styled(Paper)(({ theme }) => ({
        width: 200,
        height: 200,
        padding: theme.spacing(2),
        ...theme.typography.body2,
        textAlign: 'center',
    }));

    const handleLogin = async () => {

        const data = await get('/users')

        let i = 0;
        while (i < data.length) {
          
            if (data[i].username == username && data[i].password == password) {

                console.log(data[i].username)
                console.log(username)
                console.log(data[i].password)
                console.log(password)
            }
            i++;
        }


    };

    function hashing(s, tableSize) {
        let hashVal = 0;
        for (let i = 0; i < s.length; i++) {
            hashVal += s.charCodeAt(i);
        }
        return hashVal % tableSize;
    }


    const hashTableSize = 28;
    const key = "admin";
    const hashedKey = hashing(key, hashTableSize);
    console.log(`Hashed key for '${key}' is: ${hashedKey}`);


    return (

        <div className="body" >

            <Container sx={{ height: 350, display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h3' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: 5 }} > Login</Typography>

                <div>
                    <Box sx={{ display: 'flex', m: 1, width: '25ch', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="input-with-sx" label="UserName" variant="standard" onChange={handleUserName} />
                    </Box>
                </div>


                <div>
                    <FormControl sx={{ m: 5, width: '22ch', alignItems: 'flex-end' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input onChange={handlePassword}
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
                    </FormControl>
                </div>
                <Link to="/Sign" style={linkStyle}><div >New User?Sign in</div></Link>
                <Button onClick={handleForgotPasswordClick} >Forgot Your Password?</Button>


                <Link to="/" ><div className='sign-btn '><Button onClick={handleLogin}>Login</Button></div></Link>
            </Container>


            <Container sx={{
                display: alertVisible ? 'flex' : 'none',
                justifyContent: 'center',
                position: 'absolute',
                top: '35%',
                left: '50%',
                transform: 'translate(-50%, -50%)',

            }}>
                <DemoPaper variant="elevation"><TextField sx={{ width: '19ch' }}
                    // error
                    id="standard-error"
                    label="Email"
                    variant="standard"
                />
                    <Button sx={{ m: 3 }} onClick={handleForgotPasswordClick1} >Send</Button></DemoPaper>
            </Container>

            <Stack sx={{ display: alertVisible1 ? 'flex' : 'none', width: '100%' }} spacing={2}>
                <Alert severity="success">check your mail box.</Alert>
            </Stack>
        </div>
    );
};



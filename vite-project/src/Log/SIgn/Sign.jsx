import './Sign.css';
import { Container, Typography } from '@mui/material';
import * as React from 'react';
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material";
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
import { post } from '../../utils/httpClient'

import { useNavigate } from 'react-router-dom';


export default function Sign() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    let text = '';
    let text1 = '';

    const [loggedInUser, setLoggedInUser] = useState(null);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const linkStyle = {
        display: 'flex',
        alignItems: 'center',

    };

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertVisible1, setAlertVisible1] = useState(false);
    const [alertVisible2, setAlertVisible2] = useState(false);


    const failed = () => {
        setAlertVisible(false);
    }


    const handleUserName = (event) => {
        setUsername(event.target.value)
    }

    const handlePassword = () => {
        setPassword(event.target.value)
    }


    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleAge = () => {
        setAge(event.target.value)
    }

    const DemoPaper = styled(Paper)(({ theme }) => ({
        width: 200,
        height: 200,
        padding: theme.spacing(2),
        ...theme.typography.body2,
        textAlign: 'center',
    }));

    const navigate = useNavigate()

    const handleSign = async () => {
        let i = 0;
        if (username === "" || password === "" || email === "" || age === "") {
            console.log(username)
            text = 'Please Fill'
            text1 = 'All The Fields'
            console.log(text);

            setAlertVisible(true)
            return;
        }

        const data = await get('/users')

        while (i < data.length) {
            if (data[i].username === username) {
                console.log(data[i].username)
                console.log(username)
                console.log(data[i].password)
                console.log(password)
                console.log(text);
                text = 'This Username'
                text1 = 'Already Exist'
                console.log("text:", text);
                console.log("text1:", text1);

                setAlertVisible(true)
                break;

            }

            i++;
        }
        if (i >= data.length) {

            const id = hashing(username, hashTableSize)
            post('/users', { id, username, email, password, age })
            navigate('/Home')
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


    return (
        <div className='page'>
            <div className="body" >

                <Container sx={{ height: 350, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h3' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: 5 }} > Sign</Typography>

                    <div>
                        <Box sx={{ display: 'flex', flexDirection: 'column', m: 1, width: '25ch', alignItems: 'flex-end' }}>

                            <Box display={'flex'}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="input-with-sx" label="UserName" variant="standard" onChange={handleUserName} />
                            </Box>
                            <FormControl sx={{ m: 1, width: '22ch', marginRight: '-5px' }} variant="standard">
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
                                <FormControl sx={{ m: 1, width: '22ch' }} variant="standard">
                                    <TextField onChange={handleAge} sx={{ width: '22ch' }}
                                        // error
                                        id="standard-error"
                                        label="Age"
                                        variant="standard"
                                    />
                                    <TextField onChange={handleEmail} sx={{ width: '22ch' }}
                                        // error
                                        id="standard-error"
                                        label="Email"
                                        variant="standard"
                                    />
                                </FormControl>
                            </FormControl>
                        </Box>
                        <Container sx={{
                            display: alertVisible ? 'flex' : 'none',
                            justifyContent: 'center',
                            borderRadius: '5px',
                            position: 'absolute',
                            top: '85%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',

                        }}>
                            <DemoPaper variant="elevation">
                                <Container sx={{

                                    justifyContent: 'center',
                                    borderRadius: '5px',
                                    border: 'solid beige',

                                }}>

                                    <InputLabel htmlFor="standard-adornment-password">
                                        {'text: ' + text}
                                    </InputLabel>
                                    <InputLabel htmlFor="standard-adornment-password">
                                        {'text1: ' + text1}
                                    </InputLabel>

                                </Container>

                                <Button sx={{ m: 3 }} onClick={failed} >OK</Button></DemoPaper>
                        </Container>
                    </div>

                    <Link to="/" style={linkStyle}><div className='in'>Already Having an Account?Login</div></Link>
                    <div className='sign-btn ' onClick={handleSign}><Button>Sign in</Button></div>

                </Container>
            </div>
        </div>
    );
};




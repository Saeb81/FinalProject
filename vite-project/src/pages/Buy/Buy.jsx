import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { blue } from '@mui/material/colors';
import { Grid, Card, CardContent, Container, FormControl, Input, FormLabel } from '@mui/material';
import { CardMedia } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


import { Link } from 'react-router-dom';

import { get } from '../../utils/httpClient'
import { post } from '../../utils/httpClient'
import { useNavigate } from 'react-router-dom';







export default function Library() {



    return <div className='store'>
        <Container sx={{ display: 'flex', flexDirection: 'column', border: 'solid white', padding: 5, height: 500, width: 500 }}>

            <Typography>
                You ARe Trying To Buy This Game
                Click Confirm to add it to your library
                <Typography sx={{display : 'flex',flexDirection : 'column',justifyContent : 'center',alignItems: 'center'}}> 
                    <Typography>  -------------------       </Typography>
                    <Typography>  -------------------       </Typography>
                    <Typography>  -------------------       </Typography>
                    <Typography>  -------------------       </Typography>
                    <Typography>  -------------------       </Typography>
                    <Typography>  -------------------       </Typography>
                    <Typography>  -------------------       </Typography>
                    <Typography>  -------------------       </Typography>
                    <Typography>  -------------------       </Typography>
                    <Typography>  -------------------       </Typography>
                    <Typography>  -------------------       </Typography>
                    <Typography>  -------------------       </Typography>
                    <Typography>  -------------------       </Typography>
                    <Typography>  -------------------       </Typography>
          
                </Typography>
                <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button>Confirm</Button>
                </Typography>
            </Typography>
        </Container>
    </div>
}


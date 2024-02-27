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
import { Grid, Card, CardMedia, CardContent, Container, FormControl } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import './Home.css';
import { Link } from 'react-router-dom';

import { get } from '../utils/httpClient'
import { post } from '../utils/httpClient'

const data = await get('/game')
const base64 = data[2].image_base64


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',

  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


function SearchGame({title}) {

  return (
    <div>
      <Button>{title}</Button>
    </div>
  );
}






export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');

  const [userId, setUserId] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  const [height, setHeight] = useState(50)



  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    console.log(storedUserId);

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {

    isAdmin();
  }, [userId]);


  const isAdmin = async () => {
    let i = 0;
    const data = await get('/users')

    while (i < data.length) {

      if (data[i].user_id == userId) {
        console.log(data[i - 1].admin)
        if (data[i - 1].admin) {
          setAlertVisible(true);
        }
      }
      i++;
    }
  }



  const loadGame = (event) => {
    setTitle(event.target.value)
  }


  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };



  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(search);
    console.log("---------------");
    getGames();
    console.log("--------------------");
    console.log(search);

  }




  const getGames = async () => {
    console.log(search);
    
    if (search != '') {
      const data2 =  await get(`/title?search=${search}`);
      console.log(data2);
      let i = 0;
      while (i < data2.length) {
        
        setHeight(height + 100);
        SearchGame(data2[i].title);
        i++;
      }
    }
  }



  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu

      anchorEl={anchorEl}
      anchorOrigin={{

        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Container sx={{ display: 'flex', flexDirection: 'column', padding: '15%' }}>
        <Link to="/Profile"><MenuItem onClick={handleMenuClose}>Profile</MenuItem></Link>

        <Link to="/"> <MenuItem onClick={handleMenuClose}>SignOut</MenuItem> </Link>
      </Container>

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className='home' >

      <Search sx={{ backgroundColor: 'darkslategray', height: height }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase sx={{}} onChange={handleSearch} onClick={handleSearch}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>


      <Box sx={{ display: 'flex', flexGrow: 1, }}>
        <AppBar position="static">
          <Toolbar sx={{ display: 'flex', backgroundColor: 'black', }}>
            <Container>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                <Link to="/Home"><Typography sx={{ display: 'flex', color: 'white' }} onClick={handleMenuClose}>MaveShop</Typography></Link>
              </Typography>

            </Container>

            <Container sx={{ maxWidth: '300px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>

              <Link to="/Store"><Typography sx={{ display: 'flex', color: 'white' }} onClick={handleMenuClose}>Store</Typography></Link>
              <Link to="/Library"><Typography sx={{ display: 'flex', color: 'white' }} onClick={handleMenuClose}>Library</Typography></Link>
              <Link to="/AddGames"><Typography sx={{ display: alertVisible ? 'flex' : 'none', color: 'white' }} onClick={handleMenuClose}>Edit Games</Typography></Link>

            </Container>



            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex', } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>



      <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, marginTop: 5 }}>
        <Card sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 310, height: 1000,
          border: 'groove', backgroundColor: 'inherit'
        }}>
          <CardMedia
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5%', height: 200, width: 300 }}
            image={base64}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              GTA VI
            </Typography>
            <Typography variant="body2" color="text.secondary">
              the new Rockstar Game
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Buy</Button>
            <Button size="small">Read More</Button>
          </CardActions>
        </Card>
      </FormControl>
    </div>
  );
}

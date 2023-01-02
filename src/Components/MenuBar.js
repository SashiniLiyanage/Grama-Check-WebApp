import * as React from 'react';
import{ AppBar, Menu,Container,Avatar,MenuItem} from '@mui/material';
import{ Box,Toolbar,IconButton,Typography, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuthContext } from "@asgardeo/auth-react";
import { Link } from 'react-router-dom';

function MenuBar({info}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {signOut} = useAuthContext();
  const open = Boolean(anchorElUser);
  const open2 = Boolean(anchorElNav);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const GoToProfile = ()=>{
    window.open('https://myaccount.asgardeo.io/t/gramacheckauth', '_blank', 'noreferrer')
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Grama Check
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          
          <IconButton
            onClick={handleOpenNavMenu}
            size="large"
            aria-controls={open2 ? 'nav-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open2 ? 'true' : undefined}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          </Box>
          {info.hasGroups &&
          <Menu
            anchorEl={anchorElNav}
            id="nav-menu"
            open={open2}
            onClose={handleCloseNavMenu}
            onClick={handleCloseNavMenu}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  left: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
           
            
                <MenuItem>
                  <Typography textAlign="center"><Link to="/requests" replace>Requests</Link></Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center"><Link to="/database" replace>DataBase</Link></Typography>
                </MenuItem>
            
                              
          </Menu>
        }
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Grama Check
          </Typography>
          {info.hasGroups &&(
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Button
                // onClick={GoToRequests}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to="/requests" replace>Requests</Link>
              </Button><Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                  <Link to="/database" replace>DataBase</Link>
                </Button>
          </Box>
           )}

      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          
          <Button
            onClick={handleOpenUserMenu}
            size="small"
            sx={{ ml: 2, borderRadius: 5 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            color="inherit"
          >
            <Typography sx={{ m: 1, textTransform: 'none' }}> {info.displayName}</Typography>
            <Avatar sx={{ width: 32, height: 32 }} alt={info.username} src={info.profile} />
          </Button>
      </Box>
      <Menu
        anchorEl={anchorElUser}
        id="account-menu"
        open={open}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
 
        <MenuItem>
          <Typography textAlign="center" onClick={GoToProfile}>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={()=>{signOut()}}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MenuBar;

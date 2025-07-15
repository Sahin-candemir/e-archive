import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar({ onShowUpload, onShowLogin, onShowSignup, isLoggedIn, onLogout, userFullName }) {

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(90deg,rgb(50, 50, 79) 0%, #3f51b5 100%)',
        backdropFilter: 'blur(4px)',
        boxShadow: '0px 2px 10px rgba(0,0,0,0.3)',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          onClick={() => window.location.reload()}
          sx={{
            mr: 2,
            fontWeight: 'bold',
            letterSpacing: 1,
            color: 'white',

          }}
        >
          📁 Dosya Yöneticisi
        </Typography>

        {isLoggedIn && (
          <Button
            color="inherit"
            onClick={onShowUpload}
            sx={{
              mr: 2,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Dosya Yükle
          </Button>
        )}

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          {isLoggedIn ? (
            <>
              {userFullName && (
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <AccountCircleIcon sx={{ mr: 1, color: 'white' }} />
                  <Typography variant="body1" component="span" sx={{ color: '#fff' }}>
                    Hoş Geldin, <strong>{userFullName}</strong>
                  </Typography>
                </Box>
              )}
              <Button
                color="inherit"
                onClick={onLogout}
                sx={{
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Çıkış Yap
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={onShowLogin}
                sx={{
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Giriş Yap
              </Button>
              <Button
                color="inherit"
                onClick={onShowSignup}
                sx={{
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Üye Ol
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Navbar({ onShowUpload, onShowLogin, onShowSignup, isLoggedIn, onLogout, userFullName }) {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
          Dosya Yöneticisi
        </Typography>
        {isLoggedIn && (
          <Button color="inherit" onClick={onShowUpload} sx={{ mr: 2 }}>
            Dosya Yükle
          </Button>
        )}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          {isLoggedIn ? (
            <>
              {userFullName && (
                <Typography variant="body1" component="span" sx={{ mr: 2 }}>
                  Hoş Geldin, {userFullName}
                </Typography>
              )}
              <Button color="inherit" onClick={onLogout}>
                Çıkış Yap
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={onShowLogin}>
                Giriş Yap
              </Button>
              <Button color="inherit" onClick={onShowSignup}>
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
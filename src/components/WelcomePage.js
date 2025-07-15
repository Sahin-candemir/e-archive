import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useTheme } from '@mui/material/styles';
import '../api/apiConfig';

function WelcomePage({ onShowLogin, onShowSignup }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        p: 4,
        backgroundColor: theme.palette.grey[50],
        borderRadius: 2,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.1)',
        },
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 30%, ${theme.palette.secondary.light} 90%)`,
        color: theme.palette.common.white,
        '& h4, & h6': {
          color: theme.palette.common.white,
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
        }
      }}
    >
      <FolderOpenIcon sx={{ fontSize: 80, color: theme.palette.primary.main, mb: 3 }} />
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: theme.palette.text.primary }}>
        e-Archive Projesine Hoş Geldiniz!
      </Typography>
      <Typography variant="h6" component="p" sx={{ mb: 4, color: theme.palette.text.secondary, maxWidth: '600px' }}>
        Tüm dosyalarınızı güvenli bir şekilde saklayın, yönetin ve kolayca erişin.
        Belgelerinizi düzenleyin, yükleyin ve dilediğiniz yerden erişilebilir kılın.
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={onShowLogin}
          sx={{ py: 1.5, px: 4 }}
        >
          Şimdi Giriş Yap
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={onShowSignup}
          sx={{ py: 1.5, px: 4 }}
        >
          Hemen Üye Ol
        </Button>
      </Box>
    </Box>
  );
}

export default WelcomePage;
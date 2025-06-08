import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen'; // Bir ikon ekleyelim
import { useTheme } from '@mui/material/styles'; // Tema renklerini kullanmak için

function WelcomePage({ onShowLogin, onShowSignup }) {
  const theme = useTheme(); // Material-UI temasını kullan

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%', // Parent Box'ın (App.js'deki sağ panel) yüksekliğini kapla
        textAlign: 'center',
        p: 4, // Padding ekle
        backgroundColor: theme.palette.grey[50], // Açık gri bir arka plan
        borderRadius: 2, // Hafif yuvarlak köşeler
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', // Hafif bir gölge
        transition: 'all 0.3s ease-in-out', // Geçiş efekti
        '&:hover': {
          boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.1)', // Hover'da gölgeyi belirginleştir
        },
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 30%, ${theme.palette.secondary.light} 90%)`,
        // Metin renklerini daha iyi görünür hale getirmek için
        color: theme.palette.common.white, // Metin rengini beyaza çevir
        '& h4, & h6': { // Başlıklar ve alt metin için renk ayarı
          color: theme.palette.common.white,
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)' // Metne hafif gölge ekle
        }
      }}
    >
      <FolderOpenIcon sx={{ fontSize: 80, color: theme.palette.primary.main, mb: 3 }} /> {/* Büyük bir ikon */}
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: theme.palette.text.primary }}>
        e-Archive Projesine Hoş Geldiniz!
      </Typography>
      <Typography variant="h6" component="p" sx={{ mb: 4, color: theme.palette.text.secondary, maxWidth: '600px' }}>
        Tüm dosyalarınızı güvenli bir şekilde saklayın, yönetin ve kolayca erişin.
        Belgelerinizi düzenleyin, yükleyin ve dilediğiniz yerden erişilebilir kılın.
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}> {/* Butonlar için boşluk */}
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
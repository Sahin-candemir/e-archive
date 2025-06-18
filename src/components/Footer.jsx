import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '10px 0',
        marginTop: '10px',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Dosya Uygulaması – Tüm hakları saklıdır.
      </Typography>
    </Box>
  );
}

export default Footer;

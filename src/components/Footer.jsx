import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

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
      <Typography
        variant="body2"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}
      >
        © {new Date().getFullYear()} Tüm hakları saklıdır |

        <GitHubIcon fontSize="small" />
        <Link
          href="https://github.com/Sahin-candemir/e-archive-frontend"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color="inherit"
        >
          Frontend Kodu
        </Link>

        <GitHubIcon fontSize="small" />
        <Link
          href="https://github.com/Sahin-candemir/e-archive-backend"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color="inherit"
        >
          Backend Kodu
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;

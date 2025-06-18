import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import axios from 'axios';

export default function LoginComponent({ onLoginSuccess, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });
      const token = response.data.token;
      const fullName = response.data.fullName;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userFullName', fullName);
      onLoginSuccess();
      onClose();
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: '50px auto' }}>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        Giriş Yap
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="E-posta"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Şifre"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={onClose}
        >
          İptal
        </Button>
      </form>
    </Paper>
  );
}
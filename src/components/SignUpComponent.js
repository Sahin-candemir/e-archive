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
import { API_BASE_URL } from '../api/apiConfig';

export default function SignupComponent({ onSignupSuccess, onClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        fullName,
        email,
        password,
      });
      alert(response.data.message || 'Üyelik başarıyla oluşturuldu!');
      onSignupSuccess();
      onClose();
    } catch (err) {
      console.error('Signup error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Üyelik oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: '50px auto' }}>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        Üye Ol
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tam Adınız"
          fullWidth
          margin="normal"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
          {loading ? 'Kayıt Olunuyor...' : 'Üye Ol'}
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
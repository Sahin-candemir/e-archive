import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api/apiConfig';

export default function ShareFile({ open, onClose, fileId }) {
  const [receiverEmail, setReceiverEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const senderEmail = localStorage.getItem('userEmail');

  const handleSend = async () => {
    try {
      setLoading(true);
      let numericFileId = fileId.replace("file-","");
      await axios.post(`${API_BASE_URL}/share`, {
        fileId:numericFileId,
        senderEmail,
        receiverEmail,
        message
      });
      alert('Dosya başarıyla paylaşıldı.');
      onClose();
      setReceiverEmail('');
      setMessage('');
    } catch (error) {
      alert('Gönderim sırasında bir hata oluştu.',error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Dosya Gönder</DialogTitle>
      <DialogContent>
        <TextField
          label="Alıcı E-posta"
          fullWidth
          margin="normal"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
        />
        <TextField
          label="Mesaj"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={handleSend} disabled={loading}>Gönder</Button>
      </DialogActions>
    </Dialog>
  );
}
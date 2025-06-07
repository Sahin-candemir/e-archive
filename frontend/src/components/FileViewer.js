import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useState, useEffect } from 'react';

export default function FileViewer({ fileName, content }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    // İçerik yoksa veya PDF değilse temizle
    if (!content) {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
      setPdfUrl(null);
      return;
    }

    const fileExtension = fileName.split('.').pop().toLowerCase();

    if (fileExtension === 'pdf') {
      // Eğer gelen content zaten bir Blob ise doğrudan kullan, değilse Blob oluşturmaya çalış
      let blobContent;
      if (content instanceof Blob) {
        blobContent = content;
      } else {
        // Bu durum olmamalı ama bir güvenlik önlemi olarak.
        // Eğer yanlışlıkla string gelirse, bir Blob oluşturmaya çalış
        console.warn("PDF içeriği beklenen Blob formatında değil, string olarak geldi. Blob oluşturuluyor.");
        blobContent = new Blob([content], { type: 'application/pdf' });
      }

      const url = URL.createObjectURL(blobContent);
      setPdfUrl(url);

      // Temizlik: component unmount olduğunda veya fileName/content değiştiğinde URL'yi serbest bırak
      return () => {
        URL.revokeObjectURL(url);
        setPdfUrl(null);
      };
    } else {
      // PDF olmayan dosyalar için PDF URL'sini temizle
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
      setPdfUrl(null);
    }
  }, [fileName, content]); // fileName veya content değiştiğinde useEffect tetiklenir

  if (!content) return null; // İçerik yoksa hiçbir şey gösterme

  const fileExtension = fileName.split('.').pop().toLowerCase();

  if (fileExtension === 'pdf') {
    return (
      <iframe
        src={pdfUrl}
        title="PDF Viewer"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    );
  }


  // Diğer dosya türleri için:
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">{fileName}</Typography>
      <Box
        sx={{
          whiteSpace: 'pre-wrap',
          backgroundColor: '#f5f5f5',
          p: 1,
          mt: 1,
          borderRadius: 1,
          maxHeight: '400px',
          overflow: 'auto',
        }}
      >
        {content} {/* Metin içerik burada gösterilir */}
      </Box>
    </Paper>
  );
}
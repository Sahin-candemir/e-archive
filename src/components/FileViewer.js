import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useState, useEffect } from 'react';

export default function FileViewer({ fileName, content }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (!content) {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
      setPdfUrl(null);
      return;
    }

    const fileExtension = fileName.split('.').pop().toLowerCase();

    if (fileExtension === 'pdf') {
      let blobContent;
      if (content instanceof Blob) {
        blobContent = content;
      } else {
        blobContent = new Blob([content], { type: 'application/pdf' });
      }

      const url = URL.createObjectURL(blobContent);
      setPdfUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setPdfUrl(null);
      };
    } else {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
      setPdfUrl(null);
    }
  }, [fileName, content]);

  if (!content) return null;

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
        {content}
      </Box>
    </Paper>
  );
}
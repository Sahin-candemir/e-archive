import './App.css';
import { useState, useRef, useEffect } from 'react';
import FileViewer from './components/FileViewer';
import FileExplorer from './components/FileExplorer';
import FileUploadPage from './components/FileUploadPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import axios from 'axios';
import LoginComponent from './components/LoginComponent';
import SignupComponent from './components/SignUpComponent';
import { Box, Typography, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './config/axiosConfig';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [openedFile, setOpenedFile] = useState({ fileName: null, content: null });
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [userFullName, setUserFullName] = useState(null);
  useEffect(() => {
    // Check for token on app load
    const token = localStorage.getItem('authToken');
    const storedFullName = localStorage.getItem('userFullName');
    if (token) {
      setIsLoggedIn(true);
      setUserFullName(storedFullName);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    const storedFullName = localStorage.getItem('userFullName');
    setUserFullName(storedFullName);
  };

  const handleSignupSuccess = () => {
    alert('Üyeliğiniz başarıyla oluşturuldu! Lütfen giriş yapın.');
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userFullName');
    setUserFullName(null);
    setOpenedFile({ fileName: null, content: null });
    setSelectedFolderId(null);
    setShowUploadModal(false);
    setIsLoggedIn(false);

    setOpenedFile({ fileName: null, content: null });
    setSelectedFolderId(null);
  };

  const handleOpenFileContent = (fileName, content) => {
    setOpenedFile({ fileName, content });
  };

  const handleSelectFolder = (folderId) => {
    setSelectedFolderId(folderId);
  };

  const handleOpenUploadModal = () => {
    setShowUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
    setSelectedFolderId(null);
  };

  const handleUploadSuccessAndCloseModal = () => {
      setShowUploadModal(false);
      setSelectedFolderId(null);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar
        onShowUpload={handleOpenUploadModal}
        onShowLogin={() => { setShowLogin(true); setShowSignup(false); }}
        onShowSignup={() => { setShowSignup(true); setShowLogin(false); }}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        userFullName={userFullName} // userFullName'i Navbar'a prop olarak geçiyoruz
      />
      <Box sx={{ display: 'flex', flexGrow: 1, paddingTop: '64px' }}>
        <Box sx={{ width: '300px', borderRight: '1px solid #ddd', p: 2 }}>
          {isLoggedIn ? (
            <FileExplorer
              onOpenFileContent={handleOpenFileContent}
              onSelectFolder={handleSelectFolder}
            />
          ) : (
            <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
              Giriş Yaparak veya Üye Olularak Dosya Yöneticisine Erişin.
            </Typography>
          )}
        </Box>
        <Box sx={{ flexGrow: 1, p: 2 }}>
          {showLogin && (
            <LoginComponent
              onLoginSuccess={handleLoginSuccess}
              onClose={() => setShowLogin(false)}
            />
          )}
          {showSignup && (
            <SignupComponent
              onSignupSuccess={handleSignupSuccess}
              onClose={() => setShowSignup(false)}
            />
          )}
          {!showLogin && !showSignup && isLoggedIn && openedFile.fileName && (
            <FileViewer fileName={openedFile.fileName} content={openedFile.content} />
          )}
        </Box>
      </Box>

      {isLoggedIn && (
        <Dialog
          open={showUploadModal}
          onClose={handleCloseUploadModal}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Dosya Yükle {selectedFolderId ? `(Hedef: ${selectedFolderId})` : '(Hedef: Kök Dizin)'}
              <IconButton aria-label="close" onClick={handleCloseUploadModal}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <FileUploadPage
              folderId={selectedFolderId}
              onUploadSuccess={handleUploadSuccessAndCloseModal}
            />
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}

export default App;
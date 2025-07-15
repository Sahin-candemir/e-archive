import * as React from 'react';
import { TreeItem } from '@mui/x-tree-view';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material/styles';
import ShareFile from './ShareFile';
import {Description as TextFileIcon,PictureAsPdf as PdfFileIcon,Article as DocFileIcon,InsertDriveFile as DefaultFileIcon} from '@mui/icons-material';
import {Box,Typography,CircularProgress,IconButton,Menu,MenuItem,} from '@mui/material';
import { getFileIcon } from './TreeUtils';
import '../api/apiConfig';

export default function TreeItemRenderer({
  nodes,
  expandedItems,
  loadingItems,
  onFileDelete,
  onFileOpen,
}) {
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [selectedFileId, setSelectedFileId] = React.useState(null);
  const [shareFileOpen, setShareFileOpen] = React.useState(false);
  const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'txt':
      return <TextFileIcon sx={{ color: '#4CAF50' }} />;
    case 'pdf':
      return <PdfFileIcon sx={{ color: '#F44336' }} />;
    case 'doc':
    case 'docx':
      return <DocFileIcon sx={{ color: '#2196F3' }} />;
    default:
      return <DefaultFileIcon sx={{ color: '#9E9E9E' }} />;
  }
};

  const handleMenuOpen = (event, itemId) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedFileId(itemId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    //setSelectedFileId(null);
  };

  const handleDelete = () => {
    if (selectedFileId && onFileDelete) {
      onFileDelete(selectedFileId);
    }
    handleMenuClose();
  };

  const handleOpen = () => {
    if (selectedFileId && onFileOpen) {
      onFileOpen(selectedFileId);
    }
    handleMenuClose();
  };
  const handleShare = () => {
    console.log("file : id", selectedFileId);
    setShareFileOpen(true);
    handleMenuClose();
  };

  return (
    <>
      {nodes.map((node) => (
        <TreeItem
          key={node.itemId}
          itemId={node.itemId}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {node.isFolder ? (
                  <FolderIcon sx={{ color: '#1976d2' }} />
                ) : (
                  getFileIcon(node.label)
                )}
                <Typography variant="body2">{node.label}</Typography>
              </Box>
              {!node.isFolder && (
                <>
                  <IconButton size="small" onClick={(e) => handleMenuOpen(e, node.itemId)}>
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </>
              )}
            </Box>
          }
        >
          {node.children?.length > 0 ? (
            <TreeItemRenderer
              nodes={node.children}
              expandedItems={expandedItems}
              loadingItems={loadingItems}
              onFileDelete={onFileDelete}
              onFileOpen={onFileOpen}
            />
          ) : node.isFolder ? (
            loadingItems.has(node.itemId) && expandedItems.includes(node.itemId) ? (
              <Box sx={{ pl: 2, pt: 0.5 }}>
                <CircularProgress size={16} />
              </Box>
            ) : (
              <span style={{ display: 'none' }} />
            )
          ) : null}
        </TreeItem>
      ))}

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleOpen}>Aç</MenuItem>
        <MenuItem onClick={handleDelete}>Sil</MenuItem>
        <MenuItem onClick={handleShare}>Gönder</MenuItem>
      </Menu>

      <ShareFile
        open={shareFileOpen}
        onClose={() => setShareFileOpen(false)}
        fileId={selectedFileId}
      />
    </>
  );
}
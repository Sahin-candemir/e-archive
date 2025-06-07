import * as React from 'react';
import { TreeItem } from '@mui/x-tree-view';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { getFileIcon } from './TreeUtils';

export default function TreeItemRenderer({
  nodes,
  expandedItems,
  loadingItems, // Yeni prop: loadingItems
  onFileDelete,
  onFileOpen,
}) {
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [selectedFileId, setSelectedFileId] = React.useState(null);

  const handleMenuOpen = (event, itemId) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedFileId(itemId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedFileId(null);
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
              loadingItems={loadingItems} // Yeni prop'u alt bileşene de ilet
              onFileDelete={onFileDelete}
              onFileOpen={onFileOpen}
            />
          ) : node.isFolder ? (
            // Buradaki koşulu güncelleyin: loadingItems içinde mi ve genişletilmiş mi?
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
      </Menu>
    </>
  );
}
import React, { useState, useEffect } from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import {
  Folder as FolderIcon,
  InsertDriveFile as DefaultFileIcon,
  Description as TextFileIcon,
  PictureAsPdf as PdfFileIcon,
  ImageIcon,
  Code as CodeFileIcon,
  Article as DocFileIcon,
  Archive as ZipFileIcon,
  MusicNote as AudioFileIcon,
  Movie as VideoFileIcon,
  ChevronRight as ExpandIcon,
  ExpandMore as CollapseIcon,
} from '@mui/icons-material';
import { Box, Typography, CircularProgress, useTheme } from '@mui/material'; // useTheme eklendi
import axios from 'axios';

const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'txt':
    case 'md':
      return <TextFileIcon sx={{ color: '#4CAF50' }} />;
    case 'pdf':
      return <PdfFileIcon sx={{ color: '#F44336' }} />;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
      return <ImageIcon sx={{ color: '#FFC107' }} />;
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
    case 'html':
    case 'css':
    case 'json':
      return <CodeFileIcon sx={{ color: '#2196F3' }} />;
    case 'doc':
    case 'docx':
    case 'xls':
    case 'xlsx':
    case 'ppt':
    case 'pptx':
      return <DocFileIcon sx={{ color: '#9C27B0' }} />;
    case 'zip':
    case 'rar':
    case '7z':
      return <ZipFileIcon sx={{ color: '#607D8B' }} />;
    case 'mp3':
    case 'wav':
      return <AudioFileIcon sx={{ color: '#E91E63' }} />;
    case 'mp4':
    case 'avi':
    case 'mkv':
      return <VideoFileIcon sx={{ color: '#00BCD4' }} />;
    default:
      return <DefaultFileIcon sx={{ color: '#9E9E9E' }} />;
  }
};

const FolderTree = ({ onSelectFile }) => {
  const [treeData, setTreeData] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [loadingFolders, setLoadingFolders] = useState(new Set());
  const theme = useTheme();

  useEffect(() => {
    loadRootFolders();
  }, []);

  const loadRootFolders = async () => {
    try {
      const res = await axios.get('/api/folders/tree');
      const folders = res.data.map(folder => ({
        ...folder,
        type: 'folder',
        children: undefined,
      }));
      setTreeData(folders);
    } catch (error) {
      console.error("Kök klasörler yüklenirken hata oluştu:", error);
    }
  };

  const loadChildren = async (node) => {
    if (Array.isArray(node.children) || loadingFolders.has(node.id)) return;

    setLoadingFolders((prev) => new Set(prev).add(node.id));
    try {
      const subfoldersRes = await axios.get(`/api/folders/subfolders?parentId=${node.id}`);
      const filesRes = await axios.get(`/api/files/getAll?folderId=${node.id}&page=0&size=100`);

      const folders = subfoldersRes.data.map(f => ({
        ...f,
        type: 'folder',
        children: undefined,
      }));
      const files = filesRes.data.content.map(f => ({
        ...f,
        type: 'file',
      }));

      setTreeData(prevTreeData => {
        const updateChildren = (nodes) => {
          return nodes.map(n => {
            if (String(n.id) === String(node.id)) {
              return { ...n, children: [...folders, ...files] };
            }
            if (Array.isArray(n.children)) {
              return { ...n, children: updateChildren(n.children) };
            }
            return n;
          });
        };
        return updateChildren(prevTreeData);
      });

    } catch (err) {
      console.error('Alt klasörler ve dosyalar yüklenirken hata:', err);
    } finally {
      setLoadingFolders((prev) => {
        const newSet = new Set(prev);
        newSet.delete(node.id);
        return newSet;
      });
    }
  };

  const handleNodeToggle = async (event, nodeIds) => {
    const newlyExpanded = nodeIds.filter(id => !expandedIds.includes(id));
    
    for (const nodeId of newlyExpanded) {
      const targetNode = findNodeById(treeData, nodeId);
      if (targetNode?.type === 'folder') {
        await loadChildren(targetNode);
      }
    }
    setExpandedIds(nodeIds);
  };

  const findNodeById = (nodes, id) => {
    for (let node of nodes) {
      if (String(node.id) === id) return node;
      if (Array.isArray(node.children)) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const renderTree = (nodes) =>
    nodes.map((node) => (
      <TreeItem
        key={node.id}
        itemId={String(node.id)}
        label={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              py: 0.5,
            }}
          >
            {node.type === 'folder' ? (
              <FolderIcon sx={{ color: theme.palette.primary.main }} />
            ) : (
              getFileIcon(node.name)
            )}
            <Typography
              variant="body2"
              sx={{
                flexGrow: 1,
                cursor: node.type === 'file' ? 'pointer' : 'default',
                '&:hover': {
                  textDecoration: node.type === 'file' ? 'underline' : 'none',
                  color: node.type === 'file' ? theme.palette.primary.dark : 'inherit',
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (node.type === 'file') onSelectFile?.(node);
              }}
            >
              {node.name}
            </Typography>
          </Box>
        }
      >
        {loadingFolders.has(node.id) && (
          <Box sx={{ pl: 2, py: 0.5, display: 'flex', alignItems: 'center' }}>
            <CircularProgress size={16} sx={{ mr: 1 }} />
            <Typography variant="caption" color="textSecondary">Yükleniyor...</Typography>
          </Box>
        )}
        {Array.isArray(node.children) ? (
          node.children.length > 0 ? (
            renderTree(node.children)
          ) : (
            // Boş klasörler için mesaj
            <Typography variant="caption" sx={{ pl: 2, fontStyle: 'italic', color: 'text.secondary' }}>
              Klasör boş
            </Typography>
          )
        ) : null}
      </TreeItem>
    ));

  return (
    <SimpleTreeView
      expandedItems={expandedIds}
      onExpandedItemsChange={handleNodeToggle}
      slots={{
        expandIcon: ExpandIcon,
        collapseIcon: CollapseIcon,
      }}
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        '& .MuiTreeItem-label': {
          padding: theme.spacing(0.5),
        },
        '& .MuiTreeItem-content': {
          padding: theme.spacing(0.5, 1),
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.action.focus,
          },
        },
      }}
    >
      {renderTree(treeData)}
    </SimpleTreeView>
  );
};

export default FolderTree;
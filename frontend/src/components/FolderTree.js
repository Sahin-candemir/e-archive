import React, { useState, useEffect } from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Folder, InsertDriveFile } from '@mui/icons-material';
import axios from 'axios';

const FolderTree = ({ onSelectFile }) => {
  const [treeData, setTreeData] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [loadingFolders, setLoadingFolders] = useState(new Set());
  useEffect(() => {
    loadRootFolders();
  }, []);

  const loadRootFolders = async () => {
    const res = await axios.get('/api/folders/tree');
    const folders = res.data.map(folder => ({
      ...folder,
      type: 'folder',
      children: undefined, // henüz yüklenmedi
    }));
    setTreeData(folders);
  };

 const loadChildren = async (node) => {
  if (Array.isArray(node.children)) return; // Zaten yüklü
  // node.id kullan
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
    node.children = [...folders, ...files];
    setTreeData([...treeData]);
  } finally {
    // Loading state'i güncelle
    setLoadingFolders((prev) => {
      const newSet = new Set(prev);
      newSet.delete(node.id);
      return newSet;
    });
  }
};

  const handleNodeToggle = async (nodeId) => {
  const targetNode = findNodeById(treeData, nodeId);
  if (targetNode?.type === 'folder') {
    await loadChildren(targetNode);
  }
  setExpandedIds((prevExpandedIds) =>
    prevExpandedIds.includes(nodeId)
      ? prevExpandedIds.filter((id) => id !== nodeId)
      : [...prevExpandedIds, nodeId]
  );
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {node.type === 'folder' ? <Folder /> : <InsertDriveFile />}
          <span>{node.name}</span>
        </Box>
      }
      onClick={(e) => {
        e.stopPropagation();
        if (node.type === 'file') onSelectFile?.(node);
      }}
    >
      {loadingFolders.has(node.id) && (
        <Box sx={{ pl: 2, py: 1 }}>
          <CircularProgress size={16} />
        </Box>
      )}
      {Array.isArray(node.children) ? renderTree(node.children) : null}
    </TreeItem>
  ));

  return (
   <SimpleTreeView expandedItems={expandedIds} onItemSelectionToggle={handleNodeToggle}>
  {renderTree(treeData)}
</SimpleTreeView>
  );
};

export default FolderTree;
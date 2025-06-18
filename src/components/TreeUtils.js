import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export const addSubItemsToTree = (nodes, parentId, folders, files) => {
  console.log('addSubItemsToTree çağrıldı:', { parentId, folders, files });

  return nodes.map(node => {
    if (node.itemId === parentId) {
      const existingChildren = node.children || [];

      const newFolderItems = folders.map(f => {
        if (!f.id) {
          console.error('Folder id undefined:', f);
        }
        return {
          itemId: `folder-${f.id}`,
          label: f.name,
          isFolder: true,
          children: [],
        };
      });

      const newFileItems = files.map(file => {
        if (!file.id) {
          console.error('File id undefined:', file);
        }
        return {
          itemId: `file-${file.id}`,
          label: file.name,
          isFolder: false,
        };
      });

      const combinedChildren = [
        ...existingChildren,
        ...newFolderItems,
        ...newFileItems,
      ];

      return {
        ...node,
        children: combinedChildren,
      };
    }

    if (node.children) {
      return {
        ...node,
        children: addSubItemsToTree(node.children, parentId, folders, files),
      };
    }

    return node;
  });
};

export function getFileIcon(fileName) {
  const extension = fileName.split('.').pop().toLowerCase();
  return <InsertDriveFileIcon sx={{ color: '#666' }} />;
}
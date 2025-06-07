package com.sahin.archiving_system.service;

import com.sahin.archiving_system.dto.FolderContentDto;
import com.sahin.archiving_system.dto.FolderDto;
import com.sahin.archiving_system.model.Folder;

import java.util.List;

public interface FolderService {

    Folder createFolder(String name, Long parentId);
    List<Folder> getSubfolders(Long parentId);

    Folder getFolderById(Long folderId);

    void deleteFolder(Long id);
    List<Folder> findByParentId(Long parentId);

    List<FolderDto> findByParentIsNull();
    FolderContentDto findSubFoldersAndFiles(Long id);
}

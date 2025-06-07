package com.sahin.archiving_system.service.impl;

import com.sahin.archiving_system.dto.FileDto;
import com.sahin.archiving_system.dto.FolderContentDto;
import com.sahin.archiving_system.dto.FolderDto;
import com.sahin.archiving_system.mapper.FolderMapper;
import com.sahin.archiving_system.model.File;
import com.sahin.archiving_system.model.Folder;
import com.sahin.archiving_system.repository.FileRepository;
import com.sahin.archiving_system.repository.FolderRepository;
import com.sahin.archiving_system.service.FileService;
import com.sahin.archiving_system.service.FolderService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FolderServiceImpl implements FolderService {

    private final FolderRepository folderRepository;
    private final FileRepository fileRepository;
    private final FolderMapper folderMapper;
    public Folder createFolder(String name, Long parentId){
        Folder parent=null;
        if (parentId != null){
            parent = folderRepository.findById(parentId).orElseThrow(() -> new RuntimeException("Folder nor found with id:"+ parentId));
        }
        if (parent != null){
            folderRepository.findByNameAndParent(name, parent).ifPresent(folder -> {throw new RuntimeException("sdfasd");});
        }
        Folder folder = new Folder();
        folder.setName(name);
        folder.setParent(parent);

        return folderRepository.save(folder);
    }
    public List<Folder> getSubfolders(Long parentId) {
        return folderRepository.findByParentId(parentId);
    }

    @Override
    public Folder getFolderById(Long folderId) {
        return folderRepository.findById(folderId).orElseThrow(() -> new RuntimeException("Folder not found"));
    }

    @Override
    public void deleteFolder(Long id) {
        boolean hasChildFolders = folderRepository.existsByParentId(id);
        boolean hasFiles = fileRepository.existsByFolderId(id);
        if (hasChildFolders || hasFiles){
            throw new IllegalStateException("This folder cannot be deleted because it contains subfolders or files.");
        }
        folderRepository.deleteById(id);
    }
    @Override
    public List<Folder> findByParentId(Long parentId){
        return folderRepository.findByParentId(parentId);
    }

    @Override
    public List<FolderDto> findByParentIsNull() {
        List<Folder> parents = folderRepository.findByParentIsNull();
        return parents.stream().map(folderMapper::folderToFolderDto).collect(Collectors.toList());
    }

    @Override
    public FolderContentDto findSubFoldersAndFiles(Long id) {
        List<Folder> childrenFolders = folderRepository.findByParentId(id);
        List<File> files = fileRepository.findByFolderId(id);

        List<FolderDto> foldersDTO = childrenFolders.stream().map(f -> new FolderDto(f.getId(),f.getName())).collect(Collectors.toList());
        List<FileDto> filesDTO = files.stream().map(f -> new FileDto(f.getId(),f.getName(),f.getType())).collect(Collectors.toList());

        return new FolderContentDto(foldersDTO, filesDTO);
    }

    public FolderServiceImpl(FolderRepository folderRepository, FileRepository fileRepository, FolderMapper folderMapper) {
        this.folderRepository = folderRepository;
        this.fileRepository = fileRepository;
        this.folderMapper = folderMapper;
    }
}

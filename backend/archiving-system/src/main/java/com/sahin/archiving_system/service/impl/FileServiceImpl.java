package com.sahin.archiving_system.service.impl;

import com.sahin.archiving_system.dto.FileResponse;
import com.sahin.archiving_system.exception.DuplicateFileNameException;
import com.sahin.archiving_system.exception.FilesAlreadyException;
import com.sahin.archiving_system.exception.FolderNotFoundException;
import com.sahin.archiving_system.mapper.FileResponseMapper;
import com.sahin.archiving_system.model.File;
import com.sahin.archiving_system.model.Folder;
import com.sahin.archiving_system.model.User;
import com.sahin.archiving_system.repository.FileRepository;
import com.sahin.archiving_system.service.FileService;
import com.sahin.archiving_system.service.FolderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FileServiceImpl implements FileService {

    private final FileRepository repository;
    private final FolderService folderService;
    private final FileResponseMapper fileResponseMapper;

    @Override
    public FileResponse store(User currentUser, MultipartFile multipartFile, Long folderId) throws IOException {
        Folder targetFolder = null;
        if (folderId != null) {
            targetFolder = folderService.getFolderByFolderIdAndUser(folderId, currentUser)
                    .orElseThrow(() -> new FolderNotFoundException("Folder not found with id :" + folderId + " or not owned by user."));
        }
        String fileName = multipartFile.getOriginalFilename();
        if (fileName == null || fileName.isBlank()){
            throw new IllegalArgumentException("File name cannot be empty.");
        }
        if (isFileNameExist(currentUser, fileName, targetFolder)){
            throw new DuplicateFileNameException("File name already exists. File name : " +multipartFile.getOriginalFilename());
        }
        File file = new File();
        file.setName(multipartFile.getOriginalFilename());
        file.setType(multipartFile.getContentType());
        file.setData(multipartFile.getBytes());
        file.setFolder(targetFolder);
        file.setUser(currentUser);
        File savedFile = repository.save(file);
        return fileResponseMapper.fileToFileResponse(savedFile);
    }
    @Override
    public List<FileResponse> storeMultipleFiles(User user, MultipartFile[] files, Long folderId) throws IOException {
        List<String> failedFileNames = new ArrayList<>();
        List<FileResponse> fileResponseList = new ArrayList<>();

        Folder targetFolder = folderService.getFolderByFolderIdAndUser(folderId, user)
                .orElseThrow(() -> new FolderNotFoundException("Folder not found with id :" + folderId + " or not owned by user."));
        for (MultipartFile file : files){
            String fileName = file.getOriginalFilename();
            if (isFileNameExist(user, fileName, targetFolder)){
                failedFileNames.add(fileName);
                continue;
            }
            FileResponse fileResponse = store(user,file,folderId);
            fileResponseList.add(fileResponse);
        }
        if (!failedFileNames.isEmpty()){
            throw new FilesAlreadyException(failedFileNames);
        }
        return fileResponseList;
    }
    @Override
    public List<FileResponse> getAllFiles() {
        List<File> files = repository.findAll();
        return files.stream().map(fileResponseMapper::fileToFileResponse).collect(Collectors.toList());
    }

    @Override
    public File getFileByFileName(String name) throws FileNotFoundException {
        return repository.findByName(name).orElseThrow(() -> new FileNotFoundException("File not found with name: "+name));
    }

    @Override
    public void updateFile(MultipartFile multipartFile) throws FileNotFoundException {
        File file = repository.findByName(multipartFile.getOriginalFilename())
                .orElseThrow(() -> new FileNotFoundException("File not found with name: "+ multipartFile.getOriginalFilename()));
        try {
            file.setData(multipartFile.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        file.setName(multipartFile.getOriginalFilename());
        file.setType(multipartFile.getContentType());
        repository.save(file);
    }

    @Override
    public void deleteFile(User user, String name) throws FileNotFoundException {
        File file = repository.findByUserAndName(user,name)
                .orElseThrow(() -> new FileNotFoundException("File not found with name: "+name));
        repository.delete(file);
    }

    @Override
    public Page<FileResponse> getFilesWithPaginationAndSearch(User user, int page, int size, String search, Long folderId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        List<Long> folderIds = folderId != null ? getAllFolderIds(folderId) : null;
        Page<File> files = searchFiles(user, search, folderIds, pageable);

        return files.map(fileResponseMapper::fileToFileResponse);
    }
    private Page<File> searchFiles(User user, String search, List<Long> folderIds, Pageable pageable) {
        if (folderIds != null && !folderIds.isEmpty()) {
            if (search != null && !search.isEmpty()) {
                return repository.findByUserAndFolderIdInAndNameContainingIgnoreCase(user, folderIds, search, pageable);
            }
            return repository.findByUserAndFolderIdIn(user, folderIds, pageable);
        } else {
            if (search != null && !search.isEmpty()) {
                return repository.findByUserAndNameContainingIgnoreCase(user, search, pageable);
            }
            return repository.findByUser(user, pageable);
        }
    }
    private List<Long> getAllFolderIds(Long folderId) {
        List<Long> folderIds = new ArrayList<>();
        folderIds.add(folderId);
        List<Long> childIds = getChildFolderIds(folderId);

        for (Long childId : childIds) {
            folderIds.addAll(getAllFolderIds(childId));
        }
        return folderIds;
    }
    private boolean isFileNameExists(String fileName) {
        return repository.existsByName(fileName);
    }

    private List<Long> getChildFolderIds(Long folderId) {
        return folderService.findByParentId(folderId)
                .stream()
                .map(Folder::getId)
                .collect(Collectors.toList());
    }
    private boolean isFileNameExist(User currentUser, String name, Folder folder) {
        return repository.existsByFolderAndUserAndName(folder, currentUser, name);
    }
    public FileServiceImpl(FileRepository repository, FolderService folderService, FileResponseMapper fileResponseMapper) {
        this.repository = repository;
        this.folderService = folderService;
        this.fileResponseMapper = fileResponseMapper;
    }
}

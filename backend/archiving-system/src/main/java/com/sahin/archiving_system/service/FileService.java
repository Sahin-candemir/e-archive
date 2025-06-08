package com.sahin.archiving_system.service;

import com.sahin.archiving_system.dto.FileResponse;
import com.sahin.archiving_system.model.File;
import com.sahin.archiving_system.model.User;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

public interface FileService {
    FileResponse store(User currentUser, MultipartFile multipartFile, Long folderId) throws IOException;

    List<FileResponse> storeMultipleFiles(User user, MultipartFile[] files, Long folderId) throws IOException;

    List<FileResponse> getAllFiles();

    File getFileByFileName(String name) throws FileNotFoundException;

    void updateFile(MultipartFile multipartFile) throws FileNotFoundException;

    void deleteFile(User user, String name) throws FileNotFoundException;

    Page<FileResponse> getFilesWithPaginationAndSearch(User user, int page, int size, String search, Long folderId);

}

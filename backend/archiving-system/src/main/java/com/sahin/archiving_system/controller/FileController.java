package com.sahin.archiving_system.controller;

import com.sahin.archiving_system.dto.FileResponse;
import com.sahin.archiving_system.model.File;
import com.sahin.archiving_system.model.User;
import com.sahin.archiving_system.service.FileService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

import java.util.List;

@RestController
@RequestMapping("/files")
public class FileController {

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    private final FileService fileService;

    @PostMapping("/upload/{folderId}")
    public ResponseEntity<FileResponse> uploadFile(@AuthenticationPrincipal User currentUser,
                                                   @PathVariable Long folderId,
                                                   @RequestParam("file") MultipartFile file) throws IOException {
        return new ResponseEntity<>(fileService.store(currentUser,file, folderId), HttpStatus.OK) ;
    }
    
    @PostMapping("/upload-multiple/{folderId}")
    public ResponseEntity<List<FileResponse>> uploadMultipleFiles(@AuthenticationPrincipal User currentUser,
                                                                  @PathVariable Long folderId,
                                                                  @RequestParam("files") MultipartFile[] files) throws IOException {
        List<FileResponse> fileResponseList = fileService.storeMultipleFiles(currentUser,files,folderId);
        return new ResponseEntity<>(fileResponseList, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<FileResponse>> getAllFiles(){
        return new ResponseEntity<>(fileService.getAllFiles(), HttpStatus.OK);
    }
    @GetMapping("/getAll")
    public ResponseEntity<Page<FileResponse>> getFiles(@AuthenticationPrincipal User currentUser,
                                                       @RequestParam(required = false) Long folderId,
                                                       @RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "50") int size,
                                                       @RequestParam(required = false) String search) {
        return new ResponseEntity<>(fileService.getFilesWithPaginationAndSearch(currentUser, page, size, search,folderId), HttpStatus.OK);
    }

    @GetMapping("/download/{name}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String name) throws FileNotFoundException {
        File dbFile = fileService.getFileByFileName(name);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.getType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getName() + "\"")
                .body(new ByteArrayResource(dbFile.getData()));
    }
    @PutMapping("/{name}")
    public ResponseEntity<String> updateFile(@RequestParam("file") MultipartFile multipartFile) throws FileNotFoundException {
        fileService.updateFile(multipartFile);
        return new ResponseEntity<>("File updated successfully",HttpStatus.OK);
    }
    @DeleteMapping("/{name}")
    public ResponseEntity<String> deleteFile(@AuthenticationPrincipal User currentUser,
                                             @PathVariable String name) throws FileNotFoundException {
        fileService.deleteFile(currentUser,name);
        return new ResponseEntity<>("File deleted successfully",HttpStatus.OK);
    }
}

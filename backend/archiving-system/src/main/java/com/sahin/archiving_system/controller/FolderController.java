package com.sahin.archiving_system.controller;

import com.sahin.archiving_system.dto.*;
import com.sahin.archiving_system.model.File;
import com.sahin.archiving_system.model.Folder;
import com.sahin.archiving_system.repository.FileRepository;
import com.sahin.archiving_system.repository.FolderRepository;
import com.sahin.archiving_system.service.FolderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/folders")
public class FolderController {

    private final FolderService folderService;
    private final FolderRepository folderRepository;
    public FolderController(FolderService folderService, FolderRepository folderRepository) {
        this.folderService = folderService;
        this.folderRepository = folderRepository;
    }

    @PostMapping
    public ResponseEntity<CreateFolderResponse> createFolder(@RequestBody CreateFolderRequest request) {
        Folder folder = folderService.createFolder(request.getName(), request.getParentId());
        CreateFolderResponse createFolderResponse = new CreateFolderResponse(folder.getId(),folder.getName());
        return new ResponseEntity<>(createFolderResponse, HttpStatus.OK);
    }

    @GetMapping("/subfolders")
    public ResponseEntity<List<Folder>> getSubfolders(@RequestParam(required = false) Long parentId) {
        return ResponseEntity.ok(folderService.getSubfolders(parentId));
    }
    @GetMapping("/parentfolders")
    public ResponseEntity<List<FolderDto>> getParentFolders() {
        return new ResponseEntity<>(folderService.findByParentIsNull(),HttpStatus.OK);
    }
    @GetMapping("/subfolders/{folderId}")
    public ResponseEntity<FolderContentDto> getSubfoldersAndFiles(@PathVariable Long folderId) {
        return new ResponseEntity<>(folderService.findSubFoldersAndFiles(folderId),HttpStatus.OK);
    }
    @GetMapping("/tree")
    public ResponseEntity<List<FolderDto>> getFolderTree() {
        List<Folder> roots = folderRepository.findByParentId(null);
        List<FolderDto> tree = roots.stream().map(this::buildTree).collect(Collectors.toList());
        return ResponseEntity.ok(tree);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFolder(@PathVariable Long id){
        folderService.deleteFolder(id);
        return new ResponseEntity<>("Folder deleted success.", HttpStatus.OK);
    }

    private FolderDto buildTree(Folder folder) {
        FolderDto dto = new FolderDto(folder.getId(), folder.getName());
        dto.setChildren(folder.getChildren().stream().map(this::buildTree).collect(Collectors.toList()));
        return dto;
    }
}

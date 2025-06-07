package com.sahin.archiving_system.dto;

import java.util.List;

public class FolderContentDto {
    private List<FolderDto> folders;
    private List<FileDto> files;

    public FolderContentDto(List<FolderDto> folders, List<FileDto> files) {
        this.folders = folders;
        this.files = files;
    }

    public List<FolderDto> getFolders() {
        return folders;
    }

    public void setFolders(List<FolderDto> folders) {
        this.folders = folders;
    }

    public List<FileDto> getFiles() {
        return files;
    }

    public void setFiles(List<FileDto> files) {
        this.files = files;
    }
}

package com.sahin.archiving_system.exception;

import java.util.List;

public class FilesAlreadyException extends RuntimeException {

    private final List<String> failedFileNames;

    public FilesAlreadyException(List<String> failedFileNames) {
        super("Some files could not be uploaded due to duplicate names");
        this.failedFileNames = failedFileNames;
    }

    public List<String> getFailedFileNames(){
        return failedFileNames;
    }
}

package com.sahin.archiving_system.exception;

public class FolderNotFoundException extends RuntimeException{

    public FolderNotFoundException(String message) {
        super(message);
    }
}

package com.sahin.archiving_system.exception;

public class DuplicateFileNameException extends RuntimeException{

    public DuplicateFileNameException(String message) {
        super(message);
    }
}

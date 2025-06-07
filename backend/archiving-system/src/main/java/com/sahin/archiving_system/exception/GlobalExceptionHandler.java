package com.sahin.archiving_system.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(FilesAlreadyException.class)
    public ResponseEntity<Map<String, Object>> handle(FilesAlreadyException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Some files could not be uploaded because they already exist.");
        response.put("failedFileNames", ex.getFailedFileNames());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}

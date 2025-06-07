package com.sahin.archiving_system.dto;

public class FileResponse {

    private String name;

    public FileResponse(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}

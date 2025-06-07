package com.sahin.archiving_system.dto;

public class CreateFolderResponse {

    private Long id;
    private String name;

    public CreateFolderResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getParentId() {
        return id;
    }

    public void setParentId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

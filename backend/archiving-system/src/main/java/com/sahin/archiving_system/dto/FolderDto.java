package com.sahin.archiving_system.dto;

import java.util.ArrayList;
import java.util.List;

public class FolderDto {
    public FolderDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public FolderDto() {

    }

    private Long id;
    private String name;
    private List<FolderDto> children = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<FolderDto> getChildren() {
        return children;
    }

    public void setChildren(List<FolderDto> children) {
        this.children = children;
    }



    public FolderDto(Long id, String name, List<FolderDto> children) {
        this.id = id;
        this.name = name;
        this.children = children;
    }
}

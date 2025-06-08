package com.sahin.archiving_system.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Folder parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Folder> children = new ArrayList<>();

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @OneToMany(mappedBy = "folder", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<File> files;
    public Folder() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<File> getFiles() {
        return files;
    }

    public void setFiles(Set<File> files) {
        this.files = files;
    }

    public Folder(Long id, String name, Folder parent, List<Folder> children, LocalDateTime createdAt, User user, Set<File> files) {
        this.id = id;
        this.name = name;
        this.parent = parent;
        this.children = children;
        this.createdAt = createdAt;
        this.user = user;
        this.files = files;
    }

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

    public Folder getParent() {
        return parent;
    }

    public void setParent(Folder parent) {
        this.parent = parent;
    }

    public List<Folder> getChildren() {
        return children;
    }

    public void setChildren(List<Folder> children) {
        this.children = children;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

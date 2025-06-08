package com.sahin.archiving_system.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "files")
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    private byte[] data;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id")
    private Folder folder;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public Folder getFolder() {
        return folder;
    }

    public void setFolder(Folder folder) {
        this.folder = folder;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public File() {

    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public File(String name, Long id, String type, byte[] data, String folderPath, LocalDateTime createdAt, Folder folder, User user) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.data = data;
        this.folder = folder;
        this.createdAt = createdAt;
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}

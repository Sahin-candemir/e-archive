package com.sahin.archiving_system.repository;

import com.sahin.archiving_system.model.File;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FileRepository extends JpaRepository<File, Long> {

    boolean existsByName(String name);

    Optional<File> findByName(String name);

    Page<File> findByNameContainingIgnoreCase(String search, Pageable pageable);

    Page<File> findByFolderIdAndNameContainingIgnoreCase(Long folderId, String search, Pageable pageable);

    Page<File> findByFolderId(Long folderId, Pageable pageable);
    boolean existsByFolderId(Long folderId);

    Page<File> findByFolderIdInAndNameContainingIgnoreCase(List<Long> folderIds, String search, Pageable pageable);

    Page<File> findByFolderIdIn(List<Long> folderIds, Pageable pageable);
    List<File> findByFolderId(Long folderId);
}

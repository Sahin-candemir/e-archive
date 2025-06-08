package com.sahin.archiving_system.repository;

import com.sahin.archiving_system.model.File;
import com.sahin.archiving_system.model.Folder;
import com.sahin.archiving_system.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FileRepository extends JpaRepository<File, Long> {

    boolean existsByName(String name);

    Optional<File> findByName(String name);

    boolean existsByFolderId(Long folderId);

    Page<File> findByFolderIdInAndNameContainingIgnoreCase(List<Long> folderIds, String search, Pageable pageable);

    Page<File> findByFolderIdIn(List<Long> folderIds, Pageable pageable);
    List<File> findByFolderId(Long folderId);

    boolean existsByFolderAndUserAndName(Folder targetFolder, User currentUser, String originalFilename);

    Page<File> findByUserAndFolderIdInAndNameContainingIgnoreCase(User user, List<Long> folderIds, String search, Pageable pageable);

    Page<File> findByUserAndFolderIdIn(User user, List<Long> folderIds, Pageable pageable);

    Page<File> findByUserAndNameContainingIgnoreCase(User user, String search, Pageable pageable);

    Page<File> findByUser(User user, Pageable pageable);

    Optional<File> findByUserAndName(User user, String name);
}

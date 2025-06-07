package com.sahin.archiving_system.repository;

import com.sahin.archiving_system.model.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    List<Folder> findByParentId(Long parentId);
    Optional<Folder> findByNameAndParent(String name, Folder parent);
    boolean existsByParentId(Long parentId);

    List<Folder> findByParentIsNull();
}

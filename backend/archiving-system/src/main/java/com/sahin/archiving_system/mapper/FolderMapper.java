package com.sahin.archiving_system.mapper;

import com.sahin.archiving_system.dto.FolderDto;
import com.sahin.archiving_system.model.Folder;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FolderMapper {
    FolderDto folderToFolderDto(Folder folder);
}

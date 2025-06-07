package com.sahin.archiving_system.mapper;

import com.sahin.archiving_system.dto.FileResponse;
import com.sahin.archiving_system.model.File;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FileResponseMapper {
    FileResponse fileToFileResponse(File file);
}

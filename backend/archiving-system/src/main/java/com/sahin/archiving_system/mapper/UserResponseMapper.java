package com.sahin.archiving_system.mapper;

import com.sahin.archiving_system.dto.UserRegisterResponse;
import com.sahin.archiving_system.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserResponseMapper {
    UserRegisterResponse userToUserRegisterResponse(User user);
}

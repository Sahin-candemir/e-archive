package com.sahin.archiving_system.service;

import com.sahin.archiving_system.dto.LoginResponse;
import com.sahin.archiving_system.dto.UserLoginRequest;
import com.sahin.archiving_system.dto.UserRegisterRequest;
import com.sahin.archiving_system.dto.UserRegisterResponse;

public interface AuthService {
    UserRegisterResponse register(UserRegisterRequest userRegisterRequest);

    LoginResponse authenticate(UserLoginRequest userLoginRequest);
}

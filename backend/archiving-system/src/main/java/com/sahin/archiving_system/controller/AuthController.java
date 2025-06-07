package com.sahin.archiving_system.controller;

import com.sahin.archiving_system.dto.LoginResponse;
import com.sahin.archiving_system.dto.UserLoginRequest;
import com.sahin.archiving_system.dto.UserRegisterRequest;
import com.sahin.archiving_system.dto.UserRegisterResponse;
import com.sahin.archiving_system.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/signup")
    public ResponseEntity<UserRegisterResponse> register(@RequestBody UserRegisterRequest userRegisterRequest){
        return new ResponseEntity<>(authService.register(userRegisterRequest), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody UserLoginRequest userLoginRequest){
        return new ResponseEntity<>(authService.authenticate(userLoginRequest),HttpStatus.OK);
    }
}

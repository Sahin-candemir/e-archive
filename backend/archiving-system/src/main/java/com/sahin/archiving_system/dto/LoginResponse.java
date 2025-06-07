package com.sahin.archiving_system.dto;

public class LoginResponse {

    private String token;
    private long expiresIn;
    private String fullName;

    public LoginResponse(String jwtToken, long expiresIn, String fullName) {
        this.token = jwtToken;
        this.expiresIn = expiresIn;
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
    }
}

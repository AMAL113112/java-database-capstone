package com.amal.smartclinic.service;

import org.springframework.stereotype.Service;

@Service
public class TokenService {

    public String generateToken(String role, String identifier) {
        return role + "_" + identifier + "_token";
    }

    public boolean validateToken(String token) {
        return token != null && token.endsWith("_token");
    }

    public boolean validateToken(String token, String role) {
        return validateToken(token) && role.equals(extractRole(token));
    }

    public String extractRole(String token) {
        if (token == null) {
            return null;
        }

        String[] parts = token.split("_");

        if (parts.length > 0) {
            return parts[0];
        }

        return null;
    }
}

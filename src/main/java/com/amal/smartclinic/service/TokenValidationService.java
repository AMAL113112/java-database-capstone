package com.amal.smartclinic.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TokenValidationService {

    @Autowired
    private TokenService tokenService;

    public Map<String, String> validateToken(String token, String role) {

        Map<String, String> response = new HashMap<>();

        if (token == null || token.isEmpty()) {
            response.put("error", "Invalid token");
            return response;
        }

        if (!tokenService.validateToken(token)) {
            response.put("error", "Token verification failed");
            return response;
        }

        String extractedRole = tokenService.extractRole(token);

        if (extractedRole == null || !extractedRole.equals(role)) {
            response.put("error", "Unauthorized role");
            return response;
        }

        return response;
    }
}
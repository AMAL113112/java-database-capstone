package com.amal.smartclinic.service;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenService {

    private static final String SECRET_KEY =
            "MySecretKeyForSmartClinicJWTTokenGeneration123456";

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String role, String email) {

        long currentTime = System.currentTimeMillis();
        long expiryTime = currentTime + (1000 * 60 * 60 * 24);

        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(new Date(currentTime))
                .expiration(new Date(expiryTime))
                .signWith(getSigningKey())
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean validateToken(String token, String role) {
        return validateToken(token) &&
                role.equals(extractRole(token));
    }

    public String extractRole(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            return claims.get("role", String.class);
        } catch (Exception e) {
            return null;
        }
    }
}

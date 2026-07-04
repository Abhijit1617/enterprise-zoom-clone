package com.enterprisezoom.util;

import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "mySuperSecretKeyForEnterpriseZoomCloneProject2026SecureKey123";

    private final SecretKey key =
            Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

}

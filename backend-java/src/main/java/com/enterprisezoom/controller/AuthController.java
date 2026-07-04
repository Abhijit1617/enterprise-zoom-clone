package com.enterprisezoom.controller;

import com.enterprisezoom.dto.AuthenticationResponse;
import com.enterprisezoom.dto.RegisterRequest;
import com.enterprisezoom.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthenticationResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }
}
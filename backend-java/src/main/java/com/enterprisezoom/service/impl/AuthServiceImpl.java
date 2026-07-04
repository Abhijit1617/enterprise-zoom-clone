package com.enterprisezoom.service.impl;

import com.enterprisezoom.dto.AuthenticationResponse;
import com.enterprisezoom.dto.RegisterRequest;
import com.enterprisezoom.entity.User;
import com.enterprisezoom.enums.Role;
import com.enterprisezoom.repository.UserRepository;
import com.enterprisezoom.service.AuthService;
import com.enterprisezoom.util.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail());

        return new AuthenticationResponse(token);
    }
}
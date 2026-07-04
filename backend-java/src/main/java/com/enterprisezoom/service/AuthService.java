package com.enterprisezoom.service;

import com.enterprisezoom.dto.AuthenticationResponse;
import com.enterprisezoom.dto.RegisterRequest;

public interface AuthService {

    AuthenticationResponse register(RegisterRequest request);

}
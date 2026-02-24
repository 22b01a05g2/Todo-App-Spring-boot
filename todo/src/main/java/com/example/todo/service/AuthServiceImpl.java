package com.example.todo.service;

import com.example.todo.dto.AuthResponse;
import com.example.todo.dto.LoginRequest;
import com.example.todo.dto.RegisterRequest;
import com.example.todo.model.User;
import com.example.todo.repository.UserRepository;
import com.example.todo.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepo, PasswordEncoder encoder, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void register(RegisterRequest request) {
        String username = request.getUsername().trim();

        if (userRepo.existsByUsername(username)) {
            throw new RuntimeException("Username already taken");
        }

        User u = new User();
        u.setUsername(username);
        u.setPasswordHash(encoder.encode(request.getPassword()));

        userRepo.save(u);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User u = userRepo.findByUsername(request.getUsername().trim())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!encoder.matches(request.getPassword(), u.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        return new AuthResponse(jwtUtil.generateToken(u.getUsername()));
    }
}
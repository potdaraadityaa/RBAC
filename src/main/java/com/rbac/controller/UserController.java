package com.rbac.controller;

import com.rbac.dto.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping
    public ResponseEntity<MessageResponse> getUserContent() {
        return ResponseEntity.ok(new MessageResponse("Welcome! This is USER level content."));
    }
}

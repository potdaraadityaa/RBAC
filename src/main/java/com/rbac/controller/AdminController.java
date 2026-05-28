package com.rbac.controller;

import com.rbac.dto.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping
    public ResponseEntity<MessageResponse> getAdminContent() {
        return ResponseEntity.ok(new MessageResponse("Welcome, Admin! This is ADMIN level content."));
    }
}

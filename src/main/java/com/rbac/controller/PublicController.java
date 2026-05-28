package com.rbac.controller;

import com.rbac.dto.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @GetMapping
    public ResponseEntity<MessageResponse> getPublicContent() {
        return ResponseEntity.ok(new MessageResponse("This is public content. No login required."));
    }
}

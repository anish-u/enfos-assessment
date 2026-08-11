package com.enfos.reporting.controller;

import com.enfos.reporting.service.SeedService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final SeedService seedService;

    @PostMapping("/seed")
    public Map<String, String> reseed() {
        seedService.reseed();
        return Map.of("message", "Database re-seeded");
    }
}

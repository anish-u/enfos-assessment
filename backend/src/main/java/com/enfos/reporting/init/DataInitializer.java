package com.enfos.reporting.init;

import com.enfos.reporting.service.SeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final SeedService seedService;

    @Override
    public void run(String... args) {
        seedService.seedIfEmpty();
    }
}

package com.enfos.reporting.controller;

import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.enfos.reporting.service.SeedService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(AdminController.class)
class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SeedService seedService;

    @Test
    void reseed_returnsSuccessMessage() throws Exception {
        mockMvc.perform(post("/api/admin/seed"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Database re-seeded"));

        verify(seedService).reseed();
    }
}

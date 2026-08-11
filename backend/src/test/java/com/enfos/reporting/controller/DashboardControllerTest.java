package com.enfos.reporting.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.enfos.reporting.config.ReportConstants;
import com.enfos.reporting.dto.DashboardDto;
import com.enfos.reporting.dto.PortalSummaryDto;
import com.enfos.reporting.dto.ReportHighlightDto;
import com.enfos.reporting.dto.ReportMetaDto;
import com.enfos.reporting.service.DashboardService;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(DashboardController.class)
class DashboardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DashboardService dashboardService;

    @Test
    void getDashboard_returnsSummaryAndEnrichedReports() throws Exception {
        LocalDateTime lastRefreshed = LocalDateTime.of(2025, 1, 15, 10, 30);
        when(dashboardService.getDashboard()).thenReturn(DashboardDto.builder()
                .summary(PortalSummaryDto.builder()
                        .totalRecords(29)
                        .activeUsers(11)
                        .inactiveUsers(3)
                        .totalEmployees(131)
                        .activeProjects(3)
                        .onHoldProjects(2)
                        .completedProjects(4)
                        .lastRefreshed(lastRefreshed)
                        .build())
                .reports(List.of(
                        ReportMetaDto.builder()
                                .id(ReportConstants.USERS_ID)
                                .name(ReportConstants.USERS_NAME)
                                .category(ReportConstants.CATEGORY_PEOPLE)
                                .rowCount(14)
                                .highlights(List.of(
                                        ReportHighlightDto.builder()
                                                .label("active")
                                                .value("11")
                                                .build()))
                                .build()))
                .build());

        mockMvc.perform(get("/api/dashboard"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.summary.totalRecords").value(29))
                .andExpect(jsonPath("$.summary.activeUsers").value(11))
                .andExpect(jsonPath("$.reports.length()").value(1))
                .andExpect(jsonPath("$.reports[0].category").value("People"))
                .andExpect(jsonPath("$.reports[0].highlights[0].label").value("active"));
    }
}

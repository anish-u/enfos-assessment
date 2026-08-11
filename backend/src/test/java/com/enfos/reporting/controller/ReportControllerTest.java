package com.enfos.reporting.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.enfos.reporting.config.ReportConstants;
import com.enfos.reporting.dto.ColumnDto;
import com.enfos.reporting.dto.ReportDetailDto;
import com.enfos.reporting.dto.ReportMetaDto;
import com.enfos.reporting.service.ReportService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ReportController.class)
class ReportControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReportService reportService;

    @Test
    void listReports_returnsReportMetadata() throws Exception {
        LocalDateTime lastUpdated = LocalDateTime.of(2025, 1, 15, 10, 30);
        when(reportService.listReports()).thenReturn(List.of(
                ReportMetaDto.builder()
                        .id(ReportConstants.USERS_ID)
                        .name(ReportConstants.USERS_NAME)
                        .description(ReportConstants.USERS_DESCRIPTION)
                        .lastUpdated(lastUpdated)
                        .rowCount(14)
                        .icon(ReportConstants.USERS_ICON)
                        .build(),
                ReportMetaDto.builder()
                        .id(ReportConstants.DEPARTMENTS_ID)
                        .name(ReportConstants.DEPARTMENTS_NAME)
                        .description(ReportConstants.DEPARTMENTS_DESCRIPTION)
                        .lastUpdated(lastUpdated)
                        .rowCount(6)
                        .icon(ReportConstants.DEPARTMENTS_ICON)
                        .build(),
                ReportMetaDto.builder()
                        .id(ReportConstants.PROJECTS_ID)
                        .name(ReportConstants.PROJECTS_NAME)
                        .description(ReportConstants.PROJECTS_DESCRIPTION)
                        .lastUpdated(lastUpdated)
                        .rowCount(9)
                        .icon(ReportConstants.PROJECTS_ICON)
                        .build()));

        mockMvc.perform(get("/api/reports"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3))
                .andExpect(jsonPath("$[0].id").value("users"))
                .andExpect(jsonPath("$[0].rowCount").value(14))
                .andExpect(jsonPath("$[1].id").value("departments"))
                .andExpect(jsonPath("$[2].id").value("projects"));
    }

    @Test
    void getUsersReport_returnsDetailShape() throws Exception {
        when(reportService.getUsersReport()).thenReturn(ReportDetailDto.builder()
                .meta(ReportMetaDto.builder()
                        .id(ReportConstants.USERS_ID)
                        .name(ReportConstants.USERS_NAME)
                        .description(ReportConstants.USERS_DESCRIPTION)
                        .lastUpdated(LocalDateTime.of(2025, 1, 15, 10, 30))
                        .rowCount(1)
                        .build())
                .columns(List.of(
                        ColumnDto.builder().key("userId").label("User ID").type("number").build(),
                        ColumnDto.builder().key("name").label("Name").type("string").build()))
                .rows(List.of(Map.of("userId", 1, "name", "Sarah Chen")))
                .build());

        mockMvc.perform(get("/api/reports/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.meta.id").value("users"))
                .andExpect(jsonPath("$.columns.length()").value(2))
                .andExpect(jsonPath("$.rows[0].name").value("Sarah Chen"));
    }
}

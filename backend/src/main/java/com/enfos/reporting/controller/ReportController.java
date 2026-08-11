package com.enfos.reporting.controller;

import com.enfos.reporting.dto.ReportDetailDto;
import com.enfos.reporting.dto.ReportMetaDto;
import com.enfos.reporting.service.ReportService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping
    public List<ReportMetaDto> listReports() {
        return reportService.listReports();
    }

    @GetMapping("/users")
    public ReportDetailDto getUsersReport() {
        return reportService.getUsersReport();
    }

    @GetMapping("/departments")
    public ReportDetailDto getDepartmentsReport() {
        return reportService.getDepartmentsReport();
    }

    @GetMapping("/projects")
    public ReportDetailDto getProjectsReport() {
        return reportService.getProjectsReport();
    }
}

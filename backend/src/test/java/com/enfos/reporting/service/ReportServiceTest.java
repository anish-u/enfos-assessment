package com.enfos.reporting.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import com.enfos.reporting.config.ReportConstants;
import com.enfos.reporting.entity.User;
import com.enfos.reporting.repository.DepartmentRepository;
import com.enfos.reporting.repository.ProjectRepository;
import com.enfos.reporting.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ReportServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private DepartmentRepository departmentRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private SeedService seedService;

    @InjectMocks
    private ReportService reportService;

    @Test
    void listReports_buildsThreeMetasWithCorrectIdsAndRowCounts() {
        LocalDateTime lastUpdated = LocalDateTime.of(2025, 1, 15, 10, 30);
        when(userRepository.count()).thenReturn(14L);
        when(departmentRepository.count()).thenReturn(6L);
        when(projectRepository.count()).thenReturn(9L);
        when(seedService.getLastSeededAt()).thenReturn(lastUpdated);

        var reports = reportService.listReports();

        assertThat(reports).hasSize(3);
        assertThat(reports.get(0).getId()).isEqualTo(ReportConstants.USERS_ID);
        assertThat(reports.get(0).getRowCount()).isEqualTo(14);
        assertThat(reports.get(0).getIcon()).isEqualTo(ReportConstants.USERS_ICON);
        assertThat(reports.get(0).getLastUpdated()).isEqualTo(lastUpdated);

        assertThat(reports.get(1).getId()).isEqualTo(ReportConstants.DEPARTMENTS_ID);
        assertThat(reports.get(1).getRowCount()).isEqualTo(6);

        assertThat(reports.get(2).getId()).isEqualTo(ReportConstants.PROJECTS_ID);
        assertThat(reports.get(2).getRowCount()).isEqualTo(9);
    }

    @Test
    void getUsersReport_returnsColumnsAndRows() {
        LocalDateTime lastUpdated = LocalDateTime.of(2025, 1, 15, 10, 30);
        when(userRepository.findAll()).thenReturn(List.of(
                User.builder()
                        .name("Sarah Chen")
                        .email("sarah.chen@enfos.com")
                        .role(ReportConstants.ROLE_ADMIN)
                        .status(ReportConstants.STATUS_ACTIVE)
                        .createdDate(lastUpdated)
                        .build()));
        when(seedService.getLastSeededAt()).thenReturn(lastUpdated);

        var report = reportService.getUsersReport();

        assertThat(report.getMeta().getId()).isEqualTo(ReportConstants.USERS_ID);
        assertThat(report.getColumns()).hasSize(6);
        assertThat(report.getRows()).hasSize(1);
        assertThat(report.getRows().get(0).get("name")).isEqualTo("Sarah Chen");
    }
}

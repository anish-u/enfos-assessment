package com.enfos.reporting.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.enfos.reporting.config.ReportConstants;
import com.enfos.reporting.entity.Department;
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
class DashboardServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private DepartmentRepository departmentRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private SeedService seedService;

    @InjectMocks
    private DashboardService dashboardService;

    @Test
    void getDashboard_buildsSummaryAndEnrichedReports() {
        LocalDateTime lastRefreshed = LocalDateTime.of(2025, 1, 15, 10, 30);

        when(userRepository.countByStatus(ReportConstants.STATUS_ACTIVE)).thenReturn(11L);
        when(userRepository.countByStatus(ReportConstants.STATUS_INACTIVE)).thenReturn(3L);
        when(projectRepository.countByStatus(ReportConstants.PROJECT_STATUS_ACTIVE)).thenReturn(3L);
        when(projectRepository.countByStatus(ReportConstants.PROJECT_STATUS_ON_HOLD)).thenReturn(2L);
        when(projectRepository.countByStatus(ReportConstants.PROJECT_STATUS_COMPLETED)).thenReturn(4L);
        when(userRepository.count()).thenReturn(14L);
        when(departmentRepository.count()).thenReturn(6L);
        when(projectRepository.count()).thenReturn(9L);
        when(departmentRepository.findAll()).thenReturn(List.of(
                Department.builder()
                        .departmentName("Engineering")
                        .employeeCount(42)
                        .location("San Francisco, CA")
                        .build(),
                Department.builder()
                        .departmentName("Marketing")
                        .employeeCount(18)
                        .location("Austin, TX")
                        .build()));
        when(seedService.getLastSeededAt()).thenReturn(lastRefreshed);

        var dashboard = dashboardService.getDashboard();

        assertThat(dashboard.getSummary().getTotalRecords()).isEqualTo(29);
        assertThat(dashboard.getSummary().getActiveUsers()).isEqualTo(11);
        assertThat(dashboard.getSummary().getTotalEmployees()).isEqualTo(60);
        assertThat(dashboard.getSummary().getLastRefreshed()).isEqualTo(lastRefreshed);

        assertThat(dashboard.getReports()).hasSize(3);
        assertThat(dashboard.getReports().get(0).getCategory()).isEqualTo(ReportConstants.CATEGORY_PEOPLE);
        assertThat(dashboard.getReports().get(0).getHighlights()).hasSize(2);
        assertThat(dashboard.getReports().get(1).getHighlights()).extracting("label")
                .containsExactly("employees", "locations");

        verify(departmentRepository, times(1)).findAll();
    }

    @Test
    void getDashboard_handlesEmptyDatabase() {
        when(userRepository.countByStatus(ReportConstants.STATUS_ACTIVE)).thenReturn(0L);
        when(userRepository.countByStatus(ReportConstants.STATUS_INACTIVE)).thenReturn(0L);
        when(projectRepository.countByStatus(ReportConstants.PROJECT_STATUS_ACTIVE)).thenReturn(0L);
        when(projectRepository.countByStatus(ReportConstants.PROJECT_STATUS_ON_HOLD)).thenReturn(0L);
        when(projectRepository.countByStatus(ReportConstants.PROJECT_STATUS_COMPLETED)).thenReturn(0L);
        when(userRepository.count()).thenReturn(0L);
        when(departmentRepository.count()).thenReturn(0L);
        when(projectRepository.count()).thenReturn(0L);
        when(departmentRepository.findAll()).thenReturn(List.of());
        when(seedService.getLastSeededAt()).thenReturn(LocalDateTime.of(2025, 1, 15, 10, 30));

        var dashboard = dashboardService.getDashboard();

        assertThat(dashboard.getSummary().getTotalRecords()).isZero();
        assertThat(dashboard.getSummary().getTotalEmployees()).isZero();
        assertThat(dashboard.getReports()).hasSize(3);
        assertThat(dashboard.getReports().get(0).getRowCount()).isZero();
    }
}

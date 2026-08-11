package com.enfos.reporting.service;

import com.enfos.reporting.config.ReportConstants;
import com.enfos.reporting.dto.DashboardDto;
import com.enfos.reporting.dto.PortalSummaryDto;
import com.enfos.reporting.dto.ReportHighlightDto;
import com.enfos.reporting.dto.ReportMetaDto;
import com.enfos.reporting.entity.Department;
import com.enfos.reporting.repository.DepartmentRepository;
import com.enfos.reporting.repository.ProjectRepository;
import com.enfos.reporting.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final ProjectRepository projectRepository;
    private final SeedService seedService;

    public DashboardDto getDashboard() {
        long activeUsers = userRepository.countByStatus(ReportConstants.STATUS_ACTIVE);
        long inactiveUsers = userRepository.countByStatus(ReportConstants.STATUS_INACTIVE);
        long activeProjects = projectRepository.countByStatus(ReportConstants.PROJECT_STATUS_ACTIVE);
        long onHoldProjects = projectRepository.countByStatus(ReportConstants.PROJECT_STATUS_ON_HOLD);
        long completedProjects = projectRepository.countByStatus(ReportConstants.PROJECT_STATUS_COMPLETED);

        long userCount = userRepository.count();
        long departmentCount = departmentRepository.count();
        long projectCount = projectRepository.count();

        List<Department> departments = departmentRepository.findAll();
        int totalEmployees = departments.stream()
                .mapToInt(Department::getEmployeeCount)
                .sum();

        long uniqueLocations = departments.stream()
                .map(Department::getLocation)
                .distinct()
                .count();

        PortalSummaryDto summary = PortalSummaryDto.builder()
                .totalRecords((int) (userCount + departmentCount + projectCount))
                .activeUsers((int) activeUsers)
                .inactiveUsers((int) inactiveUsers)
                .totalEmployees(totalEmployees)
                .activeProjects((int) activeProjects)
                .onHoldProjects((int) onHoldProjects)
                .completedProjects((int) completedProjects)
                .lastRefreshed(seedService.getLastSeededAt())
                .build();

        List<ReportMetaDto> reports = List.of(
                buildEnrichedMeta(
                        ReportConstants.USERS_ID,
                        ReportConstants.USERS_NAME,
                        ReportConstants.USERS_DESCRIPTION,
                        ReportConstants.USERS_ICON,
                        ReportConstants.CATEGORY_PEOPLE,
                        userCount,
                        List.of(
                                highlight("active", String.valueOf(activeUsers)),
                                highlight("inactive", String.valueOf(inactiveUsers)))),
                buildEnrichedMeta(
                        ReportConstants.DEPARTMENTS_ID,
                        ReportConstants.DEPARTMENTS_NAME,
                        ReportConstants.DEPARTMENTS_DESCRIPTION,
                        ReportConstants.DEPARTMENTS_ICON,
                        ReportConstants.CATEGORY_ORGANIZATION,
                        departmentCount,
                        List.of(
                                highlight("employees", String.valueOf(totalEmployees)),
                                highlight("locations", String.valueOf(uniqueLocations)))),
                buildEnrichedMeta(
                        ReportConstants.PROJECTS_ID,
                        ReportConstants.PROJECTS_NAME,
                        ReportConstants.PROJECTS_DESCRIPTION,
                        ReportConstants.PROJECTS_ICON,
                        ReportConstants.CATEGORY_PROJECTS,
                        projectCount,
                        List.of(
                                highlight("active", String.valueOf(activeProjects)),
                                highlight("completed", String.valueOf(completedProjects)))));

        return DashboardDto.builder()
                .summary(summary)
                .reports(reports)
                .build();
    }

    private ReportMetaDto buildEnrichedMeta(
            String id,
            String name,
            String description,
            String icon,
            String category,
            long rowCount,
            List<ReportHighlightDto> highlights) {
        return ReportMetaDto.builder()
                .id(id)
                .name(name)
                .description(description)
                .lastUpdated(seedService.getLastSeededAt())
                .rowCount((int) rowCount)
                .icon(icon)
                .category(category)
                .highlights(highlights)
                .build();
    }

    private ReportHighlightDto highlight(String label, String value) {
        return ReportHighlightDto.builder()
                .label(label)
                .value(value)
                .build();
    }
}

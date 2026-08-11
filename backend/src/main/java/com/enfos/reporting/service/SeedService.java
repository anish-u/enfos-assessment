package com.enfos.reporting.service;

import com.enfos.reporting.config.ReportConstants;
import com.enfos.reporting.entity.Department;
import com.enfos.reporting.entity.Project;
import com.enfos.reporting.entity.User;
import com.enfos.reporting.repository.DepartmentRepository;
import com.enfos.reporting.repository.ProjectRepository;
import com.enfos.reporting.repository.UserRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class SeedService {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final ProjectRepository projectRepository;

    @Getter
    private LocalDateTime lastSeededAt;

    @Transactional
    public void seedIfEmpty() {
        if (userRepository.count() == 0
                && departmentRepository.count() == 0
                && projectRepository.count() == 0) {
            reseed();
        } else {
            lastSeededAt = LocalDateTime.now();
        }
    }

    @Transactional
    public void reseed() {
        log.info("Re-seeding database");
        projectRepository.deleteAll();
        departmentRepository.deleteAll();
        userRepository.deleteAll();

        departmentRepository.saveAll(buildDepartments());
        userRepository.saveAll(buildUsers());
        projectRepository.saveAll(buildProjects());

        lastSeededAt = LocalDateTime.now();
        log.info("Database seeded successfully");
    }

    private List<Department> buildDepartments() {
        return List.of(
                Department.builder()
                        .departmentName("Engineering")
                        .manager("Sarah Chen")
                        .employeeCount(42)
                        .location("San Francisco, CA")
                        .build(),
                Department.builder()
                        .departmentName("Marketing")
                        .manager("James Wilson")
                        .employeeCount(18)
                        .location("Austin, TX")
                        .build(),
                Department.builder()
                        .departmentName("Sales")
                        .manager("Maria Gonzalez")
                        .employeeCount(27)
                        .location("Chicago, IL")
                        .build(),
                Department.builder()
                        .departmentName("HR")
                        .manager("David Kim")
                        .employeeCount(9)
                        .location("Denver, CO")
                        .build(),
                Department.builder()
                        .departmentName("Finance")
                        .manager("Emily Patel")
                        .employeeCount(14)
                        .location("New York, NY")
                        .build(),
                Department.builder()
                        .departmentName("Operations")
                        .manager("Robert Taylor")
                        .employeeCount(21)
                        .location("Seattle, WA")
                        .build());
    }

    private List<User> buildUsers() {
        return List.of(
                User.builder()
                        .name("Sarah Chen")
                        .email("sarah.chen@enfos.com")
                        .role(ReportConstants.ROLE_ADMIN)
                        .status(ReportConstants.STATUS_ACTIVE)
                        .createdDate(LocalDateTime.of(2023, 1, 15, 9, 0))
                        .build(),
                User.builder()
                        .name("James Wilson")
                        .email("james.wilson@enfos.com")
                        .role(ReportConstants.ROLE_MANAGER)
                        .status(ReportConstants.STATUS_ACTIVE)
                        .createdDate(LocalDateTime.of(2023, 2, 10, 10, 30))
                        .build(),
                User.builder()
                        .name("Maria Gonzalez")
                        .email("maria.gonzalez@enfos.com")
                        .role(ReportConstants.ROLE_MANAGER)
                        .status(ReportConstants.STATUS_ACTIVE)
                        .createdDate(LocalDateTime.of(2023, 3, 5, 14, 15))
                        .build(),
                User.builder()
                        .name("David Kim")
                        .email("david.kim@enfos.com")
                        .role(ReportConstants.ROLE_MANAGER)
                        .status(ReportConstants.STATUS_ACTIVE)
                        .createdDate(LocalDateTime.of(2023, 4, 20, 11, 0))
                        .build(),
                User.builder()
                        .name("Emily Patel")
                        .email("emily.patel@enfos.com")
                        .role(ReportConstants.ROLE_ANALYST)
                        .status(ReportConstants.STATUS_ACTIVE)
                        .createdDate(LocalDateTime.of(2023, 5, 8, 8, 45))
                        .build(),
                User.builder()
                        .name("Robert Taylor")
                        .email("robert.taylor@enfos.com")
                        .role(ReportConstants.ROLE_MANAGER)
                        .status(ReportConstants.STATUS_ACTIVE)
                        .createdDate(LocalDateTime.of(2023, 6, 12, 16, 20))
                        .build(),
                User.builder()
                        .name("Alex Rivera")
                        .email("alex.rivera@enfos.com")
                        .role(ReportConstants.ROLE_DEVELOPER)
                        .status(ReportConstants.STATUS_ACTIVE)
                        .createdDate(LocalDateTime.of(2023, 7, 3, 9, 30))
                        .build(),
                User.builder()
                        .name("Priya Sharma")
                        .email("priya.sharma@enfos.com")
                        .role(ReportConstants.ROLE_DEVELOPER)
                        .status(ReportConstants.STATUS_ACTIVE)
                        .createdDate(LocalDateTime.of(2023, 8, 17, 13, 0))
                        .build(),
                User.builder()
                        .name("Michael O'Brien")
                        .email("michael.obrien@enfos.com")
                        .role(ReportConstants.ROLE_DEVELOPER)
                        .status(ReportConstants.STATUS_INACTIVE)
                        .createdDate(LocalDateTime.of(2023, 9, 22, 10, 15))
                        .build(),
                User.builder()
                        .name("Lisa Nguyen")
                        .email("lisa.nguyen@enfos.com")
                        .role(ReportConstants.ROLE_DESIGNER)
                        .status(ReportConstants.STATUS_ACTIVE)
                        .createdDate(LocalDateTime.of(2023, 10, 5, 15, 45))
                        .build(),
                User.builder()
                        .name("Chris Anderson")
                        .email("chris.anderson@enfos.com")
                        .role(ReportConstants.ROLE_ANALYST)
                        .status(ReportConstants.STATUS_ACTIVE)
                        .createdDate(LocalDateTime.of(2024, 1, 11, 9, 0))
                        .build(),
                User.builder()
                        .name("Jennifer Brooks")
                        .email("jennifer.brooks@enfos.com")
                        .role(ReportConstants.ROLE_DESIGNER)
                        .status(ReportConstants.STATUS_INACTIVE)
                        .createdDate(LocalDateTime.of(2024, 2, 28, 11, 30))
                        .build(),
                User.builder()
                        .name("Kevin Martinez")
                        .email("kevin.martinez@enfos.com")
                        .role(ReportConstants.ROLE_DEVELOPER)
                        .status(ReportConstants.STATUS_ACTIVE)
                        .createdDate(LocalDateTime.of(2024, 4, 15, 14, 0))
                        .build(),
                User.builder()
                        .name("Amanda Foster")
                        .email("amanda.foster@enfos.com")
                        .role(ReportConstants.ROLE_ANALYST)
                        .status(ReportConstants.STATUS_INACTIVE)
                        .createdDate(LocalDateTime.of(2024, 6, 3, 8, 30))
                        .build());
    }

    private List<Project> buildProjects() {
        return List.of(
                Project.builder()
                        .projectName("Customer Portal Redesign")
                        .department("Engineering")
                        .owner("Alex Rivera")
                        .status(ReportConstants.PROJECT_STATUS_ACTIVE)
                        .startDate(LocalDate.of(2024, 3, 1))
                        .endDate(null)
                        .build(),
                Project.builder()
                        .projectName("Q4 Marketing Campaign")
                        .department("Marketing")
                        .owner("James Wilson")
                        .status(ReportConstants.PROJECT_STATUS_COMPLETED)
                        .startDate(LocalDate.of(2024, 9, 1))
                        .endDate(LocalDate.of(2024, 12, 31))
                        .build(),
                Project.builder()
                        .projectName("Enterprise Sales Pipeline")
                        .department("Sales")
                        .owner("Maria Gonzalez")
                        .status(ReportConstants.PROJECT_STATUS_ACTIVE)
                        .startDate(LocalDate.of(2024, 6, 15))
                        .endDate(null)
                        .build(),
                Project.builder()
                        .projectName("Employee Onboarding Revamp")
                        .department("HR")
                        .owner("David Kim")
                        .status(ReportConstants.PROJECT_STATUS_ON_HOLD)
                        .startDate(LocalDate.of(2024, 1, 10))
                        .endDate(null)
                        .build(),
                Project.builder()
                        .projectName("Annual Budget Planning")
                        .department("Finance")
                        .owner("Emily Patel")
                        .status(ReportConstants.PROJECT_STATUS_COMPLETED)
                        .startDate(LocalDate.of(2024, 10, 1))
                        .endDate(LocalDate.of(2024, 11, 30))
                        .build(),
                Project.builder()
                        .projectName("Warehouse Automation")
                        .department("Operations")
                        .owner("Robert Taylor")
                        .status(ReportConstants.PROJECT_STATUS_ACTIVE)
                        .startDate(LocalDate.of(2024, 5, 20))
                        .endDate(null)
                        .build(),
                Project.builder()
                        .projectName("Mobile App v2")
                        .department("Engineering")
                        .owner("Priya Sharma")
                        .status(ReportConstants.PROJECT_STATUS_COMPLETED)
                        .startDate(LocalDate.of(2023, 8, 1))
                        .endDate(LocalDate.of(2024, 2, 28))
                        .build(),
                Project.builder()
                        .projectName("Brand Identity Refresh")
                        .department("Marketing")
                        .owner("Lisa Nguyen")
                        .status(ReportConstants.PROJECT_STATUS_ON_HOLD)
                        .startDate(LocalDate.of(2024, 7, 1))
                        .endDate(null)
                        .build(),
                Project.builder()
                        .projectName("Compliance Audit 2024")
                        .department("Finance")
                        .owner("Chris Anderson")
                        .status(ReportConstants.PROJECT_STATUS_COMPLETED)
                        .startDate(LocalDate.of(2024, 4, 1))
                        .endDate(LocalDate.of(2024, 6, 30))
                        .build());
    }
}

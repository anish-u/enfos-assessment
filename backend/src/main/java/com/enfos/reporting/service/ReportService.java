package com.enfos.reporting.service;

import com.enfos.reporting.config.ReportConstants;
import com.enfos.reporting.dto.ColumnDto;
import com.enfos.reporting.dto.ReportDetailDto;
import com.enfos.reporting.dto.ReportMetaDto;
import com.enfos.reporting.entity.Department;
import com.enfos.reporting.entity.Project;
import com.enfos.reporting.entity.User;
import com.enfos.reporting.repository.DepartmentRepository;
import com.enfos.reporting.repository.ProjectRepository;
import com.enfos.reporting.repository.UserRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportService {

    private static final List<ColumnDto> USER_COLUMNS = List.of(
            ColumnDto.builder().key("userId").label("User ID").type("number").build(),
            ColumnDto.builder().key("name").label("Name").type("string").build(),
            ColumnDto.builder().key("email").label("Email").type("string").build(),
            ColumnDto.builder().key("role").label("Role").type("string").build(),
            ColumnDto.builder().key("status").label("Status").type("status").build(),
            ColumnDto.builder().key("createdDate").label("Created Date").type("date").build());

    private static final List<ColumnDto> DEPARTMENT_COLUMNS = List.of(
            ColumnDto.builder().key("departmentId").label("Department ID").type("number").build(),
            ColumnDto.builder().key("departmentName").label("Department Name").type("string").build(),
            ColumnDto.builder().key("manager").label("Manager").type("string").build(),
            ColumnDto.builder().key("employeeCount").label("Employee Count").type("number").build(),
            ColumnDto.builder().key("location").label("Location").type("string").build());

    private static final List<ColumnDto> PROJECT_COLUMNS = List.of(
            ColumnDto.builder().key("projectId").label("Project ID").type("number").build(),
            ColumnDto.builder().key("projectName").label("Project Name").type("string").build(),
            ColumnDto.builder().key("department").label("Department").type("string").build(),
            ColumnDto.builder().key("owner").label("Owner").type("string").build(),
            ColumnDto.builder().key("status").label("Status").type("status").build(),
            ColumnDto.builder().key("startDate").label("Start Date").type("date").build(),
            ColumnDto.builder().key("endDate").label("End Date").type("date").build());

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final ProjectRepository projectRepository;
    private final SeedService seedService;

    public List<ReportMetaDto> listReports() {
        return List.of(
                buildListMeta(
                        ReportConstants.USERS_ID,
                        ReportConstants.USERS_NAME,
                        ReportConstants.USERS_DESCRIPTION,
                        ReportConstants.USERS_ICON,
                        userRepository.count()),
                buildListMeta(
                        ReportConstants.DEPARTMENTS_ID,
                        ReportConstants.DEPARTMENTS_NAME,
                        ReportConstants.DEPARTMENTS_DESCRIPTION,
                        ReportConstants.DEPARTMENTS_ICON,
                        departmentRepository.count()),
                buildListMeta(
                        ReportConstants.PROJECTS_ID,
                        ReportConstants.PROJECTS_NAME,
                        ReportConstants.PROJECTS_DESCRIPTION,
                        ReportConstants.PROJECTS_ICON,
                        projectRepository.count()));
    }

    public ReportDetailDto getUsersReport() {
        List<User> users = userRepository.findAll();
        return ReportDetailDto.builder()
                .meta(buildDetailMeta(
                        ReportConstants.USERS_ID,
                        ReportConstants.USERS_NAME,
                        ReportConstants.USERS_DESCRIPTION,
                        users.size()))
                .columns(USER_COLUMNS)
                .rows(users.stream().map(this::toUserRow).toList())
                .build();
    }

    public ReportDetailDto getDepartmentsReport() {
        List<Department> departments = departmentRepository.findAll();
        return ReportDetailDto.builder()
                .meta(buildDetailMeta(
                        ReportConstants.DEPARTMENTS_ID,
                        ReportConstants.DEPARTMENTS_NAME,
                        ReportConstants.DEPARTMENTS_DESCRIPTION,
                        departments.size()))
                .columns(DEPARTMENT_COLUMNS)
                .rows(departments.stream().map(this::toDepartmentRow).toList())
                .build();
    }

    public ReportDetailDto getProjectsReport() {
        List<Project> projects = projectRepository.findAll();
        return ReportDetailDto.builder()
                .meta(buildDetailMeta(
                        ReportConstants.PROJECTS_ID,
                        ReportConstants.PROJECTS_NAME,
                        ReportConstants.PROJECTS_DESCRIPTION,
                        projects.size()))
                .columns(PROJECT_COLUMNS)
                .rows(projects.stream().map(this::toProjectRow).toList())
                .build();
    }

    private ReportMetaDto buildListMeta(
            String id, String name, String description, String icon, long rowCount) {
        return ReportMetaDto.builder()
                .id(id)
                .name(name)
                .description(description)
                .lastUpdated(seedService.getLastSeededAt())
                .rowCount((int) rowCount)
                .icon(icon)
                .build();
    }

    private ReportMetaDto buildDetailMeta(String id, String name, String description, int rowCount) {
        return ReportMetaDto.builder()
                .id(id)
                .name(name)
                .description(description)
                .lastUpdated(seedService.getLastSeededAt())
                .rowCount(rowCount)
                .build();
    }

    private Map<String, Object> toUserRow(User user) {
        Map<String, Object> row = new HashMap<>();
        row.put("userId", user.getUserId());
        row.put("name", user.getName());
        row.put("email", user.getEmail());
        row.put("role", user.getRole());
        row.put("status", user.getStatus());
        row.put("createdDate", user.getCreatedDate());
        return row;
    }

    private Map<String, Object> toDepartmentRow(Department department) {
        Map<String, Object> row = new HashMap<>();
        row.put("departmentId", department.getDepartmentId());
        row.put("departmentName", department.getDepartmentName());
        row.put("manager", department.getManager());
        row.put("employeeCount", department.getEmployeeCount());
        row.put("location", department.getLocation());
        return row;
    }

    private Map<String, Object> toProjectRow(Project project) {
        Map<String, Object> row = new HashMap<>();
        row.put("projectId", project.getProjectId());
        row.put("projectName", project.getProjectName());
        row.put("department", project.getDepartment());
        row.put("owner", project.getOwner());
        row.put("status", project.getStatus());
        row.put("startDate", project.getStartDate());
        row.put("endDate", project.getEndDate());
        return row;
    }
}

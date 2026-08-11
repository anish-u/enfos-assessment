package com.enfos.reporting.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PortalSummaryDto {

    private Integer totalRecords;
    private Integer activeUsers;
    private Integer inactiveUsers;
    private Integer totalEmployees;
    private Integer activeProjects;
    private Integer onHoldProjects;
    private Integer completedProjects;
    private LocalDateTime lastRefreshed;
}

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
public class ReportMetaDto {

    private String id;
    private String name;
    private String description;
    private LocalDateTime lastUpdated;
    private Integer rowCount;
    private String icon;
    private String category;
    private List<ReportHighlightDto> highlights;
}

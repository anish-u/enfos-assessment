package com.enfos.reporting.dto;

import java.util.List;
import java.util.Map;
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
public class ReportDetailDto {

    private ReportMetaDto meta;
    private List<ColumnDto> columns;
    private List<Map<String, Object>> rows;
}

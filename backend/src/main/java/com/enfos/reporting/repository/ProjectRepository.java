package com.enfos.reporting.repository;

import com.enfos.reporting.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    long countByStatus(String status);
}

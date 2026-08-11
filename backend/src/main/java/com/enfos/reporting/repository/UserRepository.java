package com.enfos.reporting.repository;

import com.enfos.reporting.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    long countByStatus(String status);
}

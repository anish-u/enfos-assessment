package com.enfos.reporting.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.enfos.reporting.repository.DepartmentRepository;
import com.enfos.reporting.repository.ProjectRepository;
import com.enfos.reporting.repository.UserRepository;
import java.time.LocalDateTime;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class SeedServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private DepartmentRepository departmentRepository;

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private SeedService seedService;

    @Test
    void seedIfEmpty_setsLastSeededAtWhenDataAlreadyExists() {
        when(userRepository.count()).thenReturn(5L);

        seedService.seedIfEmpty();

        assertThat(seedService.getLastSeededAt()).isNotNull();
        verify(userRepository, never()).deleteAll();
    }

    @Test
    void reseed_setsLastSeededAt() {
        seedService.reseed();

        assertThat(seedService.getLastSeededAt()).isNotNull();
        assertThat(seedService.getLastSeededAt()).isBeforeOrEqualTo(LocalDateTime.now());
    }
}

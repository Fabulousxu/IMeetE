package com.example.imeete.service;

import com.example.imeete.dao.UserRepository;
import com.example.imeete.entity.User;
import com.example.imeete.service.impl.MatchServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.concurrent.CompletableFuture;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class MatchServiceTest {
    @MockBean
    private UserRepository userRepository;

    @InjectMocks
    private MatchServiceImpl matchService;

    private User testUser;

    @BeforeEach
    public void setup() {
        matchService = Mockito.mock(MatchServiceImpl.class);
        testUser = new User();
        testUser.setUserId("testId");
        testUser.setMbti("INTJ");
        testUser.setSex(1);
    }

    @Test
    public void testMatchUser() throws Exception {
        when(matchService.matchUser(any(String.class), any(String.class), any(Integer.class)))
                .thenReturn(CompletableFuture.completedFuture(testUser));

        CompletableFuture<User> result = matchService.matchUser("testId", "INTJ", 1);
        assertNotNull(result.get());
        assertEquals("testId", result.get().getUserId());
        assertEquals("INTJ", result.get().getMbti());
        assertEquals(1, result.get().getSex());
    }
}

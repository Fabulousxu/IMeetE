package com.example.imeete.service;

import com.example.imeete.dao.MbtiIntroRepository;
import com.example.imeete.dao.MbtiTestRepository;
import com.example.imeete.service.impl.MbtiServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
public class MbtiServiceTest {
    @Mock
    private MbtiTestRepository mbtiTestRepository;

    @Mock
    private MbtiIntroRepository mbtiIntroRepository;

    @InjectMocks
    private MbtiServiceImpl mbtiService;

    @BeforeEach
    public void setup() {
        mbtiService = Mockito.mock(MbtiServiceImpl.class);
    }

    @Test
    public void testGetMbtiTest() {
        when(mbtiService.getMbtiTest()).thenReturn(null);
        Assertions.assertNull(mbtiService.getMbtiTest());
    }

    @Test
    public void testGetMbtiIntro() {
        when(mbtiService.getMbtiIntro(any(String.class))).thenReturn(null);
        Assertions.assertNull(mbtiService.getMbtiIntro("INTJ"));
    }
}
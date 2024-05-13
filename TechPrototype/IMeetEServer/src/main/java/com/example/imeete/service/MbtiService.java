package com.example.imeete.service;

import java.util.Set;
import org.springframework.stereotype.Service;

@Service
public interface MbtiService {
  Set<String> getMbtiSet(String mbti);
}

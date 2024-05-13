package com.example.imeete.service.impl;

import com.example.imeete.service.MbtiService;
import java.util.HashSet;
import java.util.Set;
import org.springframework.stereotype.Service;

@Service
public class MbtiServiceImpl implements MbtiService {
  private static final Set<String> mbti = new HashSet<>();

  static {
    mbti.add("ISTJ");
    mbti.add("ISFJ");
    mbti.add("INFJ");
    mbti.add("INTJ");
    mbti.add("ISTP");
    mbti.add("ISFP");
    mbti.add("INFP");
    mbti.add("INTP");
    mbti.add("ESTP");
    mbti.add("ESFP");
    mbti.add("ENFP");
    mbti.add("ENTP");
    mbti.add("ESTJ");
    mbti.add("ESFJ");
    mbti.add("ENFJ");
    mbti.add("ENTJ");
  }

  public Set<String> getMbtiSet(String mbti) {
    Set<String> set = new HashSet<>();
    if (mbti.equals("NONE")) return set;
    if (mbti.length() == 4) {
      for (String entry : MbtiServiceImpl.mbti)
        if (entry.contains(mbti.substring(0, 1))
            && entry.contains(mbti.substring(1, 2))
            && entry.contains(mbti.substring(2, 3))
            && entry.contains(mbti.substring(3, 4))) set.add(entry);
    } else if (mbti.length() == 3) {
      for (String entry : MbtiServiceImpl.mbti)
        if (entry.contains(mbti.substring(0, 1))
            && entry.contains(mbti.substring(1, 2))
            && entry.contains(mbti.substring(2, 3))) set.add(entry);
    } else if (mbti.length() == 2) {
      for (String entry : MbtiServiceImpl.mbti)
        if (entry.contains(mbti.substring(0, 1)) && entry.contains(mbti.substring(1, 2)))
          set.add(entry);
    } else for (String entry : MbtiServiceImpl.mbti) if (entry.contains(mbti)) set.add(entry);
    return set;
  }
}

package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.MbtiIntroRepository;
import com.example.imeete.dao.MbtiTestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mbti")
@CrossOrigin
public class MbtiController {
  @Autowired private MbtiTestRepository mbtiTestRepository;
  @Autowired private MbtiIntroRepository mbtiIntroRepository;

  @GetMapping("/test")
  public String getMbtiTest() {
    System.out.println("getMBTI_Test");

    JSONObject res = new JSONObject();
    // 从数据库中读取MBTI_Test表的所有数据
    res.put("ok", true);
    res.put("data", mbtiTestRepository.findAll());

    System.out.println(res.toJSONString());

    return res.toJSONString();
  }

  @GetMapping("/intro")
  public String getMbtiIntro(String mbtiType) {
    System.out.println("getMBTI_Intro");

    JSONObject res = new JSONObject();
    // 从数据库中读取MBTI_Intro表的数据
    res.put("ok", true);
    // 根据mbti_type查找
    res.put("data", mbtiIntroRepository.findById(mbtiType).orElse(null));

    System.out.println(res.toJSONString());

    return res.toJSONString();
  }
}

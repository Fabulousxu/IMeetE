package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.MBTIIntroRepository;
import com.example.imeete.dao.MBTITestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mbti")
@CrossOrigin
public class MBTIController {
  @Autowired
  private MBTITestRepository mbtiTestRepository;
  @Autowired
  private MBTIIntroRepository mbtiIntroRepository;

  @GetMapping("/test")
  public String getMBTITest() {
    System.out.println("getMBTI_Test");

    JSONObject res = new JSONObject();
    // 从数据库中读取MBTI_Test表的所有数据
    res.put("ok", true);
    res.put("data", mbtiTestRepository.findAll());

    System.out.println(res.toJSONString());

    return res.toJSONString();
  }

  @GetMapping("/intro")
  public String getMBTIIntro(@RequestParam("mbtiType") String type) {
    System.out.println("getMBTI_Intro");

    JSONObject res = new JSONObject();
    // 从数据库中读取MBTI_Intro表的数据
    res.put("ok", true);
    // 根据mbti_type查找
    res.put("data", mbtiIntroRepository.findById(type).orElse(null));

    System.out.println(res.toJSONString());

    return res.toJSONString();
  }
}

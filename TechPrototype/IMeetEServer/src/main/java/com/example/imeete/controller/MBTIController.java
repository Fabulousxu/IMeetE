package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.MBTI_TestRepository;
import com.example.imeete.dao.MBTI_IntroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class MBTIController {
    @Autowired
    private MBTI_TestRepository mbti_testRepository;
    @Autowired
    private MBTI_IntroRepository mbti_introRepository;

    @GetMapping("/mbti_test")
    public String getMBTI_Test() {
        System.out.println("getMBTI_Test");

        JSONObject res = new JSONObject();
        // 从数据库中读取MBTI_Test表的所有数据
        res.put("ok", true);
        res.put("data", mbti_testRepository.findAll());

        System.out.println(res.toJSONString());

        return res.toJSONString();
    }
    @GetMapping("/mbti_intro")
    public String getMBTI_Intro(@RequestParam("mbtiType") String type) {
        System.out.println("getMBTI_Intro");

        JSONObject res = new JSONObject();
        // 从数据库中读取MBTI_Intro表的数据
        res.put("ok", true);
        // 不根据逐渐查找，而是根据mbti_type查找
        res.put("data", mbti_introRepository.findById(type).orElse(null));

        System.out.println(res.toJSONString());

        return res.toJSONString();
    }
}

package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.UserRepository;
import com.example.imeete.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user")
    public JSONObject getUserInfo(@RequestParam("id") String userid) {
        System.out.println("userid: " + userid);

        User user = userRepository.findById(userid).orElse(null);
        JSONObject res = new JSONObject();
        if (user == null) {
            res.put("ok", false);
            res.put("data", "账号不存在");
        } else {
            res.put("ok", true);
            JSONObject data = new JSONObject();
            data.put("id", user.id);
            data.put("nickname", user.nickname);
            data.put("mbti", user.mbti);
            data.put("area", user.area);
            data.put("sex", user.sex);
            data.put("age", user.age);
            data.put("intro", user.intro);
            data.put("avatar", user.avatar);
            data.put("followCount", user.followCount);
            data.put("followerCount", user.followerCount);
            res.put("data", data);
        }
        return res;
    }
}


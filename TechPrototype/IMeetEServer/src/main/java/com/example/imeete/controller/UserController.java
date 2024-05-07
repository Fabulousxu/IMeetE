package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.UserRepository;
import com.example.imeete.entity.User;
import com.example.imeete.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserController {
  @Autowired private UserService userService;

  @GetMapping("/user")
  public JSONObject getUserInfo(@RequestParam("id") String userId) {
    JSONObject res = new JSONObject();
    JSONObject data = userService.getUserInfoJson(userId);
    if (data == null) {
      res.put("ok", false);
      res.put("message", "用户不存在");
    } else {
      res.put("ok", true);
      res.put("message", "获取用户信息成功");
      res.put("data", data);
    }
    return res;
  }

  @GetMapping("/user/self")
  public JSONObject getSelfInfo(@CookieValue("id") String userId) {
    return userService.getUserInfoJson(userId);
  }
}

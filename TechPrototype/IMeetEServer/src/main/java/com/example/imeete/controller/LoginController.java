package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.service.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
public class LoginController {

  @PostMapping("/login")
  public JSONObject login(@RequestBody JSONObject param) {
    JSONObject res = new JSONObject();
    String userid = param.getString("userid");
    String password = param.getString("password");
    User user = User.getUser(userid);
    if (user == null) {
      res.put("ok", false);
      res.put("state", "账号不存在");
      return res;
    } else if (!user.password.equals(password)) {
      res.put("ok", false);
      res.put("state", "密码错误");
      return res;
    } else {
      res.put("ok", true);
      res.put("state", "登录成功");
      Random random = new Random();
      user.check = random.nextInt();
      res.put("check", user.check);
      return res;
    }
  }

}

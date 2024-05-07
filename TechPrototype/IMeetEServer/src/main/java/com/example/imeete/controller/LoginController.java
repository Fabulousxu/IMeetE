package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.AccountRepository;
import com.example.imeete.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class LoginController {
  @Autowired
  private AccountRepository accountRepository;

  @PostMapping("/login")
  public JSONObject login(@RequestBody JSONObject param) {
    JSONObject res = new JSONObject();
    String userid = param.getString("id");
    String password = param.getString("password");
    Account user = accountRepository.findById(userid).orElse(null);
    if (user == null) {
      res.put("ok", false);
      res.put("message", "账号不存在");
    } else if (!user.password.equals(password)) {
      res.put("ok", false);
      res.put("message", "密码错误");
    } else {
      res.put("ok", true);
      res.put("message", "登录成功");
    }
    return res;
  }
}

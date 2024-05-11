package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.AccountRepository;
import com.example.imeete.entity.Account;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class LoginController {
  @Autowired private AccountRepository accountRepository;
  @Autowired private HttpServletResponse response;

  @PostMapping("/login")
  public JSONObject login(@RequestBody JSONObject param) {
    JSONObject res = new JSONObject();
    Account account = accountRepository.findById(param.getString("id")).orElse(null);
    if (account == null) {
      res.put("ok", false);
      res.put("message", "账号不存在");
    } else if (!account.getPassword().equals(param.getString("password"))) {
      res.put("ok", false);
      res.put("message", "密码错误");
    } else {
      response.addCookie(new Cookie("userId", account.getUserId()));
      res.put("ok", true);
      res.put("message", "登录成功");
    }
    return res;
  }
}

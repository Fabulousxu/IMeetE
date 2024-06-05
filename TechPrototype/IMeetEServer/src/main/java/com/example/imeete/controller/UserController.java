package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.service.UserService;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
  @Autowired private UserService userService;

  @GetMapping
  public JSONObject getUserInfo(String id) {
    return userService.getUserInfo(id);
  }

  @GetMapping("/self")
  public JSONObject getSelfInfo(@CookieValue("userId") String userId) throws IOException {
    return userService.getSelfInfo(userId);
  }

  @GetMapping("/post")
  public JSONObject getUserPosts(String id, @CookieValue("userId") String userId) {
    return userService.getUserPosts(id, userId);
  }

  @GetMapping("/self/post")
  public JSONArray getSelfPosts(@CookieValue("userId") String userId) throws IOException {
    return userService.getSelfPosts(userId);
  }

  @GetMapping("/collect")
  public JSONObject getUserCollect(String id, @CookieValue("userId") String userId) {
    return userService.getUserCollects(id, userId);
  }

  @GetMapping("/self/collect")
  public JSONArray getSelfCollect(@CookieValue("userId") String userId) throws IOException {
    return userService.getSelfCollects(userId);
  }
}

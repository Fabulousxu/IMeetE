package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONArray;
import com.example.imeete.entity.Post;
import com.example.imeete.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/square")
@CrossOrigin
public class SquareController {
  @Autowired private PostService postService;

  @GetMapping
  public JSONArray getPost(
      String type, String category, int lastPostId, @CookieValue("userId") String userId) {
    JSONArray res = new JSONArray();
    for (Post post : postService.getPost(type, category, lastPostId))
      res.add(postService.toJson(post, userId));
    return res;
  }
}

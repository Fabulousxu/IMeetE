package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.PostRepository;
import com.example.imeete.dao.UserRepository;
import com.example.imeete.entity.Post;
import com.example.imeete.entity.User;
import com.example.imeete.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/square")
@CrossOrigin
public class SquareController {
  @Autowired private PostService postService;
  @Autowired private PostRepository postRepository;
  @Autowired private UserRepository userRepository;

  @GetMapping
  public JSONArray getPost(
      @RequestParam("type") String type,
      @RequestParam("category") String category,
      @RequestParam("lastPostId") int lastPostId,
      @SessionAttribute("userId") String userId) {
    JSONArray res = new JSONArray();
    for (Post post : postService.getPost(type, category, lastPostId))
      res.add(postService.toJson(post, userId));
    return res;
  }

  @GetMapping("/post-detail")
  public JSONObject getPostById(
      @RequestParam("postId") int postId, @SessionAttribute("userId") String userId) {
    JSONObject post = new JSONObject();

    System.out.println(postId);
    Post p = postRepository.findById(postId).orElse(null);
    if (p != null) {
      post.put("postData", p);
      User user = userRepository.findById(p.getUserId()).get();
      post.put("poster", user);
      post.put("ok", true);
      // 需要获取评论
    } else {
      post.put("ok", false);
    }
    return post;
  }
}

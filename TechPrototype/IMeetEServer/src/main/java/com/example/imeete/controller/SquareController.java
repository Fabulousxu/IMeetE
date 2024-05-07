package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.PostRepository;
import com.example.imeete.dao.UserRepository;
import com.example.imeete.entity.Post;
import com.example.imeete.entity.User;
import com.example.imeete.service.impl.PostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/square")
public class SquareController {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PostRepository postRepository;

  @Autowired
  private PostServiceImpl postService;

  @GetMapping
  public JSONArray getPost(@RequestParam("type") String type,
                           @RequestParam("category") String category,
                           @RequestParam("lastpost") int lastpost) {
    JSONArray res = new JSONArray();
    List<Post> posts = postService.getPost(type, category, lastpost);
    for (Post p : posts) {
      JSONObject post = new JSONObject();
      post.put("id", p.id);
      post.put("title", p.title);
      post.put("time", p.time);
      post.put("content", p.content);
      post.put("cover", "");
      post.put("watch", p.watch);
      post.put("like", p.like);
      post.put("collect", p.collect);
      post.put("share", p.share);
      User user = userRepository.findById(p.userId).get();
      JSONObject userJson = new JSONObject();
      userJson.put("id", user.id);
      userJson.put("nickname", user.nickname);
      userJson.put("photo", "");
      userJson.put("mbti", user.mbti);
      post.put("user", userJson);
      res.add(post);
    }
    return res;
  }
}

package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.UserRepository;
import com.example.imeete.entity.Post;
import com.example.imeete.entity.User;
import com.example.imeete.service.impl.PostServiceImpl;
import java.text.SimpleDateFormat;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/square")
@CrossOrigin
public class SquareController {
  @Autowired private UserRepository userRepository;
  @Autowired private PostServiceImpl postService;

  @GetMapping
  public JSONArray getPost(
      @RequestParam("type") String type,
      @RequestParam("category") String category,
      @RequestParam("lastPostId") int lastPostId,
      @CookieValue("userId") String userId) {
    JSONArray res = new JSONArray();
    List<Post> posts = postService.getPost(type, category, lastPostId);
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    for (Post p : posts) {
      User user = userRepository.findById(p.getUserId()).get();
      JSONObject userJson = new JSONObject();
      userJson.put("id", user.getId());
      userJson.put("nickname", user.getNickname());
      userJson.put("avatar", user.getAvatar());
      userJson.put("mbti", user.getMbti());
      JSONObject post = new JSONObject();
      post.put("id", p.getId());
      post.put("user", userJson);
      post.put("time", dateFormat.format(p.getTime()));
      post.put("title", p.getTitle());
      post.put("cover", p.getCover());
      post.put("content", p.getContent());
      post.put("watchCount", p.getWatchCount());
      post.put("likeCount", p.getLikeCount());
      post.put("collectCount", p.getCollectCount());
      post.put("shareCount", p.getShareCount());
      post.put("commentCount", p.getCommentCount());
      res.add(post);
    }
    return res;
  }
}

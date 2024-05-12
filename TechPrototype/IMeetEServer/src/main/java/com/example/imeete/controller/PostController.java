package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.CollectRepository;
import com.example.imeete.dao.LikeRepository;
import com.example.imeete.entity.*;
import com.example.imeete.entity.idclass.CollectId;
import com.example.imeete.entity.idclass.LikeId;
import com.example.imeete.service.CommentService;
import com.example.imeete.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post")
@CrossOrigin
public class PostController {
  @Autowired private PostService postService;
  @Autowired private CommentService commentService;
  @Autowired private LikeRepository likeRepository;
  @Autowired private CollectRepository collectRepository;

  @GetMapping
  public JSONObject getPost(int id, @CookieValue("userId") String userId) {
    return postService.toJson(id, userId);
  }

  @GetMapping("/comment")
  public JSONArray getComment(
      int postId, long lastCommentId, @CookieValue("userId") String userId) {
    JSONArray res = new JSONArray();
    for (Comment comment : postService.getComment(postId, lastCommentId))
      if (comment != null) res.add(commentService.toJson(comment, userId));
    return res;
  }

  @PostMapping("/like")
  public JSONObject like(@RequestBody JSONObject param, @CookieValue("userId") String userId) {
    JSONObject res = new JSONObject();
    int postId = param.getIntValue("id");
    if (!likeRepository.existsById(new LikeId(userId, postId))) {
      likeRepository.save(new Like(userId, postId));
      res.put("ok", true);
      res.put("message", "点赞成功");
    } else {
      res.put("ok", false);
      res.put("message", "帖子已点赞");
    }
    return res;
  }

  @PostMapping("/dislike")
  public JSONObject dislike(@RequestBody JSONObject param, @CookieValue("userId") String userId) {
    JSONObject res = new JSONObject();
    LikeId likeId = new LikeId(userId, param.getIntValue("id"));
    if (likeRepository.existsById(likeId)) {
      likeRepository.deleteById(likeId);
      res.put("ok", true);
      res.put("message", "取消点赞成功");
    } else {
      res.put("ok", false);
      res.put("message", "帖子未点赞");
    }
    return res;
  }

  @PostMapping("/collect")
  public JSONObject collect(@RequestBody JSONObject param, @CookieValue("userId") String userId) {
    JSONObject res = new JSONObject();
    int postId = param.getIntValue("id");
    if (!collectRepository.existsById(new CollectId(userId, postId))) {
      collectRepository.save(new Collect(userId, postId));
      res.put("ok", true);
      res.put("message", "收藏成功");
    } else {
      res.put("ok", false);
      res.put("message", "帖子已收藏");
    }
    return res;
  }

  @PostMapping("/uncollect")
  public JSONObject uncollect(@RequestBody JSONObject param, @CookieValue("userId") String userId) {
    JSONObject res = new JSONObject();
    CollectId collectId = new CollectId(userId, param.getIntValue("id"));
    if (collectRepository.existsById(collectId)) {
      collectRepository.deleteById(collectId);
      res.put("ok", true);
      res.put("message", "取消收藏成功");
    } else {
      res.put("ok", false);
      res.put("message", "帖子未收藏");
    }
    return res;
  }
}

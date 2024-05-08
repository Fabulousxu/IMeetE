package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.CollectRepository;
import com.example.imeete.dao.LikeRepository;
import com.example.imeete.entity.Collect;
import com.example.imeete.entity.CollectId;
import com.example.imeete.entity.Like;
import com.example.imeete.entity.LikeId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post")
@CrossOrigin
public class PostController {
  @Autowired private LikeRepository likeRepository;
  @Autowired private CollectRepository collectRepository;

  @PostMapping("/like")
  public JSONObject like(@RequestBody JSONObject param, @CookieValue("userId") String userId) {
    JSONObject res = new JSONObject();
    LikeId likeId = new LikeId(userId, param.getIntValue("id"));
    System.out.println(userId);
    System.out.println(param.getIntValue("id"));

    if (likeRepository.findById(likeId).orElse(null) == null) {
      likeRepository.save(new Like(likeId));
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
    if (likeRepository.findById(likeId).orElse(null) != null) {
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
    CollectId collectId = new CollectId(userId, param.getIntValue("id"));
    if (collectRepository.findById(collectId).orElse(null) == null) {
      collectRepository.save(new Collect(collectId));
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
    if (collectRepository.findById(collectId).orElse(null) != null) {
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

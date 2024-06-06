package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.entity.User;
import com.example.imeete.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/match")
@CrossOrigin
public class MatchController {
    @Autowired private MatchService matchService;

    @PostMapping
    public JSONObject match(@CookieValue("userId") String userId, String mbti, int sex)
    {
        JSONObject ret = new JSONObject();

        User matchedUser = matchService.matchUser(userId, mbti, sex).join();

        if(matchedUser == null)
        {
            ret.put("ok", false);
        }

        else
        {
            ret.put("ok", true);
            ret.put("matchedUser", matchedUser.toJson());
        }


        return ret;
    }
}

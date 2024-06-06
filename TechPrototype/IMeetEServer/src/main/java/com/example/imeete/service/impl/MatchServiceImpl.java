package com.example.imeete.service.impl;

import com.example.imeete.dao.UserRepository;
import com.example.imeete.entity.User;
import com.example.imeete.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Queue;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.TimeUnit;

@Service
public class MatchServiceImpl implements MatchService {
    @Autowired
    private UserRepository userRepository;

    private Queue<User> waitingQueue = new ConcurrentLinkedQueue<>();
    private ConcurrentHashMap<String, CompletableFuture<User>> futureMap = new ConcurrentHashMap<>();

    @Override
    public CompletableFuture<User> matchUser(String waitingUserId, String mbti, int sex)
    {
        User currentUser = userRepository.findById(waitingUserId).orElse(null);

        if(currentUser == null)
        {
            return null;
        }

        for (User matchedUser : waitingQueue) {
            if (!Objects.equals(matchedUser.getUserId(), waitingUserId) && Objects.equals(matchedUser.getMbti(), mbti) && matchedUser.getSex() == sex) {
                System.out.println(matchedUser);
                CompletableFuture<User> future = futureMap.remove(matchedUser.getUserId());
                if (future != null) {
                    future.complete(currentUser);
                }
                return CompletableFuture.completedFuture(matchedUser);
            }
        }

        waitingQueue.add(currentUser);
        CompletableFuture<User> future = new CompletableFuture<>();
        futureMap.put(currentUser.getUserId(), future);

        // 设置定时任务3秒后匹配失败

        return future.orTimeout(3, TimeUnit.SECONDS)
                .exceptionally(ex -> {
                    waitingQueue.remove(currentUser);
                    futureMap.remove(currentUser.getUserId());
                    System.out.println("1");
                    return null;  // 返回null表示匹配失败
                });
    }
}

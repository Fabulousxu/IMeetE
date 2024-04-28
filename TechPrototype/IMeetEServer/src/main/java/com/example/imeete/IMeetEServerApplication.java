package com.example.imeete;

import com.example.imeete.service.MBTI;
import com.example.imeete.service.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class IMeetEServerApplication {

  public static void main(String[] args) {
    User.addUser("0001", "abc", "user0001", MBTI.INTJ);
    User.addUser("0002", "abc", "user0002", MBTI.INTP);
    User.addUser("0003", "abc", "user0003", MBTI.ENTJ);


    SpringApplication.run(IMeetEServerApplication.class, args);
  }

}

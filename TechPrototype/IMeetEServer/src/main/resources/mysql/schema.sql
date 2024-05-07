# 删除数据库
DROP DATABASE imeete;
CREATE DATABASE imeete;
USE imeete;
CREATE TABLE account
(
    account_id VARCHAR(16) PRIMARY KEY,
    account_password VARCHAR(16) NOT NULL
);

CREATE TABLE user
(
    user_id       VARCHAR(16) PRIMARY KEY,
    user_nickname VARCHAR(16) NOT NULL,
    user_mbti     CHAR(4)     NOT NULL,
    user_area  VARCHAR(32) NOT NULL,
    user_sex      BOOLEAN     NOT NULL,
    user_age      INT         NOT NULL,
    user_avatar   VARCHAR(32) NOT NULL,
    user_intro    TEXT        NOT NULL,
    user_follow_count    INT      DEFAULT 0,
    user_follower_count     INT      DEFAULT 0,
# 设置外键
   FOREIGN KEY (user_id) REFERENCES account(account_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE post
(
    post_id      INT PRIMARY KEY AUTO_INCREMENT,
    post_title   VARCHAR(32) NOT NULL,
    post_time    DATETIME DEFAULT CURRENT_TIMESTAMP,
    post_user_id VARCHAR(16) NOT NULL,
    post_content TEXT        NOT NULL,
    post_watch   INT      DEFAULT 0,
    post_like    INT      DEFAULT 0,
    post_collect INT      DEFAULT 0,
    post_share   INT      DEFAULT 0
);
CREATE TABLE mbti_intro
(
    mbti_type  CHAR(4) NOT NULL,
    mbti_intro TEXT    NOT NULL
);
CREATE TABLE mbti_test
(
    mbti_test_id       INT PRIMARY KEY AUTO_INCREMENT,
    mbti_test_question TEXT NOT NULL
);
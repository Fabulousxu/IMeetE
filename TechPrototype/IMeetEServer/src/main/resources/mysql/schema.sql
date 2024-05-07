CREATE DATABASE imeete;
USE imeete;
CREATE TABLE user
(
    user_id       VARCHAR(16) PRIMARY KEY,
    user_nickname VARCHAR(16) NOT NULL,
    user_password VARCHAR(16) NOT NULL,
    user_mbti     CHAR(4)     NOT NULL
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
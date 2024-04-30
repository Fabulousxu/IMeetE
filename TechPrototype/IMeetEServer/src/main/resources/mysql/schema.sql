CREATE DATABASE IF NOT EXISTS imeete;
USE imeete;
CREATE TABLE IF NOT EXISTS user (
    user_id CHAR(16) PRIMARY KEY,
    user_nickname CHAR(16),
    user_password CHAR(16),
    user_mbti CHAR(4)
);
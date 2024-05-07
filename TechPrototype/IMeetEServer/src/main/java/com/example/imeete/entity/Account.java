package com.example.imeete.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "account")
public class Account {
    @Id
    @Column(name = "account_id")
    public String id;

    @Column(name = "account_password")
    public String password;
}

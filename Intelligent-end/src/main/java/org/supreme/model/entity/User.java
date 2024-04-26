package org.supreme.model.entity;

import lombok.Data;

@Data
public class User {
    private Integer userId;
    private String userName;
    private String password;
    private String email;
    private String phoneNumber;
    private String imagePath;
    private Integer permission;
}

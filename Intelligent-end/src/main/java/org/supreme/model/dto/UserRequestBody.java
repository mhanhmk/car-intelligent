package org.supreme.model.dto;

import lombok.Data;

@Data
public class UserRequestBody {
    private String userName;
    private String email;
    private String phoneNumber;
    private String imagePath;
}

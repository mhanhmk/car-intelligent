package org.supreme.utils;

import lombok.Data;

@Data
public class ApiResponse {
    private int code;
    private String message;
    private Object data;

    public ApiResponse() {}

    public ApiResponse(int success, String message, Object data) {
        this.code = success;
        this.message = message;
        this.data = data;
    }

    public ApiResponse(int success, String message) {
        this.code = success;
        this.message = message;
    }
}


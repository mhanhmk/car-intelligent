package org.supreme.utils;

import java.util.regex.Pattern;

public class ValidationUtils {

    private static final String USERNAME_REGEX = "^[a-zA-Z0-9_-]{3,16}$";
    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";
    private static final String PHONE_REGEX = "^1[3456789]\\d{9}$";
    private static final String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$";

    public static boolean isUsernameValid(String username) {
        return username == null || !Pattern.matches(USERNAME_REGEX, username);
    }

    public static boolean isEmailValid(String email) {
        return email == null || !Pattern.matches(EMAIL_REGEX, email);
    }

    public static boolean isPhoneValid(String phone) {
        return phone == null && !Pattern.matches(PHONE_REGEX, phone);
    }

    public static boolean isPasswordValid(String password) {
        return password == null || !Pattern.matches(PASSWORD_REGEX, password);
    }
}


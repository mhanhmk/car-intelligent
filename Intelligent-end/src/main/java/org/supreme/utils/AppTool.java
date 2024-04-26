package org.supreme.utils;

import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;
import org.springframework.data.redis.core.RedisTemplate;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

import com.google.gson.Gson;
import org.supreme.model.vo.OptionIdName;

public class AppTool {
    public static String convertToSnakeCase(String input) {
        return input.replaceAll("([a-z])([A-Z])", "$1_$2").toLowerCase();
    }

    public static String toCamelCase(String s) {
        String[] parts = s.split("_");
        StringBuilder camelCaseString = new StringBuilder(parts[0]);
        for (int i = 1; i < parts.length; i++) {
            camelCaseString.append(parts[i].substring(0, 1).toUpperCase()).append(parts[i].substring(1));
        }
        return camelCaseString.toString();
    }


    public static Object mapToObject(Map<String, Object> map, Class<?> classType) {
        Gson gson = new Gson();
        String json = gson.toJson(map);
        return gson.fromJson(json, classType);
    }

    public static List<OptionIdName> ListObjectTo(List<?> listObj, String idPropName, String namePropName) {
        List<OptionIdName> optionIdNames = new ArrayList<>();
        for (Object obj : listObj) {
            MetaObject metaObject = SystemMetaObject.forObject(obj);
            optionIdNames.add(new OptionIdName((Integer) metaObject.getValue(idPropName), (String) metaObject.getValue(namePropName)));
        }

        return optionIdNames;
    }

    public static boolean checkIdentity(HttpServletRequest request, RedisTemplate<String, String> redisTemplate) {
        Cookie cookie = getCookieByKey(request, "sessionId");
        if (cookie != null) {
            String value = redisTemplate.opsForValue().get(cookie.getValue());
            if (value == null || value.isEmpty()) {
                return false;
            }
            return Objects.equals(value.split("-")[1], "1");
        }

        return false;
    }

    public static Optional<Integer> getIdFromRedis(HttpServletRequest request, RedisTemplate<String, String> redisTemplate) {
        Cookie cookie = getCookieByKey(request, "sessionId");
        if (cookie != null) {
            String value = redisTemplate.opsForValue().get(cookie.getValue());
            if (value == null) {
                return Optional.empty();
            }
            String idStr = value.split("-")[0];
            if (!idStr.isEmpty()) {
                return Optional.of(Integer.parseInt(idStr));
            }
        }

        return Optional.empty();
    }

    public static Cookie getCookieByKey(HttpServletRequest request, String key) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(key)) {
                    return cookie;
                }
            }
        }

        return null;
    }

    public static String MD5hash(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(input.getBytes());
            StringBuilder hexString = new StringBuilder();

            for (byte b : messageDigest) {
                String hex = Integer.toHexString(0xFF & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            // Handle the exception appropriately
            return null;
        }
    }
}

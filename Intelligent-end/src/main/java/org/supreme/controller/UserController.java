package org.supreme.controller;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;
import org.supreme.model.dto.UserRequestBody;
import org.supreme.model.entity.User;
import org.supreme.service.UserService;
import org.supreme.utils.ApiResponse;
import org.supreme.utils.AppTool;
import org.supreme.utils.ValidationUtils;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Optional;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.concurrent.TimeUnit;

/**
 * UserController
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    private UserService userService;

    @Resource
    private RedisTemplate<String, String> redisTemplate;

    private final Long TIME_OUT = 1800L;

    /**
     * Login
     */
    @PostMapping("/login")
    public ApiResponse Login(
            @RequestParam("username") String userName,
            @RequestParam("passwd") String passwd,
            HttpSession session,
            HttpServletResponse response
    ) {
        if (ValidationUtils.isUsernameValid(userName)) {
            return new ApiResponse(505, "用户名或邮箱错误");
        }
        // if (ValidationUtils.isPasswordValid(passwd)) {
        //     return new ApiResponse(505, "密码格式错误");
        // }

        User user = userService.forLogin(userName, passwd);
        String sessionId = generateSessionId();
        setRedisValue(sessionId, user.getUserId() + "-" + user.getPermission());
        session.setMaxInactiveInterval(TIME_OUT.intValue()); // 设置会话的最大非活动时间为3600秒
        Cookie cookie = new Cookie("sessionId", sessionId);
        cookie.setHttpOnly(true); // 设置Cookie的HTTP Only属性
        cookie.setPath("/");
        response.addCookie(cookie); // 将Cookie添加到响应中
        return new ApiResponse(205, "登入成功!!", user);
    }

    /**
     * Register
     */
    @PostMapping("/register")
    public ApiResponse Register(
            @RequestParam("username") String userName,
            @RequestParam("email") String email,
            @RequestParam("passwd") String passwd
    ) {
        if (ValidationUtils.isUsernameValid(userName)) {
            return new ApiResponse(505, "用户名格式错误!!");
        }
        // if (ValidationUtils.isPasswordValid(passwd)) {
        //     return new ApiResponse(505, "密码格式错误!!");
        // }
        if (ValidationUtils.isEmailValid(email)) {
            return new ApiResponse(505, "邮箱格式错误!!");
        }

        return userService.forRegister(userName, passwd, email) > 0 ? new ApiResponse(205, "注册成功!!") :
                new ApiResponse(505, "注册失败!!");
    }

    /**
     * Logout
     */
    @PostMapping("/logout")
    public ApiResponse Logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie cookie = AppTool.getCookieByKey(request, "sessionId");
        if (cookie != null) {
            deleteRedisValue(cookie.getValue());
            cookie.setMaxAge(0);
            response.addCookie(cookie);
        }

        return new ApiResponse(200, "success");
    }

    /**
     * UpdateInfo
     */
    @PostMapping("/update_info")
    public ApiResponse UpdateInfo(@RequestBody UserRequestBody updateRequest, HttpServletRequest request) {
        Optional<Integer> idFromRedis = AppTool.getIdFromRedis(request, redisTemplate);
        if (!idFromRedis.isPresent()) {
            return new ApiResponse(300, "非法请求!!");
        }
        Integer id = idFromRedis.get();

        Optional<ApiResponse> apiResponse = checkUser(updateRequest);

        return apiResponse.orElseGet(() -> userService.updateUserInfo(id, updateRequest) > 0 ? new ApiResponse(205, "修改成功!!") :
                new ApiResponse(505, "修改失败"));
    }

    /**
     * Star
     */
    @PostMapping("/star/{modelId}")
    public ApiResponse Star(HttpServletRequest request, @PathVariable Integer modelId) {
        if (modelId == null) {
            return new ApiResponse(300, "请求出错啦");
        }

        Optional<Integer> userId = AppTool.getIdFromRedis(request, redisTemplate);
        return userId.map(integer -> userService.star(integer, modelId) > 0 ? new ApiResponse(200, "success") :
                new ApiResponse(500, "error")).orElseGet(() -> new ApiResponse(505, "请先登入"));

    }

    /**
     * CancelStar
     */
    @PostMapping("/cancel_star/{modelId}")
    public ApiResponse CancelStar(HttpServletRequest request, @PathVariable Integer modelId) {
        if (modelId == null) {
            return new ApiResponse(300, "请求出错啦");
        }

        Optional<Integer> userId = AppTool.getIdFromRedis(request, redisTemplate);
        return userId.map(id -> userService.cancelStar(id, modelId) > 0 ? new ApiResponse(200, "success") :
                new ApiResponse(500, "error")).orElseGet(() -> new ApiResponse(505, "请先登入"));
    }

    /**
     * UserOrders
     */
    @PostMapping("/user_orders")
    public ApiResponse UserOrders(
            @RequestParam(required = false, defaultValue = "1") Integer currentPage,
            @RequestParam(required = false, defaultValue = "20") Integer pageSize,
            HttpServletRequest request
    ) {
        Optional<Integer> userId = AppTool.getIdFromRedis(request, redisTemplate);

        return userId.map(id -> new ApiResponse(200, "success", userService.userSales(id, currentPage, pageSize))).orElseGet(
                () -> new ApiResponse(505, "请先登入"));
    }

    /**
     * UserStars
     */
    @PostMapping("/user_stars")
    public ApiResponse UserStars(
            @RequestParam(required = false, defaultValue = "1") Integer currentPage,
            @RequestParam(required = false, defaultValue = "20") Integer pageSize,
            HttpServletRequest request
    ) {
        Optional<Integer> userId = AppTool.getIdFromRedis(request, redisTemplate);

        return userId.map(id -> new ApiResponse(200, "success", userService.userStars(id, currentPage, pageSize))).orElseGet(
                () -> new ApiResponse(505, "请先登入"));
    }

    private Optional<ApiResponse> checkUser(UserRequestBody userRequest) {
        if (ValidationUtils.isUsernameValid(userRequest.getUserName())) {
            return Optional.of(new ApiResponse(505, "用户名格式错误!!"));
        }
        if (ValidationUtils.isEmailValid(userRequest.getEmail())) {
            return Optional.of(new ApiResponse(505, "邮箱格式错误!!"));
        }
        if (ValidationUtils.isPhoneValid(userRequest.getPhoneNumber())) {
            return Optional.of(new ApiResponse(505, "电话号码格式错误!!"));
        }

        return Optional.empty();
    }

    private void setRedisValue(String key, String value) {
        redisTemplate.opsForValue().set(key, value, TIME_OUT, TimeUnit.SECONDS);
    }

    private void deleteRedisValue(String key) {
        redisTemplate.delete(key);
    }

    public static String generateSessionId() {
        SecureRandom random = new SecureRandom();
        byte[] randomBytes = new byte[32];
        random.nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }
}

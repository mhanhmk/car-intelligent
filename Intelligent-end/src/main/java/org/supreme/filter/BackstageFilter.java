package org.supreme.filter;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.servlet.HandlerInterceptor;
import org.supreme.utils.AppTool;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BackstageFilter implements HandlerInterceptor {
    @Resource
    private RedisTemplate<String, String> redisTemplate;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // 在请求到达处理程序之前执行的逻辑
        // 返回 true 表示继续处理该请求，返回 false 表示中断请求处理
        return AppTool.checkIdentity(request, redisTemplate);
        // return true;
    }
}


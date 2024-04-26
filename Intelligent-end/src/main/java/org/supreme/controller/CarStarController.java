package org.supreme.controller;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.supreme.mapper.CarStarMapper;
import org.supreme.utils.ApiResponse;
import org.supreme.utils.AppTool;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

/**
 * CarStarController
 */
@RestController
@RequestMapping("/star")
public class CarStarController {

    @Resource
    private CarStarMapper carStarMapper;

    @Resource
    private RedisTemplate<String, String> redisTemplate;

    @PostMapping("/if_star/{modelId}")
    public ApiResponse IfStar(HttpServletRequest request, @PathVariable Integer modelId) {
        if (modelId == null) {
            return new ApiResponse(300, "非法请求!");
        }
        Optional<Integer> idFromRedis = AppTool.getIdFromRedis(request, redisTemplate);
        if (!idFromRedis.isPresent()) {
            return new ApiResponse(205, "请先登录!!");
        }
        Integer userId = idFromRedis.get();

        return carStarMapper.StarByUserIdCarId(userId, modelId) != null ? new ApiResponse(200, "success", true) :
                new ApiResponse(200, "success", false);
    }
}

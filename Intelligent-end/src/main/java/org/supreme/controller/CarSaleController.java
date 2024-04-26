package org.supreme.controller;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;
import org.supreme.service.CarSaleService;
import org.supreme.utils.ApiResponse;
import org.supreme.utils.AppTool;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

/**
 * CarSaleController
 */
@RestController
@RequestMapping("/sale")
public class CarSaleController {
    @Resource
    private CarSaleService saleService;

    @Resource
    private RedisTemplate<String, String> redisTemplate;

    /**
     * BuyCar
     */
    @PostMapping("/buy_car/{carId}")
    public ApiResponse BuyCar(@PathVariable Integer carId, HttpServletRequest request) {
        if (carId == null) {
            return new ApiResponse(300, "非法请求!");
        }
        Optional<Integer> idFromRedis = AppTool.getIdFromRedis(request, redisTemplate);

        return  idFromRedis.map((userId) -> saleService.saleCar(userId, carId) > 0 ? new ApiResponse(205, "购买成功!!")
            : new ApiResponse(505, "购买失败/(ㄒoㄒ)/~~")
        ).orElseGet(() -> new ApiResponse(205, "请先登录!!"));
    }
}

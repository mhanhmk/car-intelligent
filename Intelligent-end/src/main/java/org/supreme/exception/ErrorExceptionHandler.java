package org.supreme.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.supreme.utils.ApiResponse;

@Slf4j
@RestControllerAdvice
public class ErrorExceptionHandler {
    @ExceptionHandler(value = ErrorException.class)   //表示捕获异常class类名
    public ApiResponse handlerException(ErrorException e){
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(e.getCode());
        apiResponse.setMessage(e.getMsg());
        return apiResponse;
    }

    @ExceptionHandler(value = Exception.class)
    public ApiResponse handlerAllException(Exception ex) {
        log.error(ex.getMessage());
        return new ApiResponse(300, "服务器开小差啦~~");
    }
}

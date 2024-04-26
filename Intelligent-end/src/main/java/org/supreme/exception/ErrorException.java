package org.supreme.exception;

public class ErrorException extends RuntimeException {
    private final Integer code;
    private final String msg;

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    public ErrorException(Integer code, String msg) {
        super(msg);
        this.code = code;
        this.msg = msg;
    }
}

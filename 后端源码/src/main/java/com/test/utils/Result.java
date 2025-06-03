package com.test.utils;

import lombok.Data;

/**
 * @author CCL
 * @since 2021年12月24日
 */
@Data
public class Result<T> {

    private int code;
    private String message;
    private T data;
    /**
     * 成功,只能是0
     */
    private static final int SUCCESS_CODE = 200;
    public static final String SUCCESS_MESSAGE = "操作成功";
    /**
     * 失败
     */
    public static final int FAIL_CODE = 500;
    public static final String FAIL_MESSAGE = "操作失败";

    /**
     * 判断请求是否成功
     * @return 如果状态码是成功码则返回true，否则返回false
     */
    public boolean isSuccess() {
        return this.code == SUCCESS_CODE;
    }

    /**
     * 获取错误消息
     * @return 消息内容
     */
    public String getMsg() {
        return this.message;
    }

    public static <T> Result<T> success(T data) {
        return new Result<>(SUCCESS_CODE, SUCCESS_MESSAGE, data);
    }

    public static <T> Result<T> ok() {
        return new Result<>(SUCCESS_CODE, SUCCESS_MESSAGE,null);
    }
    public static <T> Result<T> ok(String msg) {
        return new Result<>(SUCCESS_CODE, msg,null);
    }

    public static <T> Result<T> success(String message, T data) {
        return new Result<>(SUCCESS_CODE, message, data);
    }

    public static <T> Result<T> fail() {
        return new Result<>(FAIL_CODE, FAIL_MESSAGE, null);
    }

    public static <T> Result<T> fail(String message) {
        return new Result<>(FAIL_CODE, message, null);
    }

    public static <T> Result<T> fail(int code, String message) {
        return new Result<>(code, message, null);
    }

    private Result(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

}


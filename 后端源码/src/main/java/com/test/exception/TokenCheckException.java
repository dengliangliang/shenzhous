package com.test.exception;


/**
 * @author zhonghui
 * @description 业务异常
 * @date 2020/12/6
 */
public class TokenCheckException extends RuntimeException {

    public TokenCheckException(String msg){
        super(msg);
    }

}

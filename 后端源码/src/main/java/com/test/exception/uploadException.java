package com.test.exception;


/**
 * @author zhonghui
 * @description 业务异常
 * @date 2020/12/6
 */

public class uploadException extends RuntimeException {



    public uploadException(String msg){
        super(msg);
    }

}

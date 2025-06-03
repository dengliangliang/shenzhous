package com.test.config;

import com.test.constant.FwConstants;
import com.test.exception.TokenCheckException;
import com.test.utils.Result;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.security.InvalidParameterException;
import javax.validation.ConstraintViolationException;
/**
 * @description 异常处理
 * @author zhonghui
 * @date 2020-12-06
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({NoHandlerFoundException.class})
    public Result<Void> notFoundException(Exception e) {
        return Result.fail("地址没有找到");
    }
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ExceptionHandler({InvalidParameterException.class, IllegalArgumentException.class,
            MissingServletRequestParameterException.class, MethodArgumentNotValidException.class,
            ConstraintViolationException.class})
    public Result<Void> paramException(Exception e) {
        if (e instanceof MethodArgumentNotValidException) {
            return Result.fail(FwConstants.VILIDATION,((MethodArgumentNotValidException) e)
                    .getBindingResult().getAllErrors().get(0).getDefaultMessage());
        }
        if (e.getMessage() != null) {
            return Result.fail(e.getMessage());
        }
        return Result.fail();
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler({TokenCheckException.class})
    public Result businessException(TokenCheckException e) {
        log.error("BusinessException 异常",e);
        return Result.fail(e.getMessage());
    }
    /**
     * 全局异常捕捉处理
     *
     * @param ex .
     * @return .
     */
    @ExceptionHandler(value = Exception.class)
    public Result errorHandler(Exception ex, HttpServletRequest request)
    {
        if (null != request) {
            StringBuilder strBuild = new StringBuilder();
            strBuild.append("global catch reqUrl:");
            strBuild.append(request.getRequestURI());
            if (HttpMethod.GET.matches(request.getMethod())) {
                strBuild.append(" queryString:");
                strBuild.append(request.getQueryString());
            }
            log.error(strBuild.toString(), ex);
            return Result.fail("系统内部错误,请稍后重试");
        }
        else
        {
            log.error("global catch", ex);
            return Result.fail("系统内部错误,请稍后重试");
        }
    }

    /**
     * 前端请求方式异常捕捉处理
     *
     * @param ex .
     * @return .
     */
    @ExceptionHandler(value = HttpMessageNotReadableException.class)
    public Result httpMessageParseErrorHandler(HttpMessageNotReadableException ex) {
        log.info("HttpMessageNotReadable catch", ex);
        return Result.fail("系统内部错误,请稍后重试");
    }





}

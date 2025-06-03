package com.test.config.interceptor;

import cn.hutool.core.util.StrUtil;
import com.alibaba.fastjson.JSON;
import com.test.config.AuthUser;
import com.test.config.RedisUtils;
import com.test.constant.FwConstants;
import com.test.exception.TokenCheckException;
import com.test.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

public class TokenInterceptor implements HandlerInterceptor {

    @Autowired
    private RedisUtils redisUtils;

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object object) throws Exception {
        // 从 http 请求头中取出 token
        String token = httpServletRequest.getHeader("Authorization");
        System.out.println(token);
        if(StrUtil.isBlank(token)){
            throw new TokenCheckException("登录异常");
        }
//        String[] temp = token.split(" ");
//        String res = redisUtils.get(FwConstants.USER_LOGIN_TOKEN + temp[1]);
        String res = redisUtils.get(FwConstants.USER_LOGIN_TOKEN + token);
//        System.out.println(res);
        if(StringUtils.isEmpty(res)){
            throw new TokenCheckException("请先登录系统！");
        }
        AuthUser.set(JSON.parseObject(res, User.class));//当前登陆人的全局变量
        return true;
    }
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
        AuthUser.remove();
    }

}

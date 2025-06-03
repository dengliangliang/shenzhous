package com.test.controller;

import com.test.model.User;
import com.test.service.UserService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequestMapping("/UserLogin")
@RestController
public class UserLoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Result<Map<String, Object>> login(
            @RequestParam String phone,
            @RequestParam String password,
            @RequestParam(required = false) String wxCode
    ){
        return userService.login(phone,password,wxCode);
    }

    @PostMapping("/register")
    public Result<User> register(@RequestBody User user){
        System.out.println(user);
        return userService.register(user);
    }


    @PutMapping("/forgotPassword")
    public Result<String> forgotPassword(
            @RequestParam String phone,
            @RequestParam String newPassword,
            @RequestParam String code) {
        return userService.forgotPassword(phone,newPassword,code);
    }
}

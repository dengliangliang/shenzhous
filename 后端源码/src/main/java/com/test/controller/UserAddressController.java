package com.test.controller;

import com.test.model.Return.UserAddressReturn;
import com.test.model.Return.UserReturn;
import com.test.model.User;
import com.test.model.UserAddress;
import com.test.service.UserAddressService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//用户地址模块
@RequestMapping("/UserAddress")
@RestController
public class UserAddressController {
    @Autowired
    private UserAddressService userAddressService;

    //新增用户地址
    @PostMapping("")
    public Result<UserAddress> addUserAddress(@RequestBody UserAddress userAddress) {
        return userAddressService.addUserAddress(userAddress);
    }

    @PutMapping("")
    public Result<UserAddress> updateUserAddress(@RequestBody UserAddress userAddress) {
        return userAddressService.updateUserAddress(userAddress);
    }

    @DeleteMapping("")
    public Result<UserAddress> deleteUserAddress(@RequestParam String userAddressId) {
        return userAddressService.deleteUserAddress(userAddressId);
    }

    @GetMapping("")
    public Result<UserAddress> getUserAddressById(@RequestParam String id) {
        return userAddressService.getUserAddressById(id);
    }

    @GetMapping("/getDefault")
    public Result<UserAddress> getDefault(@RequestParam String id) {
        return userAddressService.getDefault(id);
    }

    @GetMapping("/page")
    public Result<UserAddressReturn> pageUserAddress(
            @RequestParam(value = "pageNum", defaultValue = "0") int pageNum,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam(required = false) Integer type,
            @RequestParam String userId,
            @RequestParam(required = false) String detailAddress
    ) {
        return userAddressService.pageUserAddress(pageNum, pageSize, type,userId,detailAddress);
    }

    @GetMapping("/list")
    public Result<List<UserAddress>> getUserAddressList(
            @RequestParam(required = false) Integer type,
            @RequestParam String userId,
            @RequestParam(required = false) String detailAddress) {
        return userAddressService.getUserAddressList(type,userId,detailAddress);
    }

}

package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.Return.UserAddressReturn;
import com.test.model.UserAddress;
import com.test.utils.Result;

import java.util.List;

public interface UserAddressService extends IService<UserAddress> {
    Result<UserAddress> addUserAddress(UserAddress userAddress);

    Result<UserAddress> updateUserAddress(UserAddress userAddress);

    Result<UserAddress> deleteUserAddress(String userAddressId);

    Result<UserAddress> getUserAddressById(String id);

    Result<UserAddressReturn> pageUserAddress(int pageNum, int pageSize, Integer type, String userId, String detailAddress);

    Result<List<UserAddress>> getUserAddressList(Integer type, String userId, String detailAddress);

    Result<UserAddress> getDefault(String id);
} 
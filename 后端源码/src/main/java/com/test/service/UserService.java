package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.Return.UserReturn;
import com.test.model.User;
import com.test.utils.Result;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;


public interface UserService extends IService<User> {

    Result<Map<String, Object>> login(String phone, String password,String wxCode);

    Result<User> register(User user);

    Result<User> addUser(User user);

    Result<User> updateUser(User user);

    Result<User> updateRegularUser(User user);

    Result<String> updatePassword(String userId, String oldPassword, String newPassword);

    Result<User> deleteUser(String userId);

    Result<User> getUserById(String userId);

    Result<UserReturn> pageUser(int pageNum, int pageSize, Integer identity, Integer isReal, String userName);

    Result<List<User>> getUserList(Integer identity, Integer isReal, String userName);

    Result<String> inputCode(String userId, String code);

    Result<String> inputInvitationCode(String userId, String invitationCode);

    Result<String> getIsMonth(String userId);

    Result<Object> authentication(String userId, String userName, String identification, String phone) throws Exception;

    Result<String> updateNewPassword(String userId, String newPassword);

    Result<String> setGetMoney(BigDecimal money);

    Result<String> forgotPassword(String phone, String newPassword, String code);

    Result<String> isRealByPhone(String phone);
}

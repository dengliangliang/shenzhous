package com.test.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.UserAddressMapper;
import com.test.mapper.UserMapper;
import com.test.model.Return.UserAddressReturn;
import com.test.model.User;
import com.test.model.UserAddress;
import com.test.service.UserAddressService;
import com.test.service.UserService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.test.utils.TimeUtils.getTime;
import static com.test.utils.UUIDUtils.getUUID;

@Service
public class UserAddressServiceImpl extends ServiceImpl<UserAddressMapper, UserAddress> implements UserAddressService {

    @Autowired
    private UserAddressMapper userAddressMapper;

    @Autowired
    private UserMapper userMapper;

    @Override
    public Result<UserAddress> addUserAddress(UserAddress userAddress) {
        User user = userMapper.selectById(userAddress.getUserId());
        if (ObjectUtils.isEmpty(user)||user.getIsDelete()==1) {
            return Result.fail("新增失败，该用户不存在");
        }
        if (userAddress.getIsDefault()==1){
            QueryWrapper<UserAddress> wrapper = new QueryWrapper<>();
            wrapper.eq("user_id",userAddress.getUserId());
            wrapper.eq("is_default",1);
            wrapper.eq("is_delete",0);
            UserAddress ua = this.getOne(wrapper);
            if (ObjectUtils.isNotEmpty(ua)){
                ua.setIsDefault(0);
                this.updateById(ua);
            }
        }
        userAddress.setAddressId(getUUID());
        userAddress.setCreateTime(getTime());
        userAddress.setUpdateTime(getTime());
        userAddressMapper.insert(userAddress);
        return Result.success("新增成功",userAddress);
    }

    @Override
    public Result<UserAddress> updateUserAddress(UserAddress userAddress) {
        UserAddress ua1 = userAddressMapper.selectById(userAddress.getAddressId());
        if (ObjectUtils.isEmpty(ua1)||ua1.getIsDelete()==1){
            return Result.fail("删除失败，该地址已不存在");
        }
        if (userAddress.getIsDefault()==1){
            QueryWrapper<UserAddress> wrapper = new QueryWrapper<>();
            wrapper.eq("user_id",userAddress.getUserId());
            wrapper.eq("is_default",1);
            wrapper.eq("is_delete",0);
            UserAddress ua = this.getOne(wrapper);
            if (ObjectUtils.isNotEmpty(ua)){
                ua.setIsDefault(0);
                this.updateById(ua);
            }
        }
        userAddress.setUpdateTime(getTime());
        userAddressMapper.updateById(userAddress);
        return Result.success("修改成功",userAddress);
    }

    @Override
    public Result<UserAddress> deleteUserAddress(String userAddressId) {
        UserAddress ua = userAddressMapper.selectById(userAddressId);
        if (ObjectUtils.isEmpty(ua)||ua.getIsDelete()==1){
            return Result.fail("删除失败，该地址已不存在");
        }
        ua.setIsDelete(1);
        ua.setUpdateTime(getTime());
        this.updateById(ua);
        return Result.success("删除成功",ua);
    }

    @Override
    public Result<UserAddress> getUserAddressById(String id) {
        UserAddress ua = userAddressMapper.selectById(id);
        if (ObjectUtils.isEmpty(ua)||ua.getIsDelete()==1){
            return Result.fail("查询失败，该地址已不存在");
        }
        return Result.success("查询成功",ua);
    }

    @Override
    public Result<UserAddressReturn> pageUserAddress(int pageNum, int pageSize, Integer type, String userId, String detailAddress) {
        QueryWrapper<UserAddress> wrapper = new QueryWrapper<>();
        if (type != null){
            wrapper.eq("type",type);
        }
        wrapper.eq("user_id",userId);
        if (StringUtils.isNotEmpty(detailAddress)){
            wrapper.like("detail_address",detailAddress);
        }
        wrapper.eq("is_delete",0);
        wrapper.orderByDesc("create_time");
        IPage<UserAddress> page = this.page(new Page<>(pageNum, pageSize), wrapper);
        UserAddressReturn userAddressReturn = new UserAddressReturn();
        userAddressReturn.setCurrentPage(pageNum);
        userAddressReturn.setPageSize(pageSize);
        userAddressReturn.setTotalPages(page.getTotal());
        userAddressReturn.setDataList(page.getRecords());
        return Result.success("查询成功",userAddressReturn);
    }

    @Override
    public Result<List<UserAddress>> getUserAddressList(Integer type, String userId, String detailAddress) {
        QueryWrapper<UserAddress> wrapper = new QueryWrapper<>();
        if (type != null){
            wrapper.eq("type",type);
        }
        wrapper.eq("user_id",userId);
        if (StringUtils.isNotEmpty(detailAddress)){
            wrapper.like("detail_address",detailAddress);
        }
        wrapper.eq("is_delete",0);
        wrapper.orderByDesc("create_time");
        List<UserAddress> userAddressList = userAddressMapper.selectList(wrapper);
        return Result.success("查询成功",userAddressList);
    }

    @Override
    public Result<UserAddress> getDefault(String id) {
        QueryWrapper<UserAddress> wrapper = new QueryWrapper<>();
        wrapper.eq("is_default",1);
        wrapper.eq("is_delete",0);
        wrapper.eq("user_id",id);
        UserAddress ua = this.getOne(wrapper);
        if (ObjectUtils.isEmpty(ua)||ua.getIsDelete()==1){
            return Result.fail("查询失败，该用户下没有默认地址");
        }
        return Result.success("查询成功",ua);
    }
}
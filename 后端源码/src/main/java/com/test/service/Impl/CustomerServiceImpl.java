package com.test.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.CustomerMapper;
import com.test.model.Customer;
import com.test.service.CustomerService;
import com.test.utils.Result;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import static com.test.utils.TimeUtils.getTime;

@Service
public class CustomerServiceImpl extends ServiceImpl<CustomerMapper, Customer> implements CustomerService {


    @Override
    public Result<Customer> updateCustomer(Customer customer) {
        customer.setCustomerId(1);
        customer.setUpdateTime(getTime());
        this.updateById(customer);
        return Result.success("修改配置成功",customer);
    }

    @Override
    public Result<Customer> getCustomer() {
        return Result.success("查询成功",this.getById(1));
    }
}

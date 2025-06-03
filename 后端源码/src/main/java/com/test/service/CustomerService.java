package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.Customer;
import com.test.utils.Result;

public interface CustomerService extends IService<Customer> {
    Result<Customer> updateCustomer(Customer customer);

    Result<Customer> getCustomer();
}

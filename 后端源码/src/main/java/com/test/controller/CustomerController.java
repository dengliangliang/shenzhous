package com.test.controller;

import com.test.model.Customer;
import com.test.model.ExpressType;
import com.test.service.CustomerService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PutMapping("")
    public Result<Customer> updateCustomer(@RequestBody Customer customer) {
        return customerService.updateCustomer(customer);
    }

    @GetMapping("")
    public Result<Customer> getCustomer() {
        return customerService.getCustomer();
    }
}

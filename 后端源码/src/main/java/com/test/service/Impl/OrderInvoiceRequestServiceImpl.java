package com.test.service.Impl;

import com.aliyun.dysmsapi20170525.models.SendSmsResponse;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.InvoiceTitleMapper;
import com.test.mapper.OrderInvoiceRequestMapper;
import com.test.mapper.OrderMapper;
import com.test.mapper.UserMapper;
import com.test.model.*;
import com.test.model.Return.OrderInvoiceRequestReturn;
import com.test.service.CustomerService;
import com.test.service.OrderInvoiceRequestService;
import com.test.service.UserService;
import com.test.utils.AliyunSmsUtils;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.test.utils.TimeUtils.getTime;
import static com.test.utils.UUIDUtils.getUUID;

@Service
public class OrderInvoiceRequestServiceImpl extends ServiceImpl<OrderInvoiceRequestMapper, OrderInvoiceRequest> implements OrderInvoiceRequestService {

    @Autowired
    private OrderInvoiceRequestMapper orderInvoiceRequestMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private InvoiceTitleMapper invoiceTitleMapper;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private AliyunSmsUtils aliyunSmsUtils;

    @Override
    public Result<OrderInvoiceRequest> addOrderInvoiceRequest(OrderInvoiceRequest orderInvoiceRequest) {
        User user = userMapper.selectById(orderInvoiceRequest.getUserId());
        if (ObjectUtils.isEmpty(user)||user.getIsDelete()==1) {
            return Result.fail("提交申请失败，申请用户信息不存在");
        }
        Order order = orderMapper.selectById(orderInvoiceRequest.getOrderId());
        if (ObjectUtils.isEmpty(order)||order.getIsDelete()==1) {
            return Result.fail("提交申请失败，订单信息不存在");
        }

        orderInvoiceRequest.setOrderInvoiceRequestId(getUUID());
        orderInvoiceRequest.setCreateTime(getTime());
        orderInvoiceRequest.setUpdateTime(getTime());
        orderInvoiceRequestMapper.insert(orderInvoiceRequest);

        try {
            Customer customer = customerService.getById(1);
            if (StringUtils.isNotEmpty(customer.getInvoicingContact())){
                aliyunSmsUtils.sendInvoiceNotification(customer.getInvoicingContact());
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return Result.success("提交申请成功",orderInvoiceRequest);
    }

    @Override
    public Result<OrderInvoiceRequest> updateOrderInvoiceRequest(OrderInvoiceRequest orderInvoiceRequest) {
        OrderInvoiceRequest o = orderInvoiceRequestMapper.selectById(orderInvoiceRequest.getOrderInvoiceRequestId());
        if (ObjectUtils.isEmpty(o)) {
            return Result.fail("修改失败，该发票申请不存在");
        }
        o.setEmail(orderInvoiceRequest.getEmail());
        o.setUpdateTime(getTime());
        orderInvoiceRequestMapper.updateById(o);
        return Result.success("修改申请成功",o);
    }

    @Override
    public Result<OrderInvoiceRequest> deleteOrderInvoiceRequest(String id) {
        OrderInvoiceRequest o = orderInvoiceRequestMapper.selectById(id);
        if (ObjectUtils.isEmpty(o)) {
            return Result.fail("删除失败，该发票申请不存在");
        }
        orderInvoiceRequestMapper.deleteById(id);
        return Result.success("删除成功",o);
    }

    @Override
    public Result<OrderInvoiceRequest> getOrderInvoiceRequestById(String id) {
        OrderInvoiceRequest o = orderInvoiceRequestMapper.selectById(id);
        if (ObjectUtils.isEmpty(o)) {
            return Result.fail("查询失败，该发票申请不存在");
        }
        User user = userMapper.selectById(o.getUserId());
        if (ObjectUtils.isNotEmpty(user)) {
            o.setUserName(user.getUserName());
        }
        Order order = orderMapper.selectById(o.getOrderId());
        if (ObjectUtils.isNotEmpty(order)) {
            o.setOrder(order);
        }

        return Result.success("查询成功",o);
    }

    @Override
    public Result<OrderInvoiceRequestReturn> pageOrderInvoiceRequest(int pageNum, int pageSize,String userId,String orderId,Integer type) {
        QueryWrapper<OrderInvoiceRequest> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotBlank(userId)) {
            queryWrapper.eq("user_id", userId);
        }
        if (StringUtils.isNotBlank(orderId)) {
            queryWrapper.eq("order_id", orderId);
        }
        if (type != null) {
            queryWrapper.eq("status", type);
        }
        queryWrapper.orderByDesc("create_time");
        IPage<OrderInvoiceRequest> page = this.page(new Page<>(pageNum, pageSize), queryWrapper);
        OrderInvoiceRequestReturn orderInvoiceRequestReturn = new OrderInvoiceRequestReturn();
        List<OrderInvoiceRequest> orderInvoiceRequests = page.getRecords();
        for (OrderInvoiceRequest orderInvoiceRequest : orderInvoiceRequests) {
            User user = userMapper.selectById(orderInvoiceRequest.getUserId());
            if (ObjectUtils.isNotEmpty(user)) {
                orderInvoiceRequest.setUserName(user.getUserName());
            }
        }
        orderInvoiceRequestReturn.setCurrentPage(pageNum);
        orderInvoiceRequestReturn.setPageSize(pageSize);
        orderInvoiceRequestReturn.setTotalPages(page.getTotal());
        orderInvoiceRequestReturn.setDataList(page.getRecords());
        return Result.success("查询成功",orderInvoiceRequestReturn);
    }

    @Override
    public Result<List<OrderInvoiceRequest>> getOrderInvoiceRequestList(String userId,String orderId,Integer type) {
        QueryWrapper<OrderInvoiceRequest> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotBlank(userId)) {
            queryWrapper.eq("user_id", userId);
        }
        if (StringUtils.isNotBlank(orderId)) {
            queryWrapper.eq("order_id", orderId);
        }
        if (type != null) {
            queryWrapper.eq("status", type);
        }
        queryWrapper.orderByDesc("create_time");
        List<OrderInvoiceRequest> orderInvoiceRequests = this.list(queryWrapper);
        for (OrderInvoiceRequest orderInvoiceRequest : orderInvoiceRequests) {
            User user = userMapper.selectById(orderInvoiceRequest.getUserId());
            if (ObjectUtils.isNotEmpty(user)) {
                orderInvoiceRequest.setUserName(user.getUserName());
            }
        }
        return Result.success("查询成功",orderInvoiceRequests);
    }

    @Override
    public Result<String> passOrOverrule(String id, Integer type, String overrule,String invoicePhoto) {
        OrderInvoiceRequest o = orderInvoiceRequestMapper.selectById(id);
        if (ObjectUtils.isEmpty(o)) {
            return Result.fail("修改申请状态失败，该发票申请不存在");
        }
        o.setStatus(type);
        if (StringUtils.isNotEmpty(overrule)){
            o.setOverrule(overrule);
        }
        if (StringUtils.isNotEmpty(invoicePhoto)){
            o.setInvoicePhoto(invoicePhoto);
        }
        o.setUpdateTime(getTime());
        orderInvoiceRequestMapper.updateById(o);
        return Result.success("修改申请状态成功");
    }
}
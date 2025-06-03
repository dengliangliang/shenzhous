package com.test.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.test.model.Express;
import com.test.service.ExpressService;
import com.test.utils.AliyunSmsUtils;
import com.test.utils.Result;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.alibaba.fastjson.JSONObject;
import com.test.service.ThirdApiService;
import com.test.service.OrderService;
import com.test.service.UserService;
import com.test.model.Order;
import com.test.model.User;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/YiDa")
public class YiDaController {

    private static final Logger log = LoggerFactory.getLogger(YiDaController.class);
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Autowired
    private ThirdApiService thirdApiService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private AliyunSmsUtils aliyunSmsUtils;

    @Autowired
    private ExpressService expressService;

    //预下单[获取渠道&价格(按需接入)]
    @PostMapping("/smartPreOrder")
    public Object createExpress(@RequestBody JSONObject requestBody) {
        try {
            log.info("收到请求参数: {}", requestBody.toJSONString());
            // 直接传递原始JSON对象
            return thirdApiService.executeApi(
                    "SMART_PRE_ORDER",
                    requestBody.getJSONObject("businessParams"));
        } catch (Exception e) {
            log.error("获得价格失败", e);
            return Result.fail("获得价格失败：" + e.getMessage());
        }
    }

    @PostMapping("/createOrder")
    public Object createOrder(@RequestBody JSONObject requestBody) {
        try {
            log.info("收到请求参数: {}", requestBody.toJSONString());
            // 直接传递原始JSON对象
            return thirdApiService.executeApi(
                    "SUBMIT_ORDER_V2",
                    requestBody.getJSONObject("businessParams"));
        } catch (Exception e) {
            log.error("获得价格失败", e);
            return Result.fail("获得价格失败：" + e.getMessage());
        }
    }

    @PostMapping("/cancelOrder")
    public Object cancelOrder(@RequestBody JSONObject requestBody) {
        try {
            log.info("收到请求参数: {}", requestBody.toJSONString());
            // 直接传递原始JSON对象
            return thirdApiService.executeApi(
                    "CANCEL_ORDER",
                    requestBody.getJSONObject("businessParams"));
        } catch (Exception e) {
            log.error("获得价格失败", e);
            return Result.fail("获得价格失败：" + e.getMessage());
        }
    }

    @PostMapping("/deliveryTrace")
    public Object deliveryTrace(@RequestBody JSONObject requestBody) {
        try {
            log.info("收到请求参数: {}", requestBody.toJSONString());
            // 直接传递原始JSON对象
            return thirdApiService.executeApi(
                    "DELIVERY_TRACE",
                    requestBody.getJSONObject("businessParams"));
        } catch (Exception e) {
            log.error("获得价格失败", e);
            return Result.fail("获得价格失败：" + e.getMessage());
        }
    }

    @PostMapping("/callback")
    public Result callback(@RequestBody JSONObject requestBody) {
        try {
            log.info("收到回调请求参数: {}", requestBody.toJSONString());

            // 获取基本参数
            String orderNo = requestBody.getString("orderNo");
            log.info("收到回调请求参数: {}", orderNo);
            String deliveryId = requestBody.getString("deliveryId");
            String deliveryType = requestBody.getString("deliveryType");
            String thirdNo = requestBody.getString("thirdNo");
            Integer pushType = requestBody.getInteger("pushType");
            JSONObject contextObj = requestBody.getJSONObject("contextObj");

            // 根据推送类型处理不同的业务逻辑
            switch (pushType) {
                case 1: // 状态推送
                    handleStatusPush(orderNo, deliveryId, contextObj);
                    break;
                case 2: // 账单推送
                    handleBillPush(orderNo, deliveryId, contextObj);
                    break;
                case 3: // 揽收推送
                    handlePickupPush(orderNo, deliveryId, contextObj);
                    break;
                case 5: // 订单变更
                    handleOrderChangePush(orderNo, deliveryId, contextObj);
                    break;
                default:
                    log.warn("未知的推送类型: {}", pushType);
            }

            // 快速返回成功响应
            return Result.success("接收成功");
        } catch (Exception e) {
            log.error("处理回调请求失败", e);
            return Result.fail("处理回调请求失败：" + e.getMessage());
        }
    }

    // 处理状态推送
    private void handleStatusPush(String orderNo, String deliveryId, JSONObject contextObj) {
        String orderStatus = contextObj.getString("ydOrderStatus");
        String orderStatusDesc = contextObj.getString("ydOrderStatusDesc");
        log.info("订单状态更新 - 订单号: {}, 运单号: {}, 状态: {}, 描述: {}",
                orderNo, deliveryId, orderStatus, orderStatusDesc);

        // 查询订单
        Order order = orderService.getByOrderNo(orderNo);
        if (order == null) {
            log.error("未找到订单: {}", orderNo);
            return;
        }

        // 更新订单状态
        Order updateOrder = new Order();
        updateOrder.setOrderId(order.getOrderId());
        updateOrder.setDeliveryId(deliveryId);
        updateOrder.setUpdateTime(LocalDateTime.now().format(formatter));

        // 根据易达状态更新订单状态
        switch (orderStatus) {
            case "1": // 待取件
                updateOrder.setShippingStatus(0);
                break;
            case "11": // 已取件
                updateOrder.setShippingStatus(1);
                updateOrder.setPickUpTime(LocalDateTime.now().format(formatter));
                // 发送取件通知

                break;
            case "2": // 运输中
                updateOrder.setShippingStatus(2);
                updateOrder.setShippingTime(LocalDateTime.now().format(formatter));
                // 发送发货通知

                break;
            case "3": // 已签收
                updateOrder.setShippingStatus(3);
                updateOrder.setReceivingTime(LocalDateTime.now().format(formatter));
                // 发送订单完成通知

                break;
            case "6": // 异常
                updateOrder.setShippingStatus(6);
                updateOrder.setRemark("订单异常: " + orderStatusDesc);
                // 发送异常通知

                break;
            case "10": // 已取消
                updateOrder.setShippingStatus(10);
                updateOrder.setRemark("订单已取消: " + orderStatusDesc);
                break;
        }

        orderService.updateById(updateOrder);
    }

    // 处理账单推送
    private void handleBillPush(String orderNo, String deliveryId, JSONObject contextObj) throws Exception {
        BigDecimal realWeight = contextObj.getBigDecimal("realWeight");
        BigDecimal realVolume = contextObj.getBigDecimal("realVolume");
        BigDecimal calcFeeWeight = contextObj.getBigDecimal("calcFeeWeight");
        Integer packageCount = contextObj.getInteger("packageCount");
        String freightBase = contextObj.getString("freightBase");
        List<JSONObject> feeBlockList = contextObj.getJSONArray("feeBlockList").toJavaList(JSONObject.class);

        log.info("账单信息 - 订单号: {}, 运单号: {}, 实际重量: {}, 计费重量: {}, 包裹数: {}",
                orderNo, deliveryId, realWeight, calcFeeWeight, packageCount);

        // 查询订单
        Order order = orderService.getByOrderNo(orderNo);
        if (order == null) {
            log.error("未找到订单: {}", orderNo);
            return;
        }

        // 更新订单费用信息
        Order updateOrder = new Order();
        updateOrder.setOrderId(order.getOrderId());
        updateOrder.setActualWeight(realWeight);
        updateOrder.setUpdateTime(LocalDateTime.now().format(formatter));
        
        // 计算总费用
        BigDecimal totalFee = BigDecimal.ZERO;
        BigDecimal orderFee = order.getOrderTotalPrice();
        for (JSONObject feeBlock : feeBlockList) {
            Integer type = feeBlock.getInteger("type");
            BigDecimal fee = feeBlock.getBigDecimal("fee");
            if (type == 0) { // 运费
                updateOrder.setOrderTotalPrice(fee);
            } else if (type == 1) { // 保价费
                updateOrder.setInsuranceFee(fee);
            }
            totalFee = totalFee.add(fee);
        }
        QueryWrapper<Express> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("delivery_type",order.getExpressCode());
        Express express = expressService.getOne(queryWrapper);
        BigDecimal priceDifference = BigDecimal.ZERO;
        if (express == null) {
            // 将 15.00 转换为 0.15（百分比转小数）
            BigDecimal profitRate = express.getProfit()
                    .divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP); // 除以100并保留2位小数

            // 计算 totalFee + (totalFee * profitRate)
            totalFee = totalFee.add(totalFee.multiply(profitRate));
            priceDifference = totalFee.subtract(orderFee);
            updateOrder.setOrderPriceDifference(priceDifference);
        }else{
            priceDifference = totalFee.subtract(orderFee);
            updateOrder.setOrderPriceDifference(priceDifference);
        }



        
        // 检查是否有差价
        if (realWeight != null && order.getEstimatedItemWeight() != null && 
            !realWeight.equals(order.getEstimatedItemWeight())) {
            updateOrder.setIsPriceDifferencePaid(0);
            
            // 如果有差价，发送差价通知
            if (priceDifference.compareTo(BigDecimal.ZERO) > 0) {
                User user = userService.getById(order.getUserId());
                if (ObjectUtils.isNotEmpty(user)){
                    aliyunSmsUtils.sendPriceDifferenceNotice(user.getPhone(), order.getDeliveryId());
                }

            }
        }
        
        // 更新订单总价
        updateOrder.setOrderTotalPrice(totalFee);
        orderService.updateById(updateOrder);
    }

    // 处理揽收推送
    private void handlePickupPush(String orderNo, String deliveryId, JSONObject contextObj) throws Exception {
        String courierName = contextObj.getString("courierName");
        String courierPhone = contextObj.getString("courierPhone");
        String pickUpCode = contextObj.getString("pickUpCode");
        String siteName = contextObj.getString("siteName");

        log.info("揽收信息 - 订单号: {}, 运单号: {}, 取件人: {}, 取件码: {}, 站点: {}",
                orderNo, deliveryId, courierName, pickUpCode, siteName);

        // 查询订单
        Order order = orderService.getByOrderNo(orderNo);
        if (order == null) {
            log.error("未找到订单: {}", orderNo);
            return;
        }

        // 更新订单揽收信息
        Order updateOrder = new Order();
        updateOrder.setOrderId(order.getOrderId());
        aliyunSmsUtils.sendPickupNotice(updateOrder.getReceiverPhone(), siteName, pickUpCode);

        updateOrder.setUpdateTime(LocalDateTime.now().format(formatter));
        orderService.updateById(updateOrder);
        


    }

    // 处理订单变更推送
    private void handleOrderChangePush(String orderNo, String deliveryId, JSONObject contextObj) {
        String businessTypeNew = contextObj.getString("businessTypeNew");
        String deliveryIdNew = contextObj.getString("deliveryIdNew");

        log.info("订单变更 - 订单号: {}, 原运单号: {}, 新产品类型: {}, 新运单号: {}",
                orderNo, deliveryId, businessTypeNew, deliveryIdNew);

        // 查询订单
        Order order = orderService.getByOrderNo(orderNo);
        if (order == null) {
            log.error("未找到订单: {}", orderNo);
            return;
        }

        // 更新订单信息
        Order updateOrder = new Order();
        updateOrder.setOrderId(order.getOrderId());
        updateOrder.setDeliveryId(deliveryIdNew);
        updateOrder.setRemark(String.format("订单变更 - 新产品类型: %s, 新运单号: %s",
                businessTypeNew, deliveryIdNew));
        updateOrder.setUpdateTime(LocalDateTime.now().format(formatter));
        orderService.updateById(updateOrder);

    }
    



}
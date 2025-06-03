package com.test.model.Return;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderTrendReturn {
    private List<String> dateList;      // 日期列表
    private List<Integer> orderCount;    // 订单数列表
    private List<Integer> finishCount;   // 完成数列表
    // getter、setter、构造方法等
}
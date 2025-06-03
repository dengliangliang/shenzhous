package com.test.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeUtils {
    //获取当前时间
    public static String getTime(){
        Date currentDate = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return dateFormat.format(currentDate);
    }

    //获取当前时间
    public static String getDateTime(){
        Date currentDate = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return dateFormat.format(currentDate);
    }

    public static String formatDate(Date date) {
        // 创建SimpleDateFormat对象，以指定格式格式化日期
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

        // 格式化Date对象
        return dateFormat.format(date);
    }
}

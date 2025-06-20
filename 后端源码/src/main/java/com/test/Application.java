package com.test;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@MapperScan("com.test.mapper")
@EnableScheduling  // 启用定时任务支持
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

} 
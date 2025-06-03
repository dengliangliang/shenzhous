package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.Express;
import com.test.model.Return.ExpressReturn;
import com.test.utils.Result;

import java.util.List;

public interface ExpressService extends IService<Express> {
    Result<Express> addExpress(Express express);

    Result<Express> updateExpress(Express express);

    Result<Express> deleteExpress(String id);

    Result<Express> getExpressById(String id);

    Result<ExpressReturn> pageExpress(int pageNum, int pageSize, String expressName, String deliveryType);

    Result<List<Express>> getExpressList(String expressName, String deliveryType);
} 
package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.ExpressType;
import com.test.model.Return.ExpressTypeReturn;
import com.test.utils.Result;

import java.util.List;

public interface ExpressTypeService extends IService<ExpressType> {
    Result<ExpressType> addExpressType(ExpressType expressType);

    Result<ExpressType> updateExpressType(ExpressType expressType);

    Result<ExpressType> deleteExpressType(String id);

    Result<ExpressType> getExpressTypeById(String id);

    Result<ExpressTypeReturn> pageExpressType(int pageNum, int pageSize, String expressTypeName);

    Result<List<ExpressType>> getExpressTypeList(String expressTypeName);
} 
package com.test.controller;

import com.test.model.ExpressType;
import com.test.model.Return.ExpressTypeReturn;
import com.test.model.ExpressType;
import com.test.service.ExpressTypeService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//寄件类型模块
@RequestMapping("/ExpressType")
@RestController
public class ExpressTypeController {

    @Autowired
    private ExpressTypeService expressTypeService;

    //新增快递类型
    @PostMapping("")
    public Result<ExpressType> addExpressType(@RequestBody ExpressType expressType) {
        return expressTypeService.addExpressType(expressType);
    }

    @PutMapping("")
    public Result<ExpressType> updateExpressType(@RequestBody ExpressType expressType) {
        return expressTypeService.updateExpressType(expressType);
    }

    @DeleteMapping("")
    public Result<ExpressType> deleteExpressType(@RequestParam String id) {
        return expressTypeService.deleteExpressType(id);
    }

    @GetMapping("")
    public Result<ExpressType> getExpressTypeById(@RequestParam String id) {
        return expressTypeService.getExpressTypeById(id);
    }

    @GetMapping("/page")
    public Result<ExpressTypeReturn> pageExpressType(
            @RequestParam(value = "pageNum", defaultValue = "0") int pageNum,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam(required = false) String expressTypeName
    ) {
        return expressTypeService.pageExpressType(pageNum, pageSize, expressTypeName);
    }

    @GetMapping("/list")
    public Result<List<ExpressType>> getExpressTypeList(
            @RequestParam(required = false) String expressTypeName) {
        return expressTypeService.getExpressTypeList(expressTypeName);
    }

}

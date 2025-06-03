package com.test.controller;

import com.test.model.Express;
import com.test.model.ExpressType;
import com.test.model.Return.ExpressReturn;
import com.test.model.Return.ExpressTypeReturn;
import com.test.service.ExpressService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/Express")
@RestController
public class ExpressController {

    @Autowired
    private ExpressService expressService;

    //新增快递类型
    @PostMapping("")
    public Result<Express> addExpress(@RequestBody Express express) {
        return expressService.addExpress(express);
    }

    @PutMapping("")
    public Result<Express> updateExpress(@RequestBody Express express) {
        return expressService.updateExpress(express);
    }

    @DeleteMapping("")
    public Result<Express> deleteExpress(@RequestParam String id) {
        return expressService.deleteExpress(id);
    }

    @GetMapping("")
    public Result<Express> getExpressById(@RequestParam String id) {
        return expressService.getExpressById(id);
    }

    @GetMapping("/page")
    public Result<ExpressReturn> pageExpress(
            @RequestParam(value = "pageNum", defaultValue = "0") int pageNum,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam(required = false) String expressName,
            @RequestParam(required = false) String deliveryType
    ) {
        return expressService.pageExpress(pageNum, pageSize, expressName,deliveryType);
    }

    @GetMapping("/list")
    public Result<List<Express>> getExpressList(
            @RequestParam(required = false) String expressName,
            @RequestParam(required = false) String deliveryType) {
        return expressService.getExpressList(expressName,deliveryType);
    }

}

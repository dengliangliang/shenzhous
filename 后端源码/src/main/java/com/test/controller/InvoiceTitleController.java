package com.test.controller;

import com.test.model.InvoiceTitle;
import com.test.model.Return.InvoiceTitleReturn;
import com.test.model.InvoiceTitle;
import com.test.model.UserAddress;
import com.test.service.InvoiceTitleService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//发票抬头模块
@RequestMapping("/InvoiceTitle")
@RestController
public class InvoiceTitleController {
    
    @Autowired
    private InvoiceTitleService invoiceTitleService;

    //新增发票抬头
    @PostMapping("")
    public Result<InvoiceTitle> addInvoiceTitle(@RequestBody InvoiceTitle invoiceTitle) {
        return invoiceTitleService.addInvoiceTitle(invoiceTitle);
    }

    @PutMapping("")
    public Result<InvoiceTitle> updateInvoiceTitle(@RequestBody InvoiceTitle invoiceTitle) {
        return invoiceTitleService.updateInvoiceTitle(invoiceTitle);
    }

    @DeleteMapping("")
    public Result<InvoiceTitle> deleteInvoiceTitle(@RequestParam String id) {
        return invoiceTitleService.deleteInvoiceTitle(id);
    }

    @GetMapping("")
    public Result<InvoiceTitle> getInvoiceTitleById(@RequestParam String id) {
        return invoiceTitleService.getInvoiceTitleById(id);
    }

    @GetMapping("/getDefault")
    public Result<InvoiceTitle> getDefault(@RequestParam String id,@RequestParam Integer type) {
        return invoiceTitleService.getDefault(id,type);
    }

    @GetMapping("/page")
    public Result<InvoiceTitleReturn> pageInvoiceTitle(
            @RequestParam(value = "pageNum", defaultValue = "0") int pageNum,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam Integer type,
            @RequestParam String userId
    ) {
        return invoiceTitleService.pageInvoiceTitle(pageNum, pageSize, type,userId);
    }

    @GetMapping("/list")
    public Result<List<InvoiceTitle>> getInvoiceTitleList(
            @RequestParam Integer type,
            @RequestParam String userId
            ) {
        return invoiceTitleService.getInvoiceTitleList(type,userId);
    }


}

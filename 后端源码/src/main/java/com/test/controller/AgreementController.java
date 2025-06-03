package com.test.controller;

import com.test.model.Agreement;
import com.test.model.Return.AgreementReturn;
import com.test.service.AgreementService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//协议模块
@RequestMapping("/Agreement")
@RestController
public class AgreementController {
    
    @Autowired
    private AgreementService agreementService;
    
    @PostMapping("")
    public Result<Agreement> addAgreement(@RequestBody Agreement agreement) {
        return agreementService.addAgreement(agreement);
    }

    @PutMapping("")
    public Result<Agreement> updateAgreement(@RequestBody Agreement agreement) {
        return agreementService.updateAgreement(agreement);
    }

    @DeleteMapping("")
    public Result<Agreement> deleteAgreement(@RequestParam String id) {
        return agreementService.deleteAgreement(id);
    }

    @GetMapping("")
    public Result<Agreement> getAgreementById(@RequestParam Integer type) {
        return agreementService.getAgreementById(type);
    }

    @GetMapping("/page")
    public Result<AgreementReturn> pageAgreement(
            @RequestParam(value = "pageNum", defaultValue = "0") int pageNum,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam(required = false) Integer agreementType
    ) {
        return agreementService.pageAgreement(pageNum, pageSize,agreementType);
    }

    @GetMapping("/list")
    public Result<List<Agreement>> getAgreementList() {
        return agreementService.getAgreementList();
    }
    
}

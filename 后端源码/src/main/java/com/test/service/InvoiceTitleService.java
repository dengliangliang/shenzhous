package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.InvoiceTitle;
import com.test.model.Return.InvoiceTitleReturn;
import com.test.utils.Result;

import java.util.List;

public interface InvoiceTitleService extends IService<InvoiceTitle> {
    Result<InvoiceTitle> addInvoiceTitle(InvoiceTitle invoiceTitle);

    Result<InvoiceTitle> updateInvoiceTitle(InvoiceTitle invoiceTitle);

    Result<InvoiceTitle> deleteInvoiceTitle(String id);

    Result<InvoiceTitle> getInvoiceTitleById(String id);

    Result<InvoiceTitleReturn> pageInvoiceTitle(int pageNum, int pageSize, Integer type, String userId);

    Result<List<InvoiceTitle>> getInvoiceTitleList(Integer type, String userId);

    Result<InvoiceTitle> getDefault(String id,Integer type);
}
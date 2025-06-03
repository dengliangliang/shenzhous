package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.Agreement;
import com.test.model.Return.AgreementReturn;
import com.test.utils.Result;

import java.util.List;

public interface AgreementService extends IService<Agreement> {
    Result<Agreement> addAgreement(Agreement agreement);

    Result<Agreement> updateAgreement(Agreement agreement);

    Result<Agreement> deleteAgreement(String id);

    Result<Agreement> getAgreementById(Integer type);

    Result<AgreementReturn> pageAgreement(int pageNum, int pageSize,Integer agreementType);

    Result<List<Agreement>> getAgreementList();
}
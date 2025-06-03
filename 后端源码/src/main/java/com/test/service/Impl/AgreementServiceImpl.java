package com.test.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.AgreementMapper;
import com.test.model.Agreement;
import com.test.model.Return.AgreementReturn;
import com.test.service.AgreementService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.test.utils.TimeUtils.getTime;
import static com.test.utils.UUIDUtils.getUUID;

@Service
public class AgreementServiceImpl extends ServiceImpl<AgreementMapper, Agreement> implements AgreementService {

    @Autowired
    private AgreementMapper agreementMapper;

    @Override
    public Result<Agreement> addAgreement(Agreement agreement) {
        QueryWrapper<Agreement> queryWrapper = new QueryWrapper<Agreement>();
        queryWrapper.eq("agreement_type",agreement.getAgreementType());
        Agreement a = agreementMapper.selectOne(queryWrapper);
        if (ObjectUtils.isNotEmpty(a)) {
            return Result.fail("新增失败，该类型的协议已存在");
        }
        agreement.setAgreementId(getUUID());
        agreement.setCreateTime(getTime());
        agreement.setUpdateTime(getTime());
        agreementMapper.insert(agreement);
        return Result.success("新增成功",agreement);
    }

    @Override
    public Result<Agreement> updateAgreement(Agreement agreement) {
        Agreement a1 = agreementMapper.selectById(agreement.getAgreementId());
        if (ObjectUtils.isEmpty(a1)) {
            return Result.fail("修改失败，该协议不存在");
        }
        if (!a1.getAgreementType().equals(agreement.getAgreementType())) {
            QueryWrapper<Agreement> queryWrapper = new QueryWrapper<Agreement>();
            queryWrapper.eq("agreement_type",agreement.getAgreementType());
            queryWrapper.ge("agreement_id",agreement.getAgreementId());
            Agreement a2 = agreementMapper.selectOne(queryWrapper);
            if (ObjectUtils.isNotEmpty(a2)) {
                return Result.fail("修改失败，该类型的协议已存在");
            }
        }

        agreement.setUpdateTime(getTime());
        agreementMapper.updateById(agreement);
        return Result.success("修改成功",agreement);
    }

    @Override
    public Result<Agreement> deleteAgreement(String id) {
        Agreement a1 = agreementMapper.selectById(id);
        if (ObjectUtils.isEmpty(a1)) {
            return Result.fail("删除失败，该协议不存在");
        }
        agreementMapper.deleteById(id);
        return Result.success("修改成功",a1);
    }

    @Override
    public Result<Agreement> getAgreementById(Integer type) {
        QueryWrapper<Agreement> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("agreement_type",type);
        Agreement a = agreementMapper.selectOne(queryWrapper);
        if (ObjectUtils.isEmpty(a)) {
            return Result.fail("查询失败，该类型的协议不存在");
        }
        return Result.success("查询成功",a);
    }

    @Override
    public Result<AgreementReturn> pageAgreement(int pageNum, int pageSize,Integer agreementType) {
        QueryWrapper<Agreement> queryWrapper = new QueryWrapper<>();
        if (agreementType != null) {
            queryWrapper.eq("agreement_type",agreementType);
        }
        IPage<Agreement> page = this.page(new Page<>(pageNum, pageSize), new QueryWrapper<Agreement>());
        AgreementReturn agreementReturn = new AgreementReturn();
        agreementReturn.setCurrentPage(pageNum);
        agreementReturn.setPageSize(pageSize);
        agreementReturn.setTotalPages(page.getTotal());
        agreementReturn.setDataList(page.getRecords());
        return Result.success("查询成功",agreementReturn);
    }

    @Override
    public Result<List<Agreement>> getAgreementList() {

        return Result.success("查询成功",this.list());
    }
}
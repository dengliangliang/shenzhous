package com.test.service.Impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.InvoiceTitleMapper;
import com.test.mapper.UserMapper;
import com.test.model.InvoiceTitle;
import com.test.model.Return.InvoiceTitleReturn;
import com.test.model.User;
import com.test.model.UserAddress;
import com.test.service.InvoiceTitleService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.test.utils.TimeUtils.getTime;
import static com.test.utils.UUIDUtils.getUUID;

@Service
public class InvoiceTitleServiceImpl extends ServiceImpl<InvoiceTitleMapper, InvoiceTitle> implements InvoiceTitleService {

    @Autowired
    private InvoiceTitleMapper invoiceTitleMapper;

    @Autowired
    private UserMapper userMapper;

    @Override
    public Result<InvoiceTitle> addInvoiceTitle(InvoiceTitle invoiceTitle) {
        User user = userMapper.selectById(invoiceTitle.getUserId());
        if (ObjectUtils.isEmpty(user)||user.getIsDelete()==1) {
            return Result.fail("新增失败，该用户不存在");
        }
        if (invoiceTitle.getIsDefault()==1){
            QueryWrapper<InvoiceTitle> wrapper = new QueryWrapper<>();
            wrapper.eq("user_id",invoiceTitle.getUserId());
            wrapper.eq("is_default",1);
            wrapper.eq("is_delete",0);
            InvoiceTitle i = invoiceTitleMapper.selectOne(wrapper);
            if (ObjectUtils.isNotEmpty(i)){
                i.setIsDefault(0);
                this.updateById(i);
            }
        }
        invoiceTitle.setTitleId(getUUID());
        invoiceTitle.setCreateTime(getTime());
        invoiceTitle.setUpdateTime(getTime());
        invoiceTitleMapper.insert(invoiceTitle);
        return Result.success("新增成功",invoiceTitle);

    }

    @Override
    public Result<InvoiceTitle> updateInvoiceTitle(InvoiceTitle invoiceTitle) {
        InvoiceTitle i1 = invoiceTitleMapper.selectById(invoiceTitle.getTitleId());
        if (ObjectUtils.isEmpty(i1)||i1.getIsDelete()==1){
            return Result.fail("修改失败，该发票抬头不存在");
        }
        if (invoiceTitle.getIsDefault()==1){
            QueryWrapper<InvoiceTitle> wrapper = new QueryWrapper<>();
            wrapper.eq("user_id",invoiceTitle.getUserId());
            wrapper.eq("is_default",1);
            wrapper.eq("is_delete",0);
            InvoiceTitle i = invoiceTitleMapper.selectOne(wrapper);
            if (ObjectUtils.isNotEmpty(i)){
                i.setIsDefault(0);
                this.updateById(i);
            }
        }
        invoiceTitle.setUpdateTime(getTime());
        invoiceTitleMapper.updateById(invoiceTitle);
        return Result.success("修改成功",invoiceTitle);
    }

    @Override
    public Result<InvoiceTitle> deleteInvoiceTitle(String id) {
        InvoiceTitle i1 = invoiceTitleMapper.selectById(id);
        if (ObjectUtils.isEmpty(i1)||i1.getIsDelete()==1){
            return Result.fail("删除失败，该发票抬头不存在");
        }
        i1.setIsDelete(1);
        i1.setUpdateTime(getTime());
        invoiceTitleMapper.updateById(i1);
        return Result.success("删除成功",i1);
    }

    @Override
    public Result<InvoiceTitle> getInvoiceTitleById(String id) {
        InvoiceTitle i1 = invoiceTitleMapper.selectById(id);
        if (ObjectUtils.isEmpty(i1)||i1.getIsDelete()==1){
            return Result.fail("查询失败，该发票抬头不存在");
        }
        return Result.success("查询成功",i1);
    }

    @Override
    public Result<InvoiceTitleReturn> pageInvoiceTitle(int pageNum, int pageSize, Integer type, String userId) {
        QueryWrapper<InvoiceTitle> wrapper = new QueryWrapper<>();
        wrapper.eq("type",type);
        wrapper.eq("user_id",userId);
        wrapper.eq("is_delete",0);
        wrapper.orderByAsc("create_time");
        IPage<InvoiceTitle> page = invoiceTitleMapper.selectPage(new Page<>(pageNum, pageSize), wrapper);
        InvoiceTitleReturn invoiceTitleReturn = new InvoiceTitleReturn();
        invoiceTitleReturn.setCurrentPage(pageNum);
        invoiceTitleReturn.setPageSize(pageSize);
        invoiceTitleReturn.setTotalPages(page.getTotal());
        invoiceTitleReturn.setDataList(page.getRecords());
        return Result.success("查询成功",invoiceTitleReturn);
    }

    @Override
    public Result<List<InvoiceTitle>> getInvoiceTitleList(Integer type, String userId) {
        QueryWrapper<InvoiceTitle> wrapper = new QueryWrapper<>();
        wrapper.eq("type", type);
        wrapper.eq("user_id", userId);
        wrapper.eq("is_delete", 0);
        wrapper.orderByAsc("create_time");
        List<InvoiceTitle> list = invoiceTitleMapper.selectList(wrapper);
        return Result.success("查询成功", list);
    }
    @Override
    public Result<InvoiceTitle> getDefault(String id,Integer type) {
        QueryWrapper<InvoiceTitle> wrapper = new QueryWrapper<>();
        wrapper.eq("type",type);
        wrapper.eq("is_default",1);
        wrapper.eq("is_delete",0);
        wrapper.eq("user_id",id);
        InvoiceTitle i1 = invoiceTitleMapper.selectOne(wrapper);
        if (ObjectUtils.isEmpty(i1)||i1.getIsDelete()==1){
            return Result.fail("查询失败，该用户下没有默认发票抬头");
        }
        return Result.success("查询成功",i1);
    }
}
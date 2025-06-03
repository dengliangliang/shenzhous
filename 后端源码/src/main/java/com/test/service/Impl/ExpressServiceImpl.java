package com.test.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.ExpressMapper;
import com.test.model.Express;
import com.test.model.Return.ExpressReturn;
import com.test.service.ExpressService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

import static com.test.utils.TimeUtils.getTime;
import static com.test.utils.UUIDUtils.getUUID;

@Service
public class ExpressServiceImpl extends ServiceImpl<ExpressMapper, Express> implements ExpressService {

    @Autowired
    private ExpressMapper expressMapper;

    @Override
    public Result<Express> addExpress(Express express) {
        QueryWrapper<Express> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("express_name", express.getExpressName()).or().eq("delivery_type", express.getDeliveryType());
        List<Express> e1 = this.list(queryWrapper);
        if (e1.size() > 0) {
            return Result.fail("新增失败，该快递公司已存在");
        }
        express.setExpressId(getUUID());
        express.setProfit(BigDecimal.valueOf(0));
        express.setUpdateTime(getTime());
        express.setCreateTime(getTime());
        this.save(express);
        return Result.success("新增成功",express);
    }

    @Override
    public Result<Express> updateExpress(Express express) {
        Express e = expressMapper.selectById(express.getExpressId());
        if (ObjectUtils.isEmpty(e)) {
            return Result.fail("修改失败，该快递公司不存在");
        }
        express.setUpdateTime(getTime());
        this.updateById(express);
        return Result.success("修改成功",express);
    }

    @Override
    public Result<Express> deleteExpress(String id) {
        Express e = expressMapper.selectById(id);
        if (ObjectUtils.isEmpty(e)) {
            return Result.fail("删除失败，该快递公司不存在");
        }
        this.removeById(id);
        return Result.success("删除成功",e);
    }

    @Override
    public Result<Express> getExpressById(String id) {
        Express e = expressMapper.selectById(id);
        if (ObjectUtils.isEmpty(e)) {
            return Result.fail("查询失败，该快递公司不存在");
        }
        return Result.success("查询成功",e);
    }

    @Override
    public Result<ExpressReturn> pageExpress(int pageNum, int pageSize, String expressName, String deliveryType) {
        QueryWrapper<Express> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotEmpty(expressName)){
            queryWrapper.like("express_name", expressName);
        }
        if (StringUtils.isNotEmpty(deliveryType)){
            queryWrapper.eq("delivery_type", deliveryType);
        }
        IPage<Express> page = this.page(new Page<>(pageNum, pageSize), queryWrapper);
        ExpressReturn expressReturn = new ExpressReturn();
        expressReturn.setCurrentPage(pageNum);
        expressReturn.setPageSize(pageSize);
        expressReturn.setTotalPages(page.getTotal());
        expressReturn.setDataList(page.getRecords());
        return Result.success("查询成功",expressReturn);
    }

    @Override
    public Result<List<Express>> getExpressList(String expressName, String deliveryType) {
        QueryWrapper<Express> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotEmpty(expressName)){
            queryWrapper.like("express_name", expressName);
        }
        if (StringUtils.isNotEmpty(deliveryType)){
            queryWrapper.eq("delivery_type", deliveryType);
        }
        List<Express> e1 = this.list(queryWrapper);
        return Result.success("查询成功",e1);
    }
}
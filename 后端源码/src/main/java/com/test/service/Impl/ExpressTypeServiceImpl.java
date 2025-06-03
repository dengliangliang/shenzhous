package com.test.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.ExpressTypeMapper;
import com.test.model.ExpressType;
import com.test.model.Return.ExpressTypeReturn;
import com.test.service.ExpressTypeService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.test.utils.TimeUtils.getTime;
import static com.test.utils.UUIDUtils.getUUID;

@Service
public class ExpressTypeServiceImpl extends ServiceImpl<ExpressTypeMapper, ExpressType> implements ExpressTypeService {

    @Autowired
    private ExpressTypeMapper expressTypeMapper;

    @Override
    public Result<ExpressType> addExpressType(ExpressType expressType) {
        QueryWrapper<ExpressType> queryWrapper = new QueryWrapper<ExpressType>();
        queryWrapper.eq("type_name", expressType.getTypeName());
        ExpressType e = expressTypeMapper.selectOne(queryWrapper);
        if (ObjectUtils.isNotEmpty(e)){
            return Result.fail("新增失败，该类型已存在");
        }
        expressType.setTypeId(getUUID());
        expressType.setCreateTime(getTime());
        expressType.setUpdateTime(getTime());
        expressTypeMapper.insert(expressType);
        return Result.success("新增成功",expressType);
    }

    @Override
    public Result<ExpressType> updateExpressType(ExpressType expressType) {
        ExpressType e1 = this.getById(expressType.getTypeId());
        if (ObjectUtils.isEmpty(e1)){
            return Result.fail("修改失败，该类型不存在");
        }
        QueryWrapper<ExpressType> queryWrapper = new QueryWrapper<ExpressType>();
        queryWrapper.eq("type_name", expressType.getTypeName());
        ExpressType e2 = expressTypeMapper.selectOne(queryWrapper);
        if (ObjectUtils.isNotEmpty(e2)){
            return Result.fail("修改失败，该类型已存在");
        }
        expressType.setUpdateTime(getTime());
        expressTypeMapper.updateById(expressType);
        return Result.success("修改成功",expressType);
    }

    @Override
    public Result<ExpressType> deleteExpressType(String id) {
        ExpressType e1 = this.getById(id);
        if (ObjectUtils.isEmpty(e1)){
            return Result.fail("删除失败，该类型不存在");
        }
        this.removeById(id);
        return Result.success("删除成功",e1);
    }

    @Override
    public Result<ExpressType> getExpressTypeById(String id) {
        ExpressType e1 = this.getById(id);
        if (ObjectUtils.isEmpty(e1)){
            return Result.fail("查询失败，该类型不存在");
        }
        return Result.success("查询成功",e1);
    }

    @Override
    public Result<ExpressTypeReturn> pageExpressType(int pageNum, int pageSize, String expressTypeName) {
        QueryWrapper<ExpressType> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotEmpty(expressTypeName)){
            queryWrapper.like("type_name", expressTypeName);
        }
        IPage<ExpressType> expressTypeIPage = expressTypeMapper.selectPage(new Page<>(pageNum, pageSize), queryWrapper);
        ExpressTypeReturn expressTypeReturn = new ExpressTypeReturn();
        expressTypeReturn.setCurrentPage(pageNum);
        expressTypeReturn.setPageSize(pageSize);
        expressTypeReturn.setTotalPages(expressTypeIPage.getTotal());
        expressTypeReturn.setDataList(expressTypeIPage.getRecords());
        return Result.success("查询成功",expressTypeReturn);
    }

    @Override
    public Result<List<ExpressType>> getExpressTypeList(String expressTypeName) {
        QueryWrapper<ExpressType> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotEmpty(expressTypeName)){
            queryWrapper.like("type_name", expressTypeName);
        }
        List<ExpressType> expressTypeList = expressTypeMapper.selectList(queryWrapper);
        return Result.success("查询成功",expressTypeList);
    }
}
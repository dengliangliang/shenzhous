package com.test.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.NoticeMapper;
import com.test.model.Notice;
import com.test.model.Return.NoticeReturn;
import com.test.service.NoticeService;
import com.test.utils.Result;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
public class NoticeServiceImpl extends ServiceImpl<NoticeMapper, Notice> implements NoticeService {

    @Override
    public Result<List<Notice>> getNoticeList() {
        try {
            QueryWrapper<Notice> wrapper = new QueryWrapper<>();
            wrapper.eq("is_delete", 0)
                    .orderByDesc("create_time");
            List<Notice> list = this.list(wrapper);
            return Result.success(list);
        } catch (Exception e) {
            return Result.fail("获取公告列表失败");
        }
    }

    @Override
    public Result<List<Notice>> getLatestNotices() {
        try {
            QueryWrapper<Notice> wrapper = new QueryWrapper<>();
            wrapper.orderByDesc("create_time");
            wrapper.eq("is_delete", 0);
            List<Notice> list = this.list(wrapper);
            return Result.success(list);
        } catch (Exception e) {
            return Result.fail("获取最新公告失败");
        }
    }

    @Override
    public Result<String> addNotice(Notice notice) {
        try {
            String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            notice.setNoticeId("notice_" + UUID.randomUUID().toString().substring(0, 8));
            notice.setIsDelete(0);
            notice.setCreateTime(now);
            notice.setUpdateTime(now);

            if (this.save(notice)) {
                return Result.success("添加公告成功");
            }
            return Result.fail("添加公告失败");
        } catch (Exception e) {
            return Result.fail("添加公告失败");
        }
    }

    @Override
    public Result<String> updateNotice(Notice notice) {
        try {
            notice.setUpdateTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            if (this.updateById(notice)) {
                return Result.success("修改公告成功");
            }
            return Result.fail("修改公告失败");
        } catch (Exception e) {
            return Result.fail("修改公告失败");
        }
    }

    @Override
    public Result<String> deleteNotice(String noticeId) {
        try {
            Notice notice = new Notice();
            notice.setNoticeId(noticeId);
            notice.setIsDelete(1);
            notice.setUpdateTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

            if (this.updateById(notice)) {
                return Result.success("删除公告成功");
            }
            return Result.fail("删除公告失败");
        } catch (Exception e) {
            return Result.fail("删除公告失败");
        }
    }

    @Override
    public Result<NoticeReturn> pageNotice(int pageNum, int pageSize, Integer type) {
        try {
            QueryWrapper<Notice> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("is_delete", 0);

            // 如果指定了公告类型，添加类型条件
            if (type != null) {
                queryWrapper.eq("type", type);
            }

            // 按创建时间降序排序
            queryWrapper.orderByDesc("create_time");

            // 执行分页查询
            IPage<Notice> page = this.page(new Page<>(pageNum, pageSize), queryWrapper);
            List<Notice> notices = page.getRecords();

            // 封装返回数据
            NoticeReturn noticeReturn = new NoticeReturn();
            noticeReturn.setPageSize(pageSize);
            noticeReturn.setCurrentPage(pageNum);
            noticeReturn.setDataList(notices);
            noticeReturn.setTotalPages(page.getTotal());

            return Result.success("查询成功", noticeReturn);
        } catch (Exception e) {
            return Result.fail("查询失败：" + e.getMessage());
        }
    }
}
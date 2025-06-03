package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.Notice;
import com.test.model.Return.NoticeReturn;
import com.test.utils.Result;
import java.util.List;

public interface NoticeService extends IService<Notice> {

    // 获取公告列表
    Result<List<Notice>> getNoticeList();

    // 获取最新的4条公告
    Result<List<Notice>> getLatestNotices();

    // 添加公告
    Result<String> addNotice(Notice notice);

    // 修改公告
    Result<String> updateNotice(Notice notice);

    // 删除公告
    Result<String> deleteNotice(String noticeId);

    Result<NoticeReturn> pageNotice(int pageNum, int pageSize, Integer type);
}
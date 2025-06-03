package com.test.controller;

import com.test.model.Notice;
import com.test.model.Return.NoticeReturn;
import com.test.service.NoticeService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/Notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    /**
     * 获取公告列表
     */
    @GetMapping("/list")
    public Result<List<Notice>> getNoticeList() {
        return noticeService.getNoticeList();
    }

    /**
     * 获取最新公告
     */
    @GetMapping("/latest")
    public Result<List<Notice>> getLatestNotices() {
        return noticeService.getLatestNotices();
    }

    /**
     * 添加公告
     */
    @PostMapping
    public Result<String> addNotice(@RequestBody Notice notice) {
        return noticeService.addNotice(notice);
    }

    /**
     * 修改公告
     */
    @PutMapping
    public Result<String> updateNotice(@RequestBody Notice notice) {
        return noticeService.updateNotice(notice);
    }

    /**
     * 删除公告
     */
    @DeleteMapping("/{noticeId}")
    public Result<String> deleteNotice(@PathVariable String noticeId) {
        return noticeService.deleteNotice(noticeId);
    }

    /**
     * 分页获取公告
     */
    @GetMapping("/page")
    public Result<NoticeReturn> pageNotice(
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) Integer type) {
        return noticeService.pageNotice(pageNum, pageSize, type);
    }
}
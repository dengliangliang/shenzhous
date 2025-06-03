// NoticeReturn.java
package com.test.model.Return;

import com.test.model.Notice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoticeReturn {
    private int pageSize;
    private int currentPage;
    private Long totalPages;
    private List<Notice> dataList;
}
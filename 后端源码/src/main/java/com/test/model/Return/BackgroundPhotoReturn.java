package com.test.model.Return;

import com.test.model.BackgroundPhoto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BackgroundPhotoReturn {
    private int pageSize;
    private int currentPage;
    private Long totalPages;
    private List<BackgroundPhoto> dataList;
}
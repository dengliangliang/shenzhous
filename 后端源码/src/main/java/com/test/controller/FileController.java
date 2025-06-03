package com.test.controller;


import com.baomidou.mybatisplus.core.toolkit.StringUtils;

import com.test.config.FileConfig;
import com.test.exception.uploadException;
import com.test.utils.Result;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.PosixFilePermission;
import java.nio.file.attribute.PosixFilePermissions;
import java.util.Set;
import java.util.Arrays;

import static com.test.config.FileConfig.DeleteFolder;
import static com.test.config.FileConfig.URL;

@RequestMapping("/File")
@RestController
public class FileController {

    private final FileConfig fileConfig;

    public FileController(FileConfig fileConfig) {
        this.fileConfig = fileConfig;
    }

    @GetMapping("/**")
    public ResponseEntity<Resource> serveFile() {
        String filePath = ServletUriComponentsBuilder.fromCurrentRequest()
                .build()
                .getPath()
                .substring("/File".length());
        filePath = UriUtils.decode(filePath, "UTF-8");

        try {
            Path path = Paths.get(URL, filePath).normalize().toAbsolutePath();
            Resource resource = new UrlResource(path.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            String mimeType = Files.probeContentType(path);
            if (!Arrays.asList(fileConfig.getAllowedTypes()).contains(mimeType)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(mimeType != null ? mimeType : "application/octet-stream"))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    private String uploadFile(MultipartFile file, String path, String name) throws uploadException {
        try {
            if (file.isEmpty()) {
                throw new uploadException("未找到文件");
            }
            Path directoryPath = Paths.get(path);
            // 检查目录是否存在，不存在则创建
            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }

            // 使用提供的文件名`name`，同时保留原始文件的扩展名
            String originalFilename = file.getOriginalFilename();
            String newFilename = name + (originalFilename != null ? getExtension(originalFilename) : "");

            // 构建目标文件路径
            Path filePath = directoryPath.resolve(newFilename);

            // 检查目标文件是否存在，如果存在则删除
            if (Files.exists(filePath)) {
                Files.delete(filePath);
            }

            // 将上传的文件保存到目标位置
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            if (!System.getProperty("os.name").toLowerCase().contains("win")) {
                // Windows 系统，跳过权限设置
                Set<PosixFilePermission> perms = PosixFilePermissions.fromString("rw-r--r--");
//                System.out.println(filePath);
//                System.out.println(perms);
                Files.setPosixFilePermissions(filePath, perms);
            }
            // 设置文件的权限 - 允许所有者读写，组和其他用户只读


            return filePath.toString();

        } catch (Exception e) {
            throw new uploadException(e.getMessage());
        }
    }

    private String getExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        if (dotIndex > 0 && dotIndex <= filename.length() - 2) {
            return filename.substring(dotIndex);
        }
        return "";
    }



//    @PostMapping("/propertyUpload")
//    @Operation(summary = "上传房源相关图片")
//    public Result<List<String>> propertyUpload(@RequestParam("files") MultipartFile[] files, @RequestParam(required = false) String path, @RequestParam String name) throws IOException {
//        List<String> fileUrls = new ArrayList<>();
//
//        // 如果路径为空，使用默认路径
//        String uploadPath = StringUtils.isNotEmpty(path) ? path : PROPERTY_FOLDER;
//
//        // 遍历所有文件并上传
//        for (MultipartFile file : files) {
//            try {
//                if (!file.isEmpty()) {
//                    // 调用 uploadFile 方法上传文件
//                    String fileUrl = uploadFile(file, uploadPath, name);
//                    fileUrls.add(fileUrl);
//                } else {
//                    // 如果文件为空，记录错误信息
//                    fileUrls.add("文件为空: " + file.getOriginalFilename());
//                }
//            } catch (uploadException e) {
//                // 捕获上传异常并记录错误信息
//                fileUrls.add("上传失败: " + file.getOriginalFilename() + " - " + e.getMessage());
//            }
//        }
//
//        return Result.success(fileUrls);
//    }




    @PostMapping("/orderFileUpload")
    public Result<String> orderFileUpload(@RequestParam("file") MultipartFile file, @RequestParam String name) throws IOException {
        return Result.success(uploadFile(file, URL, name));
    }


    @DeleteMapping("/deleteFile")
    public Result deleteFile(@RequestParam String filePath) {
        if (DeleteFolder(filePath)){
            return Result.success("删除成功");
        }else{
            return Result.fail("删除失败,文件不存在");
        }

    }
}

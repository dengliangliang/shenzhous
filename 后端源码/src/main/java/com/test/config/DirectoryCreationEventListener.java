package com.test.config;


import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import static com.test.config.FileConfig.*;

@Component
public class DirectoryCreationEventListener implements CommandLineRunner {

    @Override
    public void run(String... args) {
        createDirectory(URL);
        System.out.println("图片存储目录: " + URL);
    }

    private void createDirectory(String path) {
        File directory = new File(path);
        if (!directory.exists()) {
            boolean created = createDirWithPermissions(path);
            if (created) {
                System.out.println("创建文件夹: " + path);
            } else {
                System.out.println("创建失败文件夹: " + path);
            }
        } else {
            System.out.println("文件夹已存在: " + path);
        }
    }

    private void copyDefaultUserImage(String directoryPath, String imageName) {
        // 使用类加载器获取资源的输入流
        InputStream is = getClass().getClassLoader().getResourceAsStream("img/" + imageName);
        if (is == null) {
            System.out.println("资源未找到: " + imageName);
            return;
        }

        Path targetPath = Paths.get(directoryPath, imageName);

        try {
            // 使用Files.copy需要将InputStream转换为Path，这里我们直接使用OutputStream
            Files.createDirectories(targetPath.getParent());  // 确保目标目录存在
            Files.copy(is, targetPath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("图片复制成功: " + targetPath);
        } catch (IOException e) {
            System.out.println("图片复制失败: " + e.getMessage());
        } finally {
            try {
                is.close();  // 关闭输入流
            } catch (IOException e) {
                System.out.println("关闭流失败: " + e.getMessage());
            }
        }
    }
}

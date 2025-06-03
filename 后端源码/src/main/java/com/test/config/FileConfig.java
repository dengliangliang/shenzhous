package com.test.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.PosixFilePermission;
import java.nio.file.attribute.PosixFilePermissions;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
@ConfigurationProperties(prefix = "file.upload")
public class FileConfig {
    private String basePath;
    private String[] allowedTypes;
    private String urlPrefix;

    // 获取项目根路径
    public static final String PROJECT_ROOT = System.getProperty("user.dir");
    // 图片存储目录
    public static final String URL = PROJECT_ROOT + File.separator + "img";

    //
// 项目根目录下的子目录名称
//    private static final String BASE_FOLDER = "PortSteward";
//
//    // 动态获取项目根路径（适配不同环境）
//    public static final String PROJECT_ROOT = System.getProperty("user.dir");
//    public static final String URL =  PROJECT_ROOT+ File.separator + BASE_FOLDER;
//
//    // 子目录路径
//    public static final String PROPERTY_FOLDER = URL + File.separator + "property";
//    public static final String MERCHANT_FOLDER = URL + File.separator + "merchant";
//    public static final String GENERAL_FOLDER = URL + File.separator + "otherInformation";
//    public static final String USER_FOLDER = URL + File.separator + "userInformation";
//
//    // 默认文件路径
//    public static final String DEFAULT_USER = USER_FOLDER + File.separator + "not.png";
//    public static final String DEFAULT_MERCHANT = MERCHANT_FOLDER + File.separator + "merchant.jpg";


    // 创建目录并设置权限
    public static boolean createDirWithPermissions(String path) {
        File directory = new File(path);
        if (!directory.exists()) {
            if (!directory.mkdirs()) {
                return false;
            }
            try {
                setPermissions(directory.toPath());
            } catch (IOException e) {
                System.err.println("设置权限时出错: " + e.getMessage());
                return false;
            }
        }
        return true;
    }


    // 设置权限的方法
    private static void setPermissions(Path path) throws IOException {
        if (System.getProperty("os.name").toLowerCase().contains("win")) {
            // Windows 系统，跳过权限设置
            return;
        }
        if (Files.isDirectory(path)) {
            // 为 Unix/Linux 系统设置权限：读、写、执行权限
            Set<PosixFilePermission> permissions = PosixFilePermissions.fromString("rwxr-xr-x");
            Files.setPosixFilePermissions(path, permissions);
        } else {
            // 设置文件权限为可读、可写
            path.toFile().setReadable(true);
            path.toFile().setWritable(true);
            path.toFile().setExecutable(true);
        }
    }

    public static void getAllFile(File fileInput, List<File> allFileList) {
        // 校验 fileInput 是否有效
        if (fileInput == null || !fileInput.exists()) {
            System.out.println("文件或目录不存在：" + fileInput);
            return;
        }
        if (!fileInput.isDirectory()) {
            System.out.println("不是目录：" + fileInput);
            return;
        }

        // 获取文件列表
        File[] fileList = fileInput.listFiles();
        if (fileList == null) {
            System.out.println("无法获取文件列表，可能是权限问题：" + fileInput);
            return;
        }

        for (File file : fileList) {
            if (file.isDirectory()) {
                // 递归处理文件夹
                getAllFile(file, allFileList);
            } else {
                // 添加文件
                allFileList.add(file);
            }
        }
    }


    /**
     * 根据路径删除指定的目录或文件，无论存在与否
     *
     * @param sPath 要删除的目录或文件
     * @return 删除成功返回 true，否则返回 false。
     */
    public static boolean DeleteFolder(String sPath) {
        boolean flag = false;
        File file = new File(sPath);
        // 判断目录或文件是否存在
        if (!file.exists()) {  // 不存在返回 false
            return flag;
        } else {
            // 判断是否为文件
            if (file.isFile()) {  // 为文件时调用删除文件方法
                return deleteFile(sPath);
            } else {  // 为目录时调用删除目录方法
                return deleteDirectory(sPath);
            }
        }
    }

    public static boolean deleteFile(String sPath) {
        boolean flag = false;
        File file = new File(sPath);
        // 路径为文件且不为空则进行删除
        if (file.isFile() && file.exists()) {
            file.delete();
            flag = true;
        }
        return flag;
    }

    /**
     * 删除目录（文件夹）以及目录下的文件
     *
     * @param sPath 被删除目录的文件路径
     * @return 目录删除成功返回true，否则返回false
     */
    public static boolean deleteDirectory(String sPath) {
        //如果sPath不以文件分隔符结尾，自动添加文件分隔符
        if (!sPath.endsWith(File.separator)) {
            sPath = sPath + File.separator;
        }
        File dirFile = new File(sPath);
        //如果dir对应的文件不存在，或者不是一个目录，则退出
        if (!dirFile.exists() || !dirFile.isDirectory()) {
            return false;
        }
        boolean flag = true;
        //删除文件夹下的所有文件(包括子目录)
        File[] files = dirFile.listFiles();
        for (int i = 0; i < files.length; i++) {
            //删除子文件
            if (files[i].isFile()) {
                flag = deleteFile(files[i].getAbsolutePath());
                if (!flag) break;
            } //删除子目录
            else {
                flag = deleteDirectory(files[i].getAbsolutePath());
                if (!flag) break;
            }
        }
        if (!flag) return false;
        //删除当前目录
        if (dirFile.delete()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取指定路径下的所有文件夹名称
     *
     * @param pathStr 指定的路径
     * @return 文件夹名称列表
     */
    public static List<String> getFolderNames(String pathStr) {
        List<String> folderNames = new ArrayList<>();

        try {
            // 将字符串路径转换为 Path 对象
            Path path = Paths.get(pathStr);

            // 确保路径存在并且是一个目录
            if (Files.exists(path) && Files.isDirectory(path)) {
                // 使用 DirectoryStream 遍历目录中的每个条目
                try (DirectoryStream<Path> stream = Files.newDirectoryStream(path)) {
                    for (Path entry : stream) {
                        // 检查条目是否是目录
                        if (Files.isDirectory(entry)) {
                            folderNames.add(entry.getFileName().toString());
                        }
                    }
                } catch (IOException e) {
                    System.err.println("读取目录时出错: " + e.getMessage());
                }
            } else {
                System.out.println("指定的路径不存在或不是目录！");
            }
        } catch (InvalidPathException e) {
            System.err.println("路径格式错误: " + e.getMessage());
        }

        return folderNames;
    }


    public static String renameDirectory(String oldDirectoryName, String newDirectoryName) {
        System.out.println(oldDirectoryName);
        System.out.println(newDirectoryName);
        File oldDir = new File(oldDirectoryName);
        File newDir = new File(oldDir.getParent(), newDirectoryName);
        // 尝试重命名目录
        boolean renamed = oldDir.renameTo(newDir);
        if (renamed) {
            return newDir.getAbsolutePath();
        } else {
            return "-1";
        }
    }

    public static boolean deleteEmptyDirectory(String directoryPath) {
        File directory = new File(directoryPath);

        if (!directory.exists()) {
            return true; // 目录不存在，认为删除成功
        }
        if (!directory.isDirectory()) {
            return false; // 不是目录，无法删除
        }

        // 递归删除目录中的所有内容
        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    // 递归删除子目录
                    deleteDirectory(file.getAbsolutePath());
                } else {
                    // 删除文件
                    file.delete();
                }
            }
        }

        // 删除空目录
        return directory.delete();
    }

    // 生成文件名的方法
    private String generateFileName() {
        // 实现你的文件名生成逻辑，例如根据时间戳等生成唯一的文件名
        return "file.txt";
    }

    // 从URL中提取文件名
    private String getFileNameFromUrl(String fileUrl) {
        String[] segments = fileUrl.split("/");
        return segments[segments.length - 1];
    }

    // Getter 和 Setter
    public String getBasePath() {
        return basePath;
    }

    public void setBasePath(String basePath) {
        this.basePath = basePath;
    }

    public String[] getAllowedTypes() {
        return allowedTypes;
    }

    public void setAllowedTypes(String[] allowedTypes) {
        this.allowedTypes = allowedTypes;
    }

    public String getUrlPrefix() {
        return urlPrefix;
    }

    public void setUrlPrefix(String urlPrefix) {
        this.urlPrefix = urlPrefix;
    }
}

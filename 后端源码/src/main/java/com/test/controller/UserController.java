package com.test.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.test.model.Return.UserReturn;
import com.test.model.User;
import com.test.service.UserService;
import com.test.utils.Result;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.io.IOUtils;

//用户模块
@RequestMapping("/User")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    // 微信小程序相关配置
    private final String appId = "wx2dfe755086f4af5e";
    private final String appSecret = "df389e6841e5fbed20956379f7bef92e";

    //新增用户
    @PostMapping("")
    public Result<User> addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PutMapping("")
    public Result<User> updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @PutMapping("/updateRegularUser")
    public Result<User> updateRegularUser(@RequestBody User user) {
        return userService.updateRegularUser(user);
    }

    @PutMapping("/updatePassword")
    public Result<String> updatePassword(
            @RequestParam String userId,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {
        return userService.updatePassword(userId,oldPassword,newPassword);
    }

    @PutMapping("/updateNewPassword")
    public Result<String> updateNewPassword(
            @RequestParam String userId,
            @RequestParam String newPassword) {
        return userService.updateNewPassword(userId,newPassword);
    }

    @PutMapping("/setGetMoney")
    public Result<String> setGetMoney(
            @RequestParam BigDecimal money) {
        return userService.setGetMoney(money);
    }

    @GetMapping("/isRealByPhone")
    public Result<String> isRealByPhone(
            @RequestParam String phone) {
        return userService.isRealByPhone(phone);
    }

    @PutMapping("/inputCode")
    public Result<String> inputCode(
            @RequestParam String userId,
            @RequestParam String code) {
        return userService.inputCode(userId,code);
    }

    @PutMapping("/inputInvitationCode")
    public Result<String> inputInvitationCode(
            @RequestParam String userId,
            @RequestParam String invitationCode) {
        return userService.inputInvitationCode(userId,invitationCode);
    }

    @DeleteMapping("")
    public Result<User> deleteUser(@RequestParam String userId) {
        return userService.deleteUser(userId);
    }



    @GetMapping("")
    public Result<User> getUserById(@RequestParam String userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/getIsMonth")
    public Result<String> getIsMonth(@RequestParam String userId) {
        return userService.getIsMonth(userId);
    }

    @GetMapping("/page")
        public Result<UserReturn> pageUser(
        @RequestParam(value = "pageNum", defaultValue = "0") int pageNum,
        @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
        @RequestParam(required = false) Integer identity,
        @RequestParam(required = false) Integer isReal,
        @RequestParam(required = false) String userName
    ) {
            return userService.pageUser(pageNum, pageSize, identity, isReal, userName);
    }

    @GetMapping("/list")
    public Result<List<User>> getUserList(
            @RequestParam(required = false) Integer identity,
            @RequestParam(required = false) Integer isReal,
            @RequestParam(required = false) String userName) {
        return userService.getUserList(identity,isReal,userName);
    }

    @PostMapping("/authentication")
    public Result<Object> authentication(
            @RequestParam String userId,
            @RequestParam String userName,
            @RequestParam String identification,
            @RequestParam String phone) {
        try {
            return userService.authentication(userId,userName,identification,phone);
        }catch (Exception e){
            return Result.fail("实名认证失败"+e.getMessage());
        }

    }
    /**
     * 导出所有用户信息为Excel
     * @param identity 用户身份（可选）
     * @param isReal 实名状态（可选）
     * @param userName 用户名（可选）
     * @return Excel文件
     */
    @GetMapping("/export")
    public ResponseEntity<byte[]> exportUsers(
            @RequestParam(required = false) Integer identity,
            @RequestParam(required = false) Integer isReal,
            @RequestParam(required = false) String userName) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("is_delete", 0); // 默认条件

        // 设置默认identity为1（普通用户）
        if (identity == null) {
            identity = 1;
        }
        wrapper.eq("identity", identity);

        if (isReal != null) {
            wrapper.eq("is_real", isReal);
        }
        if (StringUtils.isNotEmpty(userName)) {
            wrapper.like("user_name", userName);
        }
        wrapper.orderByDesc("create_time");
        List<User> userList = userService.list(wrapper);

        try {
            // 创建工作簿
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("用户信息");
            
            // 设置一个样式，用于处理中文
            Font font = workbook.createFont();
            font.setFontName("宋体"); // 使用宋体以支持中文
            CellStyle style = workbook.createCellStyle();
            style.setFont(font);
            
            // 创建表头
            Row headerRow = sheet.createRow(0);
            String[] headers = {
                    "用户ID", "用户名", "电话", "身份证号", "佣金余额", "身份",
                    "实名状态", "邀请码", "获得佣金", "被邀请人", "月结资格",
                    "是否可提现", "是否启用", "创建时间", "更新时间"
            };

            // 添加表头并应用样式
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(style);
                // 自动调整列宽
                sheet.autoSizeColumn(i);
            }

            // 填充数据
            int rowNum = 1;
            for (User user : userList) {
                Row row = sheet.createRow(rowNum++);

                // 添加单元格并应用样式
                createCell(row, 0, user.getUserId(), style);
                createCell(row, 1, user.getUserName(), style);
                createCell(row, 2, user.getPhone(), style);
                createCell(row, 3, user.getIdentification(), style);
                createCell(row, 4, user.getMoney() != null ? user.getMoney().doubleValue() : 0, style);

                // 身份转换
                String identityStr = user.getIdentity() != null && user.getIdentity() == 0 ? "管理员" : "普通用户";
                createCell(row, 5, identityStr, style);

                // 实名状态转换
                String realStatus = "未实名";
                if (user.getIsReal() != null) {
                    if (user.getIsReal() == 1) realStatus = "审核中";
                    else if (user.getIsReal() == 2) realStatus = "已实名";
                }
                createCell(row, 6, realStatus, style);

                createCell(row, 7, user.getMyCode(), style);
                createCell(row, 8, user.getGetMoney() != null ? user.getGetMoney().doubleValue() : 0, style);
                createCell(row, 9, user.getBeInvited(), style);

                // 月结资格
                String monthStatus = user.getIsMonth() != null && user.getIsMonth() == 1 ? "是" : "否";
                createCell(row, 10, monthStatus, style);

                // 是否可提现
                String canWithdraw = user.getIsGetMoney() != null && user.getIsGetMoney() == 0 ? "是" : "否";
                createCell(row, 11, canWithdraw, style);

                // 是否启用
                String isEnabled = user.getIsEnable() != null && user.getIsEnable() == 0 ? "是" : "否";
                createCell(row, 12, isEnabled, style);

                createCell(row, 13, user.getCreateTime(), style);
                createCell(row, 14, user.getUpdateTime(), style);
            }

            // 调整所有列的宽度以适应内容
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
                // 给一些额外的宽度，防止中文显示不全
                int currentWidth = sheet.getColumnWidth(i);
                sheet.setColumnWidth(i, currentWidth + 500);
            }

            // 将workbook写入字节数组输出流
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            workbook.close();

            // 获取字节数组
            byte[] excelBytes = outputStream.toByteArray();
            
            // 设置文件名 - 使用 UTF-8 编码
            String fileName = "用户信息表_" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + ".xlsx";
            String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8.toString())
                    .replaceAll("\\+", "%20");

            // 设置HTTP响应头 
            HttpHeaders header = new HttpHeaders();
            // RFC 5987 编码的文件名
            header.add("Content-Disposition", "attachment; filename*=UTF-8''" + encodedFileName);
            header.add("Cache-Control", "no-cache, no-store, must-revalidate");
            header.add("Pragma", "no-cache");
            header.add("Expires", "0");
            // 明确指定内容类型
            header.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            // 指定编码
            header.add("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8");
            
            // 返回ResponseEntity
            return new ResponseEntity<>(excelBytes, header, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * 创建单元格并设置样式
     */
    private void createCell(Row row, int columnIndex, Object value, CellStyle style) {
        Cell cell = row.createCell(columnIndex);
        if (value == null) {
            cell.setCellValue("");
        } else if (value instanceof String) {
            cell.setCellValue((String) value);
        } else if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if (value instanceof Long) {
            cell.setCellValue((Long) value);
        } else if (value instanceof Double) {
            cell.setCellValue((Double) value);
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        } else {
            cell.setCellValue(value.toString());
        }
        
        if (style != null) {
            cell.setCellStyle(style);
        }
    }

    /**
     * CSV字段转义
     * @param field 字段值
     * @return 转义后的值
     */
    private String escapeCSV(Object field) {
        if (field == null) return "";
        String value = field.toString();
        // 如果包含逗号、引号或换行，则用引号包围并将引号替换为两个引号
        if (value.contains(",") || value.contains("\"") || value.contains("\n")) {
            return "\"" + value.replace("\"", "\"\"") + "\"";
        }
        return value;
    }

    /**
     * 生成微信小程序码
     * @param page 小程序页面路径
     * @param scene 小程序参数
     * @return 小程序码图片
     */
    @GetMapping("/wxacode")
    public ResponseEntity<byte[]> getWxacode(
            @RequestParam(defaultValue = "pages/index/index") String page,
            @RequestParam(required = false) String scene) {
        
        try {
            // 1. 获取访问令牌
            String accessToken = getAccessToken(appId, appSecret);
            if (accessToken == null) {
                HttpHeaders textHeaders = new HttpHeaders();
                textHeaders.setContentType(new MediaType("text", "plain", StandardCharsets.UTF_8));
                return new ResponseEntity<>("获取微信访问令牌失败".getBytes(StandardCharsets.UTF_8), 
                    textHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            
            // 2. 使用访问令牌调用微信小程序码生成接口
            byte[] wxacodeBytes = generateWxacode(accessToken, page, scene);
            if (wxacodeBytes == null) {
                HttpHeaders textHeaders = new HttpHeaders();
                textHeaders.setContentType(new MediaType("text", "plain", StandardCharsets.UTF_8));
                return new ResponseEntity<>("生成小程序码失败".getBytes(StandardCharsets.UTF_8), 
                    textHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            
            // 3. 设置HTTP响应头
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(new MediaType("image", "png"));
            
            // 4. 返回小程序码图片
            return new ResponseEntity<>(wxacodeBytes, headers, HttpStatus.OK);
            
        } catch (Exception e) {
            e.printStackTrace();
            HttpHeaders textHeaders = new HttpHeaders();
            textHeaders.setContentType(new MediaType("text", "plain", StandardCharsets.UTF_8));
            return new ResponseEntity<>(
                ("生成小程序码异常: " + e.getMessage()).getBytes(StandardCharsets.UTF_8),
                textHeaders,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * 获取微信小程序访问令牌
     */
    private String getAccessToken(String appId, String appSecret) {
        String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential" +
                    "&appid=" + appId + "&secret=" + appSecret;
        
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpGet httpGet = new HttpGet(url);
            
            try (CloseableHttpResponse response = httpClient.execute(httpGet)) {
                HttpEntity entity = response.getEntity();
                if (entity != null) {
                    String result = EntityUtils.toString(entity);
                    JSONObject jsonObject = JSON.parseObject(result);
                    
                    if (jsonObject.containsKey("access_token")) {
                        return jsonObject.getString("access_token");
                    } else {
                        System.err.println("获取access_token失败: " + result);
                        return null;
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("获取access_token异常: " + e.getMessage());
        }
        return null;
    }
    
    /**
     * 生成微信小程序码
     */
    private byte[] generateWxacode(String accessToken, String page, String scene) {
        String url = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=" + accessToken;
        
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost httpPost = new HttpPost(url);
            
            // 构建请求参数
            JSONObject params = new JSONObject();
            // 场景值，最大32个可见字符
            params.put("scene", scene == null ? "default" : scene);
            // 小程序页面
            params.put("page", page);
            // 宽度，默认430
            params.put("width", 430);
            // 是否需要透明底色
            params.put("is_hyaline", false);
            // 自动配置线条颜色
            params.put("auto_color", true);
            
            StringEntity stringEntity = new StringEntity(params.toJSONString(), "UTF-8");
            stringEntity.setContentType("application/json");
            httpPost.setEntity(stringEntity);
            
            try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
                HttpEntity entity = response.getEntity();
                if (entity != null) {
                    try (InputStream inputStream = entity.getContent()) {
                        // 微信返回的是图片二进制流或者错误JSON，需要判断
                        byte[] bytes = IOUtils.toByteArray(inputStream);
                        // 如果返回的是JSON错误信息，一般都很短，而且包含errcode
                        if (bytes.length < 1000) {
                            try {
                                String result = new String(bytes, StandardCharsets.UTF_8);
                                JSONObject jsonObject = JSON.parseObject(result);
                                if (jsonObject.containsKey("errcode") && jsonObject.getIntValue("errcode") != 0) {
                                    System.err.println("生成小程序码失败: " + result);
                                    return null;
                                }
                            } catch (Exception e) {
                                // 解析异常说明返回的可能是图片数据
                            }
                        }
                        return bytes;
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("生成小程序码异常: " + e.getMessage());
        }
        return null;
    }


    

    
    /**
     * 获取微信小程序用户的OpenId
     * @param code 小程序前端获取的临时登录凭证
     * @return 用户OpenId
     */
    @GetMapping("/getOpenId")
    public Result<Map<String, String>> getOpenId(@RequestParam String code) {
        try {
            String url = "https://api.weixin.qq.com/sns/jscode2session" + 
                    "?appid=" + appId + 
                    "&secret=" + appSecret + 
                    "&js_code=" + code + 
                    "&grant_type=authorization_code";
            
            try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                HttpGet httpGet = new HttpGet(url);
                
                try (CloseableHttpResponse response = httpClient.execute(httpGet)) {
                    HttpEntity entity = response.getEntity();
                    if (entity != null) {
                        String result = EntityUtils.toString(entity);
                        JSONObject jsonObject = JSON.parseObject(result);
                        
                        if (jsonObject.containsKey("openid")) {
                            Map<String, String> data = new HashMap<>();
                            data.put("openid", jsonObject.getString("openid"));
                            if (jsonObject.containsKey("session_key")) {
                                data.put("session_key", jsonObject.getString("session_key"));
                            }
                            return Result.success(data);
                        } else {
                            return Result.fail("获取OpenId失败: " + jsonObject.getString("errmsg"));
                        }
                    }
                }
            }
            
            return Result.fail("获取OpenId失败");
        } catch (Exception e) {
            e.printStackTrace();
            return Result.fail("获取OpenId异常: " + e.getMessage());
        }
    }
    

}
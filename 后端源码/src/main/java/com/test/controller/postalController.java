package com.test.controller;

import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.test.model.User;
import com.test.utils.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.List;

@RequestMapping("/Postal")
@RestController
public class postalController {

    @GetMapping("/getProvinceCity")
    public Result<Object> getProvinceCity() {
        try {
            String apiKey = "36ab1733385abdfa0a5a91229f43d279";
            String apiUrl = "http://v.juhe.cn/postcode/pcd";
            HashMap<String, String> map = new HashMap<>();
            map.put("key", apiKey);
            map.put("dtype", "json");
            URL url = new URL(String.format("%s?%s", apiUrl, params(map)));
            BufferedReader in = new BufferedReader(new InputStreamReader((url.openConnection()).getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            System.out.println(response);
            return Result.success(response.toString());
        }catch (Exception e){
            return Result.fail("查询失败："+e.getMessage());
        }
    }

    @GetMapping("/getPostal")
    public Result<Object> getPostal(
            @RequestParam Integer pid,
            @RequestParam Integer cid,
            @RequestParam(required = false) Integer did,
            @RequestParam(required = false) String q,
            @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
            @RequestParam(value = "pageSize", defaultValue = "20") Integer pageSize
    ) {
        try {
            String apiKey = "36ab1733385abdfa0a5a91229f43d279";
            String apiUrl = "http://v.juhe.cn/postcode/search";
            HashMap<String, String> map = new HashMap<>();
            map.put("key", apiKey);
            map.put("pid", pid.toString());
            map.put("cid", cid.toString());
            if (did != null) {
                map.put("did", did.toString());
            }else{
                map.put("did","");
            }
            if (StringUtils.isNotEmpty(q)){
                map.put("q", q);
            }else{
                map.put("q", "");
            }
            map.put("page", pageNum.toString());
            map.put("pagesize", pageSize.toString());
            map.put("dtype", "json");

            URL url = new URL(String.format("%s?%s", apiUrl, params(map)));
            BufferedReader in = new BufferedReader(new InputStreamReader((url.openConnection()).getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            System.out.println(response);
            return Result.success(response.toString());
        }catch (Exception e){
            return Result.fail("查询失败："+e.getMessage());
        }

    }


    public static String params(Map<String, String> map) {
        return map.entrySet().stream()
                .map(entry -> {
                    try {
                        return entry.getKey() + "=" + URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString());
                    } catch (Exception e) {
                        e.printStackTrace();
                        return entry.getKey() + "=" + entry.getValue();
                    }
                })
                .collect(Collectors.joining("&"));
    }

}

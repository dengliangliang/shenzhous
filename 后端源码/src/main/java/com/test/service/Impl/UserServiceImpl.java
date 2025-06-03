package com.test.service.Impl;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.config.RedisUtils;
import com.test.constant.FwConstants;
import com.test.mapper.CommissionFlowMapper;
import com.test.mapper.MonthlySettlementEligibilityMapper;
import com.test.mapper.UserMapper;
import com.test.model.CommissionFlow;
import com.test.model.MonthlySettlementEligibility;
import com.test.model.Return.UserReturn;
import com.test.model.User;
import com.test.service.UserService;
import com.test.utils.OpinionUtils;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static com.test.utils.InviteCodeGenerator.generateInviteCode;
import static com.test.utils.TimeUtils.getTime;
import static com.test.utils.UUIDUtils.getUUID;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper,User> implements UserService {

    @Autowired
    private RedisUtils redisUtils;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private MonthlySettlementEligibilityMapper monthlySettlementEligibilityMapper;

    @Autowired
    private CommissionFlowMapper commissionFlowMapper;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public Result<Map<String, Object>> login(String phone, String password, String wxCode) {

        QueryWrapper<User> queryWrapper = Wrappers.<User>query()
                .eq("phone", phone)
                .eq("is_delete",0);

        User user = userMapper.selectOne(queryWrapper);
        if(ObjectUtils.isEmpty(user)||user.getIsDelete()==1){
            return Result.fail(500,"该手机号码未注册");
        }
        if(!user.getPassword().equals(OpinionUtils.md5Encoder(password))||!user.getPhone().equals(phone)){
            return Result.fail(500,"手机号码或密码不正确");
        }
        if (user.getIsEnable()==1){
            return Result.fail(500,"该手机号已被加入黑名单");
        }
        // 生成token
        String key= UUID.randomUUID().toString();

        // 如果提供了微信code，则获取并保存OpenID
        String openId = null;
        if (StringUtils.isNotBlank(wxCode)) {
            try {
                openId = getWxOpenId(wxCode);
                // 更新用户的OpenID
                if (StringUtils.isNotBlank(openId)) {
                    user.setOpenId(openId);
                    user.setUpdateTime(getTime());
                    this.updateById(user);
                }
            } catch (Exception e) {
                log.error("获取微信OpenID失败", e);
                // 这里不返回错误，因为获取OpenID失败不应影响登录流程
            }
        }

        String userCache = JSONUtil.toJsonStr(user);
        redisUtils.set(FwConstants.USER_LOGIN_TOKEN + key, userCache, 360000);

        Map<String,Object> map = new HashMap<>();
        map.put("token", key);
        map.put("userInfo", user);
        if (openId != null) {
            map.put("openId", openId);
        }else{
            if (StringUtils.isNotEmpty(user.getOpenId()) ){
                map.put("openId", user.getOpenId());
            }
        }

        return Result.success("登录成功", map);
    }

    /**
     * 从微信服务器获取OpenID
     * @param code 微信授权code
     * @return OpenID
     */
    private String getWxOpenId(String code) throws Exception {
        // 微信小程序配置
        String appId = "wx2dfe755086f4af5e";
        String appSecret = "df389e6841e5fbed20956379f7bef92e";
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appId +
                "&secret=" + appSecret +
                "&js_code=" + code +
                "&grant_type=authorization_code";

        // 发送HTTP请求获取OpenID
        URL wxUrl = new URL(url);
        BufferedReader in = new BufferedReader(new InputStreamReader(wxUrl.openConnection().getInputStream(), StandardCharsets.UTF_8));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        // 解析返回结果
        JSONObject json = JSONUtil.parseObj(response.toString());
        if (json.containsKey("openid")) {
            return json.getStr("openid");
        } else {
            throw new Exception("获取微信OpenID失败: " + json.getStr("errmsg"));
        }
    }

    @Override
    public Result<User> register(User user) {
        QueryWrapper<User> queryWrapper = Wrappers.<User>query()
                .eq("phone", user.getPhone())
                .eq("is_delete", 0);
        User u = baseMapper.selectOne(queryWrapper);
        if(ObjectUtils.isNotEmpty(u)){
            return Result.fail(500,"该手机号码已注册");
        }
        user.setIdentity(1);
        user.setUserName(user.getPhone());
        user.setMyCode(generateInviteCode());
        user.setPassword(OpinionUtils.md5Encoder(user.getPassword()));
        this.save(user);
        return Result.success("注册成功",user);
    }

    @Override
    public Result<User> addUser(User user) {
        QueryWrapper<User> queryWrapper = Wrappers.<User>query()
                .eq("phone", user.getPhone())
                .eq("is_delete", 0);
        User u = baseMapper.selectOne(queryWrapper);
        if(ObjectUtils.isNotEmpty(u)){
            return Result.fail(500,"该手机号码已注册");
        }
        List<User> userList = this.list(new QueryWrapper<User>().eq("is_delete", 0));

        user.setUserId(getUUID());
        user.setMyCode(generateInviteCode());
        user.setGetMoney(userList.get(0).getGetMoney());
        user.setPassword(OpinionUtils.md5Encoder(user.getPassword()));
        user.setCreateTime(getTime());
        user.setUpdateTime(getTime());
        if (StringUtils.isNotEmpty(user.getBeInvited())){
            QueryWrapper<User> wrapper1 = new QueryWrapper<>();
            wrapper1.eq("my_code",user.getBeInvited());
            wrapper1.eq("is_delete", 0);
            User val1 = this.getOne(wrapper1);
            if (ObjectUtils.isEmpty(val1)) {
                return Result.fail("输入邀请码失败，该邀请码无效");
            }
            if (val1.getIsGetMoney()==0){
                //提供佣金
                val1.setMoney(val1.getMoney().add(val1.getGetMoney()));
                CommissionFlow c1 = new CommissionFlow();
                c1.setFlowId(getUUID());
                c1.setUserId(val1.getUserId());
                c1.setOrderId("-1");
                c1.setBalance(val1.getMoney());
                c1.setCreateTime(getTime());
                c1.setUpdateTime(getTime());
                c1.setAmount(val1.getGetMoney());
                c1.setFlowType(0);
                this.updateById(val1);
                commissionFlowMapper.insert(c1);
            }
            QueryWrapper<User> wrapper2 = new QueryWrapper<>();
            wrapper2.eq("my_code", val1.getBeInvited());
            wrapper2.eq("is_delete", 0);
            User val2 = this.getOne(wrapper2);
            if (!ObjectUtils.isEmpty(val2)) {
                if (val2.getIsGetMoney()==0){
                    val2.setMoney(val2.getMoney().add(val2.getGetMoney()));
                    CommissionFlow c2 = new CommissionFlow();
                    c2.setFlowId(getUUID());
                    c2.setUserId(val2.getUserId());
                    c2.setOrderId("-1");
                    c2.setBalance(val2.getMoney());
                    c2.setCreateTime(getTime());
                    c2.setUpdateTime(getTime());
                    c2.setAmount(val2.getGetMoney());
                    c2.setFlowType(0);
                    this.updateById(val2);
                    commissionFlowMapper.insert(c2);
                }
            }
        }

        this.save(user);

        return Result.success("新增成功",user);
    }

    @Override
    public Result<User> updateUser(User user) {
        User u = this.getById(user.getUserId());
        if(ObjectUtils.isEmpty(u)||u.getIsDelete()==1){
            return Result.fail("修改失败,该用户不存在");
        }
        if (!u.getPhone().equals(user.getPhone())) {
            QueryWrapper<User> queryWrapper = Wrappers.<User>query()
                    .eq("phone", user.getPhone())
                    .eq("is_delete", 0);
            User u1 = baseMapper.selectOne(queryWrapper);
            if(ObjectUtils.isNotEmpty(u1)){
                return Result.fail(500,"该手机号码已注册");
            }
        }
        user.setUpdateTime(getTime());
        this.updateById(user);
        return Result.success("修改成功",user);
    }

    @Override
    public Result<User> updateRegularUser(User user) {
        User u = this.getById(user.getUserId());
        if(ObjectUtils.isEmpty(u)||u.getIsDelete()==1){
            return Result.fail("修改失败,该用户不存在");
        }
        if (!u.getPhone().equals(user.getPhone())) {
            QueryWrapper<User> queryWrapper = Wrappers.<User>query()
                    .eq("phone", user.getPhone())
                    .eq("is_delete", 0);
            User u1 = baseMapper.selectOne(queryWrapper);
            if(ObjectUtils.isNotEmpty(u1)){
                return Result.fail(500,"该手机号码已注册");
            }
        }
        u.setPhone(user.getPhone());
        u.setUserName(user.getUserName());
        u.setIdentification(user.getIdentification());
        u.setUpdateTime(getTime());

        if (StringUtils.isNotEmpty(user.getBeInvited())&&!user.getBeInvited().equals(u.getBeInvited())){
            if (user.getBeInvited().equals(u.getMyCode())){
                return Result.fail("填写的邀请码不能跟自己的邀请码一致");
            }
            QueryWrapper<User> wrapper1 = new QueryWrapper<>();
            wrapper1.eq("my_code",user.getBeInvited());
            wrapper1.eq("is_delete", 0);
            User val1 = this.getOne(wrapper1);
            if (ObjectUtils.isEmpty(val1)) {
                return Result.fail("输入邀请码失败，该邀请码无效");
            }
            u.setBeInvited(user.getBeInvited());
            if (val1.getIsGetMoney()==0){
                //提供佣金
                val1.setMoney(val1.getMoney().add(BigDecimal.valueOf(1)));
                CommissionFlow c1 = new CommissionFlow();
                c1.setFlowId(getUUID());
                c1.setUserId(val1.getUserId());
                c1.setOrderId("-1");
                c1.setBalance(val1.getMoney());
                c1.setCreateTime(getTime());
                c1.setUpdateTime(getTime());
                c1.setAmount(val1.getGetMoney());
                c1.setFlowType(0);
                this.updateById(val1);
                commissionFlowMapper.insert(c1);
            }
            QueryWrapper<User> wrapper2 = new QueryWrapper<>();
            wrapper2.eq("my_code", val1.getBeInvited());
            wrapper2.eq("is_delete", 0);
            User val2 = this.getOne(wrapper2);
            if (!ObjectUtils.isEmpty(val2)) {
                if (val2.getIsGetMoney()==0){
                    val2.setMoney(val2.getMoney().add(BigDecimal.valueOf(1)));
                    CommissionFlow c2 = new CommissionFlow();
                    c2.setFlowId(getUUID());
                    c2.setUserId(val2.getUserId());
                    c2.setOrderId("-1");
                    c2.setBalance(val2.getMoney());
                    c2.setCreateTime(getTime());
                    c2.setUpdateTime(getTime());
                    c2.setAmount(val1.getGetMoney());
                    c2.setFlowType(0);
                    this.updateById(val2);
                    commissionFlowMapper.insert(c2);
                }
            }
        }


        this.updateById(u);
        return Result.success("修改成功",u);
    }

    @Override
    public Result<String> updatePassword(String userId, String oldPassword, String newPassword) {
        User u = this.getById(userId);
        if (ObjectUtils.isEmpty(u)||u.getIsDelete()==1){
            return Result.fail("修改失败，该用户不存在");
        }
        if (!u.getPassword().equals(OpinionUtils.md5Encoder(oldPassword))) {
            return Result.fail("修改失败，密码不正确");
        }
        u.setUpdateTime(getTime());
        u.setPassword(OpinionUtils.md5Encoder(newPassword));
        this.saveOrUpdate(u);
        return Result.success("修改成功");
    }

    @Override
    public Result<User> deleteUser(String userId) {
        User u = this.getById(userId);
        if(ObjectUtils.isEmpty(u)||u.getIsDelete()==1){
            return Result.fail("删除失败，该用户不存在");
        }
        u.setIsDelete(1);
        u.setUpdateTime(getTime());
        this.updateById(u);
        return Result.success("删除成功",u);
    }

    @Override
    public Result<User> getUserById(String userId) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id",userId);
        wrapper.eq("is_delete",0);
        User val = this.getOne(wrapper);
        if(ObjectUtils.isEmpty(val)){
            return Result.fail("查询失败，该用户不存在");
        }
        return Result.success("查询成功",val);
    }

    @Override
    public Result<UserReturn> pageUser(int pageNum, int pageSize, Integer identity, Integer isReal, String userName) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("is_delete", 0); // 默认条件

        if (identity != null) {
            wrapper.eq("identity", identity);
        }

        if (isReal != null) {
            wrapper.eq("is_real", isReal); // 如果 isReal 不为空，直接查询指定值
        }

        if (StringUtils.isNotEmpty(userName)) {
            wrapper.like("user_name", userName);
        }
        wrapper.orderByDesc("create_time");
        IPage<User> page = this.page(new Page<>(pageNum, pageSize), wrapper);
        UserReturn userReturn = new UserReturn();
        List<User> list = page.getRecords();
        userReturn.setCurrentPage(pageNum);
        userReturn.setPageSize(pageSize);
        userReturn.setDataList(list);
        userReturn.setTotalPages(page.getTotal());
        return Result.success("查询成功",userReturn);
    }

    @Override
    public Result<List<User>> getUserList(Integer identity, Integer isReal, String userName) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("is_delete", 0); // 默认条件

        if (identity != null) {
            wrapper.eq("identity", identity);
        }

        if (isReal != null) {
            wrapper.eq("is_real", isReal); // 如果 isReal 不为空，直接查询指定值
        }
        if (StringUtils.isNotEmpty(userName)) {
            wrapper.like("user_name", userName);
        }
        wrapper.orderByDesc("create_time");
        List<User> list = this.list(wrapper);
        return Result.success("查询成功",list);
    }

    @Override
    public Result<String> inputCode(String userId, String code) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id",userId);
        wrapper.eq("is_delete",0);
        User val = this.getOne(wrapper);
        if(ObjectUtils.isEmpty(val)){
            return Result.fail("获取月结资格失败，该用户不存在");
        }
        QueryWrapper<MonthlySettlementEligibility> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("password",code);
        MonthlySettlementEligibility m = monthlySettlementEligibilityMapper.selectOne(queryWrapper);
        if(ObjectUtils.isEmpty(m)){
            return Result.fail("获取月结资格失败，该月结加密密码无效");
        }else{
            if (m.getStatus()==1){
                return Result.fail("获取月结资格失败，该月结资格已失效");
            }
        }
        val.setCode(code);
        val.setMonthlySettlementEligibilityId(m.getMonthlySettlementEligibilityId());
        val.setIsMonth(1);
        val.setUpdateTime(getTime());
        this.updateById(val);
        return Result.success("获取资格成功");
    }

    @Override
    public Result<String> inputInvitationCode(String userId, String invitationCode) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId);
        wrapper.eq("is_delete", 0);
        User val = this.getOne(wrapper);
        if (ObjectUtils.isEmpty(val)) {
            return Result.fail("输入邀请码失败，该用户不存在");
        }
        QueryWrapper<User> wrapper1 = new QueryWrapper<>();
        wrapper1.eq("my_code", invitationCode);
        wrapper1.eq("is_delete", 0);
        User val1 = this.getOne(wrapper1);
        if (ObjectUtils.isEmpty(val1)) {
            return Result.fail("输入邀请码失败，该邀请码无效");
        }
        val.setBeInvited(invitationCode);
        val.setUpdateTime(getTime());
        this.updateById(val);

        if (val1.getIsGetMoney()==0){
            //提供佣金
            val1.setMoney(val1.getMoney().add(BigDecimal.valueOf(1)));
            CommissionFlow c1 = new CommissionFlow();
            c1.setFlowId(getUUID());
            c1.setUserId(val1.getUserId());
            c1.setOrderId("-1");
            c1.setBalance(val1.getMoney());
            c1.setCreateTime(getTime());
            c1.setUpdateTime(getTime());
            c1.setAmount(BigDecimal.valueOf(1));
            c1.setFlowType(0);
            this.updateById(val1);
            commissionFlowMapper.insert(c1);
        }
        QueryWrapper<User> wrapper2 = new QueryWrapper<>();
        wrapper2.eq("my_code", val1.getBeInvited());
        wrapper2.eq("is_delete", 0);
        User val2 = this.getOne(wrapper2);
        if (!ObjectUtils.isEmpty(val2)) {
            if (val2.getIsGetMoney()==0){
                val2.setMoney(val2.getMoney().add(BigDecimal.valueOf(1)));
                CommissionFlow c2 = new CommissionFlow();

                c2.setFlowId(getUUID());
                c2.setUserId(val2.getUserId());
                c2.setOrderId("-1");
                c2.setBalance(val2.getMoney());
                c2.setCreateTime(getTime());
                c2.setUpdateTime(getTime());
                c2.setAmount(BigDecimal.valueOf(1));
                c2.setFlowType(0);
                this.updateById(val2);
                commissionFlowMapper.insert(c2);
            }
        }
        return Result.success("输入邀请码成功");
    }
    @Override
    public Result<String> getIsMonth(String userId) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id",userId);
        wrapper.eq("is_delete",0);
        User val = this.getOne(wrapper);
        if(ObjectUtils.isEmpty(val)){
            return Result.fail("查询失败，该用户不存在");
        }
        if (val.getIsMonth()==1){
            MonthlySettlementEligibility m = monthlySettlementEligibilityMapper.selectById(val.getMonthlySettlementEligibilityId());
            if (ObjectUtils.isEmpty(m)) {
                return Result.fail("查询失败，该月结密码已失效");
            }else{
                if (m.getPassword().equals(val.getCode())){
                    return Result.success(val.getMonthlySettlementEligibilityId());
                }else{
                    return Result.fail("查询失败，该月结密码已失效");
                }
            }
        }else{
            return Result.success("-1");
        }
    }

    @Override
    public Result<Object> authentication(String userId, String userName, String identification, String phone) throws Exception {
        User user = this.getById(userId);
        if (ObjectUtils.isEmpty(user)||user.getIsDelete()==1) {
            return Result.fail("实名失败，该用户不存在");
        }

        String apiKey = "02346ed139f3c7b6b412770ba1bc912c";
        String apiUrl = "https://v.juhe.cn/telecom/query";
        HashMap<String, String> map = new HashMap<>();
        map.put("key", apiKey);
        map.put("realname", userName);
        map.put("idcard", identification);
        map.put("mobile", phone);
        map.put("type", "");
        map.put("showid", "");
        map.put("province", "");
        map.put("detail", "");

        URL url = new URL(String.format("%s?%s", apiUrl, params(map)));
        BufferedReader in = new BufferedReader(new InputStreamReader((url.openConnection()).getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        System.out.println(response);
        return Result.success(response);
    }

    @Override
    public Result<String> updateNewPassword(String userId, String newPassword) {
        User u = this.getById(userId);
        if (ObjectUtils.isEmpty(u)||u.getIsDelete()==1){
            return Result.fail("修改失败，该用户不存在");
        }

        u.setUpdateTime(getTime());
        u.setPassword(OpinionUtils.md5Encoder(newPassword));
        this.saveOrUpdate(u);
        return Result.success("修改成功");
    }

    @Override
    public Result<String> setGetMoney(BigDecimal money) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("identity",1);
        wrapper.eq("is_delete",0);
        List<User> users = this.list(wrapper);
        for (User user : users) {
            user.setGetMoney(money);
            this.saveOrUpdate(user);
        }
        return Result.success("修改成功");
    }

    @Override
    public Result<String> forgotPassword(String phone, String newPassword, String code) {
        // 验证手机号是否存在
        QueryWrapper<User> queryWrapper = Wrappers.<User>query()
                .eq("phone", phone)
                .eq("is_delete", 0);
        User user = userMapper.selectOne(queryWrapper);
        
        if (ObjectUtils.isEmpty(user) || user.getIsDelete() == 1) {
            return Result.fail("该手机号码未注册");
        }
        
        // 从Redis获取验证码
        String redisKey = "sms:code:" + phone;
        String savedCode = stringRedisTemplate.opsForValue().get(redisKey);
        
        // 验证码校验
        if (savedCode == null) {
            return Result.fail("验证码已过期，请重新获取");
        }
        
        if (!savedCode.equals(code)) {
            return Result.fail("验证码错误，请重新输入");
        }
        
        // 更新密码
        user.setPassword(OpinionUtils.md5Encoder(newPassword));
        user.setUpdateTime(getTime());
        this.updateById(user);
        
        // 验证成功后删除Redis中的验证码
        stringRedisTemplate.delete(redisKey);
        
        return Result.success("密码重置成功");
    }

    @Override
    public Result<String> isRealByPhone(String phone) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("phone", phone);
        wrapper.eq("is_delete",0);
        wrapper.eq("is_real",2);
        User user = userMapper.selectOne(wrapper);
        if (ObjectUtils.isEmpty(user)) {
            return Result.success("1");
        }
        return Result.success("0");
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

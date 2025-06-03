package com.test.utils;

import java.security.SecureRandom;

public class InviteCodeGenerator {

    // 默认字符集（排除容易混淆的字符）
    private static final String DEFAULT_CHAR_SET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    private static final SecureRandom random = new SecureRandom();

    /**
     * 生成邀请码（默认长度8）
     */
    public static String generateInviteCode() {
        return generateInviteCode(8);
    }

    /**
     * 生成指定长度的邀请码
     * @param length 邀请码长度（建议6-16）
     */
    public static String generateInviteCode(int length) {
        if (length <= 0) {
            throw new IllegalArgumentException("长度必须大于0");
        }

        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(DEFAULT_CHAR_SET.length());
            sb.append(DEFAULT_CHAR_SET.charAt(index));
        }
        return sb.toString();
    }

    /**
     * 使用自定义字符集生成邀请码
     * @param length    邀请码长度
     * @param charSet   自定义字符集
     */
    public static String generateCustomInviteCode(int length, String charSet) {
        if (length <= 0) {
            throw new IllegalArgumentException("长度必须大于0");
        }
        if (charSet == null || charSet.isEmpty()) {
            throw new IllegalArgumentException("字符集不能为空");
        }

        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(charSet.length());
            sb.append(charSet.charAt(index));
        }
        return sb.toString();
    }

}
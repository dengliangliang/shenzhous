package com.test.utils;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class OpinionUtils {

    public static String md5Encoder(String source) {
        if (source == null || source.length() == 0) {
            throw new RuntimeException("加密数据输入不能为空！");
        }

        byte[] inputBytes = source.getBytes();

        try {
            MessageDigest messageDigest = MessageDigest.getInstance("md5");

            byte[] outputBytes = messageDigest.digest(inputBytes);

            BigInteger outputBigInteger = new BigInteger(outputBytes);

            return outputBigInteger.abs().toString(16).toUpperCase();

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

}
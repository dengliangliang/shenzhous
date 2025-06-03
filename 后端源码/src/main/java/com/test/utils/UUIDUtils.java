package com.test.utils;

import java.util.UUID;

public class UUIDUtils {
    public static String getUUID() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString().replace("-", "").toLowerCase();
    }
}

package org.supreme.utils;

import java.util.HashMap;
import java.util.Map;

public class MapKey {
    public static final Map<String, String> tableKeyMap;
    public static final Map<String, String> tableNameMap;

    static {
        tableKeyMap = new HashMap<>();
        tableKeyMap.put("brand", "brand_id");
        tableKeyMap.put("sub_brand", "sub_brand_id");
        tableKeyMap.put("car_model", "model_id");
        tableKeyMap.put("car_info", "id");
        tableKeyMap.put("car_sale", "sale_id");
        tableKeyMap.put("car_star", "star_id");
        tableKeyMap.put("user", "user_id");

        tableNameMap = new HashMap<>();
        tableNameMap.put("Brand", "brand");
        tableNameMap.put("CarInfo", "car_info");
        tableNameMap.put("CarModel", "car_model");
        tableNameMap.put("CarSale", "car_sale");
        tableNameMap.put("CarStar", "car_star");
        tableNameMap.put("SubBrand", "sub_brand");
        tableNameMap.put("User", "user");
    }
}

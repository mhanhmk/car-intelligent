package org.supreme.utils;

import org.apache.ibatis.jdbc.SQL;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;
import org.supreme.model.vo.CarOption;
import org.supreme.model.vo.ScreeningCondition;

public class SqlSelectProvider {
    public String SelectByKey(String tableName, Long key) {
        return new SQL() {{
            SELECT("*");
            FROM(tableName);
            WHERE(MapKey.tableKeyMap.get(tableName) + " = #{key}");
        }}.toString();
    }

    public String SelectForCarOption(CarOption carOption) {
        return new SQL() {{
            SELECT("b.brand_name brand, s.sub_brand_name subBrand, m.model_name model");
            FROM("brand b, sub_brand s, car_model m");
            WHERE("b.brand_id = s.brand_id AND s.sub_brand_id = m.sub_brand_id");
            if (carOption.getModel() != null) {
                WHERE("m.model_name = #{model}");
            }
            if (carOption.getSubBrand() != null) {
                WHERE("s.sub_brand_name = #{subBrand}");
            }
            if (carOption.getBrand() != null) {
                WHERE("b.brand_name = #{brand}");
            }
        }}.toString();
    }

    public String SelectCarByCondition(ScreeningCondition screeningCondition) {
        return new SQL() {{
            SELECT("m.model_id, b.brand_name, s.sub_brand_name, m.model_name, m.max_price, m.min_price, m.img_path");
            FROM("brand b, sub_brand s, car_model m");
            WHERE("b.brand_id = s.brand_id AND s.sub_brand_id = m.sub_brand_id");

            if (screeningCondition.getBrand() != null)
                WHERE("b.brand_name = #{brand}");

            if (screeningCondition.getSubBrand() != null)
                WHERE("s.sub_brand_name = #{subBrand}");

            if (screeningCondition.getModel() != null)
                WHERE("m.model_name = #{model}");

            if (screeningCondition.getType() != null)
                WHERE("m.model_type = #{type}");

            if (screeningCondition.getMinPrice() != null)
                WHERE("m.min_price > #{minPrice}");

            if (screeningCondition.getMaxPrice() != null)
                WHERE("m.max_price < #{maxPrice}");

            if (FieldCopyUtils.getNotNullPropertyNames(screeningCondition).length == 0)
                ORDER_BY("RAND()");
        }}.toString();
    }

    public String SelectDataByEntity(Object entity, String tableName) {
        return new SQL() {{
            SELECT("*");
            FROM(tableName);

            if (entity != null) {
                MetaObject metaObject = SystemMetaObject.forObject(entity);
                for (String property : metaObject.getGetterNames())
                    if (metaObject.getValue(property) != null)
                        WHERE(AppTool.convertToSnakeCase(property) + " = #{entity." + property + "}");
            }
        }}.toString();
    }
}

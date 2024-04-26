package org.supreme.utils;

import org.apache.ibatis.jdbc.SQL;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;

public class SqlUpdateProvider {
    public String UpdateSql(Object entity, String tableName) {
        return new SQL() {{
            UPDATE(tableName);

            String keyName = AppTool.toCamelCase(MapKey.tableKeyMap.get(tableName));

            // 获取对象的非空属性
            MetaObject metaObject = SystemMetaObject.forObject(entity);
            for (String property : metaObject.getGetterNames()) {
                if (metaObject.getValue(property) != null && !property.equals(keyName)) {
                    SET(AppTool.convertToSnakeCase(property) + " = #{entity." + property + "}");
                }
            }
            WHERE(MapKey.tableKeyMap.get(tableName) + " = #{entity." + keyName + "}");
        }}.toString();
    }
}

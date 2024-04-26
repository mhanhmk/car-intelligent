package org.supreme.utils;

import org.apache.ibatis.jdbc.SQL;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;

public class SqlInsertProvider {
    public static String InsertSql(Object entity, String tableName) {
        return new SQL() {{
            INSERT_INTO(tableName);

            // 获取对象的非空属性
            MetaObject metaObject = SystemMetaObject.forObject(entity);
            for (String property : metaObject.getGetterNames()) {
                if (metaObject.getValue(property) != null) {
                    VALUES(AppTool.convertToSnakeCase(property), "#{entity." + property + "}");
                }
            }
        }}.toString();
    }
}

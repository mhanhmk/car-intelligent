package org.supreme.utils;

public class SqlDeleteProvider {
    public String DeleteSql(String tableName, Long key) {
        return "DELETE FROM " + tableName + " WHERE " + MapKey.tableKeyMap.get(tableName) + " = #{key}";
    }
}

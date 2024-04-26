package org.supreme.utils;

import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;

public class FieldCopyUtils {
    public static void copyNonNullFields(Object target, Object source) {
        BeanUtils.copyProperties(source, target, getNullPropertyNames(source));
    }

    public static String[] getNullPropertyNames(Object source) {
        MetaObject metaObject = SystemMetaObject.forObject(source);
        List<String> nullPropertyNames = new ArrayList<>();
        for (String property : metaObject.getGetterNames()) {
            if (metaObject.getValue(property) == null) {
                nullPropertyNames.add(property);
            }
        }

        return nullPropertyNames.toArray(new String[0]);
    }

    public static String[] getNotNullPropertyNames(Object source) {
        MetaObject metaObject = SystemMetaObject.forObject(source);
        List<String> notNullPropertyNames = new ArrayList<>();
        for (String property : metaObject.getGetterNames()) {
            if (metaObject.getValue(property) != null) {
                notNullPropertyNames.add(property);
            }
        }

        return notNullPropertyNames.toArray(new String[0]);
    }
}


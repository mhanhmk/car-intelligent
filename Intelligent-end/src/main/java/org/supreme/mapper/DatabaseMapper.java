package org.supreme.mapper;

import org.apache.ibatis.annotations.*;
import org.supreme.model.entity.*;
import org.supreme.utils.SqlDeleteProvider;
import org.supreme.utils.SqlInsertProvider;
import org.supreme.utils.SqlSelectProvider;
import org.supreme.utils.SqlUpdateProvider;

import java.util.List;
import java.util.Map;

@Mapper
public interface DatabaseMapper {
    @DeleteProvider(type = SqlDeleteProvider.class, method = "DeleteSql")
    int deleteDataByTableNameKey(String tableName, Long key);

    @InsertProvider(type = SqlInsertProvider.class, method = "InsertSql")
    int insertDataByTableName(Object entity, String tableName);

    @InsertProvider(type = SqlUpdateProvider.class, method = "UpdateSql")
    int updateDataByTableName(Object entity, String tableName);

    @SelectProvider(type = SqlSelectProvider.class, method = "SelectByKey")
    Map<String, Object> selectByTableNameKey(String tableName, Long key);

    @SelectProvider(type = SqlSelectProvider.class, method = "SelectDataByEntity")
    List<User> selectUser(Object entity, String tableName);

    @SelectProvider(type = SqlSelectProvider.class, method = "SelectDataByEntity")
    List<Brand> selectBrand(Object entity, String tableName);

    @SelectProvider(type = SqlSelectProvider.class, method = "SelectDataByEntity")
    List<SubBrand> selectSubBrand(Object entity, String tableName);

    @SelectProvider(type = SqlSelectProvider.class, method = "SelectDataByEntity")
    List<CarInfo> selectCarInfo(Object entity, String tableName);

    @SelectProvider(type = SqlSelectProvider.class, method = "SelectDataByEntity")
    List<CarModel> selectCarModel(Object entity, String tableName);

    @SelectProvider(type = SqlSelectProvider.class, method = "SelectDataByEntity")
    List<CarSale> selectCarSale(Object entity, String tableName);

    @SelectProvider(type = SqlSelectProvider.class, method = "SelectDataByEntity")
    List<CarStar> selectCarStar(Object entity, String tableName);
}

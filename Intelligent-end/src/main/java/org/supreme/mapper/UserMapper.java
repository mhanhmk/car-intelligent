package org.supreme.mapper;

import org.apache.ibatis.annotations.*;
import org.supreme.model.entity.User;
import org.supreme.utils.SqlUpdateProvider;

@Mapper
public interface UserMapper {
    @Insert("INSERT INTO user (user_name, password, email) VALUES (#{username}, #{passwd}, #{email})")
    int insertUser(String username, String passwd, String email);

    @Select("SELECT * FROM user WHERE user_name = #{username}")
    User getByUsername(@Param("username") String username);

    @Select("SELECT * FROM user WHERE email = #{email}")
    User getByEmail(@Param("email") String email);

    @Select("SELECT * FROM user WHERE user_id = #{id}")
    User getById(@Param("id") int id);

    @InsertProvider(type = SqlUpdateProvider.class, method = "UpdateSql")
    int updateUserInfo(Object entity, String tableName);
}

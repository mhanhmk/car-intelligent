package org.supreme.mapper;

import org.apache.ibatis.annotations.*;
import org.supreme.model.entity.CarStar;
import org.supreme.model.vo.CarStarInfo;

import java.util.List;

@Mapper
public interface CarStarMapper {
    @Select("SELECT b.brand_id, b.brand_name, s.sub_brand_name, m.model_id, m.model_name, m.max_price, m.min_price, m.img_path " +
            "FROM brand b, sub_brand s, car_model m, car_star cs " +
            "WHERE b.brand_id = s.brand_id " +
            "AND s.sub_brand_id = m.sub_brand_id " +
            "AND m.model_id = cs.model_id " +
            "AND cs.user_id = #{userId}")
    List<CarStarInfo> getUserStars(Integer userId);

    @Delete("DELETE FROM car_star WHERE user_id = #{userId} AND model_id = #{modelId}")
    int deleteStarByUserIdCarId(Integer userId, Integer modelId);

    @Select("SELECT * FROM car_star WHERE user_id = #{userId} AND model_id = #{modelId}")
    CarStar StarByUserIdCarId(Integer userId, Integer modelId);

    @Insert("INSERT INTO car_star (user_id, model_id, star_date) VALUES (#{userId}, #{modelId}, #{starDate})")
    int insertCarStar(CarStar carStar);
}

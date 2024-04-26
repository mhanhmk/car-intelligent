package org.supreme.mapper;

import org.apache.ibatis.annotations.*;
import org.supreme.model.entity.CarSale;
import org.supreme.model.vo.CarSaleInfo;

import java.util.List;

@Mapper
public interface CarSaleMapper {
    @Select("SELECT b.brand_id, b.brand_name, s.sub_brand_id, s.sub_brand_name, m.model_id, m.model_name, m.model_type, c.name, c.displacement, c.dynamic_type, c.horsepower, c.price, c.info, m.img_path, cs.sale_date " +
            "from brand b, sub_brand s, car_model m, car_info c, car_sale cs " +
            "WHERE b.brand_id = s.brand_id " +
            "AND s.sub_brand_id = m.sub_brand_id " +
            "AND m.model_id = c.model_id " +
            "AND c.id = cs.car_id " +
            "AND cs.user_id = #{userId}")
    List<CarSaleInfo> getSaleInfo(Integer userId);

    @Insert("INSERT INTO car_sale (user_id, car_id, sale_date) VALUES (#{userId}, #{carId}, #{saleDate})")
    int InsertSale(CarSale carSale);
}

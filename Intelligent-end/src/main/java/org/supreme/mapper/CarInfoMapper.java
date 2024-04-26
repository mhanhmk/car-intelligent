package org.supreme.mapper;

import org.apache.ibatis.annotations.*;
import org.supreme.model.entity.CarInfo;
import org.supreme.model.vo.CarForDisplay;
import org.supreme.model.vo.CarOption;
import org.supreme.model.vo.ScreeningCondition;
import org.supreme.utils.SqlSelectProvider;

import java.util.List;

@Mapper
public interface CarInfoMapper {
    @SelectProvider(type = SqlSelectProvider.class, method = "SelectForCarOption")
    List<CarOption> getCarOption(CarOption carOption);

    @SelectProvider(type = SqlSelectProvider.class, method = "SelectCarByCondition")
    List<CarForDisplay> getCarByCondition(ScreeningCondition screeningCondition);

    @Select("SELECT * FROM car_info WHERE id = #{carId}")
    CarInfo getCarInfoById(int carId);

    @Select("SELECT * From car_info WHERE model_id = #{modelId}")
    List<CarInfo> getCarInfoByModelId(Integer modelId);

    @Select("SELECT m.model_id, b.brand_name, s.sub_brand_name, m.model_name, m.max_price, m.min_price, m.img_path " +
            "From brand b, sub_brand s, car_model m " +
            "WHERE b.brand_id = s.brand_id AND s.sub_brand_id = m.sub_brand_id AND m.model_id = #{modelId}")
    CarForDisplay getCarDisplayByModelId(Integer modelId);
}




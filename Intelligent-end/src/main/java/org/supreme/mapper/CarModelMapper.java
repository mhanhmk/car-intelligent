package org.supreme.mapper;

import org.apache.ibatis.annotations.*;
import org.supreme.model.entity.CarModel;
import org.supreme.model.dto.ModelAndId;

import java.util.List;

@Mapper
public interface CarModelMapper {
    @Select("SELECT model_id, model_name FROM car_model ORDER BY RAND() LIMIT #{num}")
    List<ModelAndId> getModelNameIdForRand(int num);

    @Select("SELECT m.model_id, m.model_name FROM brand b, sub_brand s, car_model m WHERE b.brand_id AND s.brand_id AND s.sub_brand_id = m.sub_brand_id AND b.brand_name = #{brandName} ORDER BY RAND() LIMIT #{num}")
    List<ModelAndId> getModelNameIdByBranName(String brandName, int num);

    @Select("SELECT m.model_id, m.model_name FROM sub_brand s, car_model m WHERE s.sub_brand_id = m.sub_brand_id AND s.sub_brand_name = #{subBrandName}")
    List<ModelAndId> getModelNameIdBySubBrandName(String subBrandName);

    @Select("SELECT * From car_model WHERE model_id = #{modelId}")
    CarModel getModelBYModelId(Integer modelId);
}

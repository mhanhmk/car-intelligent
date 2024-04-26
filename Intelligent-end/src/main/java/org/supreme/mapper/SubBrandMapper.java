package org.supreme.mapper;

import org.apache.ibatis.annotations.*;
import org.supreme.model.entity.SubBrand;

import java.util.List;

@Mapper
public interface SubBrandMapper {
    @Select("SELECT * FROM brand, sub_brand WHERE brand.brand_id = sub_brand.brand_id AND brand.brand_name = #{brandName}")
    List<SubBrand> getSubBrandsByBrandName(String brandName);

    @Select("SELECT * FROM sub_brand ORDER BY RAND() LIMIT #{num}")
    List<SubBrand> getSubBrandsForRand(int num);
}

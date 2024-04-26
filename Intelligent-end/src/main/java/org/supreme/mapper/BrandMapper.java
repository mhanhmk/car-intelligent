package org.supreme.mapper;

import org.apache.ibatis.annotations.*;
import org.supreme.model.entity.Brand;

import java.util.List;

@Mapper
public interface BrandMapper {
    @Select("SELECT * FROM brand")
    List<Brand> getBrands();
}

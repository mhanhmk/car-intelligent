package org.supreme.model.vo;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CarStarInfo {
    private Integer brandId;
    private String brandName;
    private String subBrandName;
    private Integer modelId;
    private String modelName;
    private String name;
    private BigDecimal maxPrice;
    private BigDecimal minPrice;
    private String imgPath;
}

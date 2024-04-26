package org.supreme.model.entity;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CarModel {
    private Integer modelId;
    private String modelName;
    private Integer subBrandId;
    private BigDecimal maxPrice;
    private BigDecimal minPrice;
    private Integer isNewCar;
    private String modelType;
    private String saleStatus;
    private String imgPath;
}


package org.supreme.model.vo;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CarForDisplay {
    private int modelId;
    private String brandName;
    private String subBrandName;
    private String modelName;
    private BigDecimal maxPrice;
    private BigDecimal minPrice;
    private String imgPath;
}

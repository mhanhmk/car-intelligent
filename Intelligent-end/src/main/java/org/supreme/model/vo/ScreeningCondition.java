package org.supreme.model.vo;

import lombok.Data;

@Data
public class ScreeningCondition {
    private String brand;
    private String subBrand;
    private String model;
    private String type;
    private String dynamicType;
    private Float minPrice;
    private Float maxPrice;
}

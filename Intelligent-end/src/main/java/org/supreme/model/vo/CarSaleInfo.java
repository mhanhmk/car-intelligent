package org.supreme.model.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class CarSaleInfo {
    private String brandName;
    private Integer subBrandId;
    private String subBrandName;
    private Integer modelId;
    private String modelName;
    private String modelType;
    private String name;
    private Float displacement;
    private String dynamicType;
    private Integer horsepower;
    private BigDecimal price;
    private String info;
    private String imgPath;
    private Date saleDate;
}

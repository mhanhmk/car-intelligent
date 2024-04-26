package org.supreme.model.entity;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CarInfo {
    private Integer id;
    private Integer modelId;
    private String name;
    private String type;
    private BigDecimal displacement;
    private String dynamicType;
    private Integer horsepower;
    private BigDecimal price;
    private String info;
}


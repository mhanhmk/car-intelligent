package org.supreme.model.entity;

import lombok.Data;

import java.sql.Date;

@Data
public class CarStar {
    private Integer starId;
    private Integer userId;
    private Integer modelId;
    private Date starDate;
}

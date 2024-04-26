package org.supreme.model.entity;

import lombok.Data;

import java.sql.Date;

@Data
public class CarSale {
    private Integer saleId;
    private Integer userId;
    private Integer carId;
    private Date saleDate;
}

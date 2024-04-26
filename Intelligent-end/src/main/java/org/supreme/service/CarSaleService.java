package org.supreme.service;

import org.springframework.stereotype.Service;
import org.supreme.exception.ErrorException;
import org.supreme.mapper.CarInfoMapper;
import org.supreme.mapper.CarSaleMapper;
import org.supreme.model.entity.CarSale;

import javax.annotation.Resource;
import java.sql.Date;
import java.util.Calendar;

@Service
public class CarSaleService {
    @Resource
    private CarSaleMapper saleMapper;

    @Resource
    private CarInfoMapper carInfoMapper;

    public int saleCar(Integer userId, Integer carId) {
        if (carInfoMapper.getCarInfoById(carId) == null) {
            throw new ErrorException(300, "非法请求");
        }

        CarSale carSale = new CarSale();
        carSale.setCarId(carId);
        carSale.setUserId(userId);
        java.util.Date utilDate = Calendar.getInstance().getTime();
        carSale.setSaleDate(new Date(utilDate.getTime()));

        return saleMapper.InsertSale(carSale);
    }
}

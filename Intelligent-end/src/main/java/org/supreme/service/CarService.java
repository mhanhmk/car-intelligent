package org.supreme.service;

import org.springframework.stereotype.Service;
import org.supreme.mapper.CarInfoMapper;
import org.supreme.model.vo.CarDetailInfo;
import org.supreme.utils.ParseHtml;

import javax.annotation.Resource;

@Service
public class CarService {
    @Resource
    private CarInfoMapper carInfoMapper;

    public CarDetailInfo getCarDetailInfo(Integer modelId) {
        CarDetailInfo carDetailInfo = new CarDetailInfo();
        ParseHtml.parseHtmlForModelId(modelId, carDetailInfo);
        carDetailInfo.setCarModelInfo(carInfoMapper.getCarDisplayByModelId(modelId));
        carDetailInfo.setCarInfos(carInfoMapper.getCarInfoByModelId(modelId));

        return carDetailInfo;
    }
}

package org.supreme.model.vo;

import lombok.Data;
import org.supreme.model.entity.CarInfo;

import java.util.List;

@Data
public class CarDetailInfo {
    private List<String> imgStart;
    private List<String> imgInside;
    private List<String> imgBottom;
    private CarForDisplay carModelInfo;
    private List<CarInfo> carInfos;
}

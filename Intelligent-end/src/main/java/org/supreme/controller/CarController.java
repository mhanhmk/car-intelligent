package org.supreme.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;
import org.supreme.mapper.BrandMapper;
import org.supreme.mapper.CarInfoMapper;
import org.supreme.mapper.CarModelMapper;
import org.supreme.mapper.SubBrandMapper;
import org.supreme.model.vo.CarForDisplay;
import org.supreme.model.vo.CarOption;
import org.supreme.model.vo.OptionIdName;
import org.supreme.model.vo.ScreeningCondition;
import org.supreme.service.CarService;
import org.supreme.utils.ApiResponse;
import org.supreme.utils.AppTool;
import org.supreme.utils.SqlSelectProvider;

import javax.annotation.Resource;
import java.util.List;

/**
 * CarController
 */
@RestController
@RequestMapping("/car")
public class CarController {
    @Resource
    private BrandMapper brandMapper;

    @Resource
    private SubBrandMapper subBrandMapper;

    @Resource
    private CarModelMapper carModelMapper;

    @Resource
    private CarInfoMapper carInfoMapper;

    @Resource
    private CarService carService;

    /**
     * CheckOption
     */
    @GetMapping("/check_option")
    public ApiResponse CheckOption(@ModelAttribute CarOption carOption) {
        List<CarOption> carOptions = carInfoMapper.getCarOption(carOption);
        if (carOptions.size() == 0) {
            return new ApiResponse(300, "出错啦!!");
        }
        if (carOption.getModel() != null) {
            carOption = carOptions.get(0);
        } else if (carOption.getSubBrand() != null) {
            carOption.setSubBrand(carOptions.get(0).getSubBrand());
            carOption.setBrand(carOptions.get(0).getBrand());
        }
        return new ApiResponse(200, "success", carOption);
    }

    /**
     * BrandNames
     */
    @GetMapping("/brand_names")
    public ApiResponse BrandNames() {
        return new ApiResponse(200, "success", AppTool.ListObjectTo(brandMapper.getBrands(), "brandId", "brandName"));
    }

    /**
     * GetSubBrandNames
     */
    @GetMapping("/sub_brand_names")
    public ApiResponse SubBrandNames(@RequestParam(required = false) String brandName) {
        List<OptionIdName> subBrandNames = brandName == null ? AppTool.ListObjectTo(subBrandMapper.getSubBrandsForRand(20), "subBrandId", "subBrandName") :
                AppTool.ListObjectTo(subBrandMapper.getSubBrandsByBrandName(brandName), "subBrandId", "subBrandName");
        return new ApiResponse(200, "success", subBrandNames);
    }

    /**
     * GetModelNames
     */
    @GetMapping("/model_names")
    public ApiResponse ModelNames(
            @RequestParam(required = false) String brandName,
            @RequestParam(required = false) String subBrandName
    ) {
        if (subBrandName != null)
            return new ApiResponse(200, "success", AppTool.ListObjectTo(
                    carModelMapper.getModelNameIdBySubBrandName(subBrandName), "modelId", "modelName"
            ));

        if (brandName != null)
            return new ApiResponse(200, "success", AppTool.ListObjectTo(
                    carModelMapper.getModelNameIdByBranName(brandName, 20), "modelId", "modelName"));

        return new ApiResponse(200, "success", AppTool.ListObjectTo(
                carModelMapper.getModelNameIdForRand(20), "modelId", "modelName"));
    }

    /**
     * GetCarByCondition
     */
    @GetMapping("/car_condition")
    public ApiResponse CarByCondition(
            @ModelAttribute ScreeningCondition option,
            @RequestParam(required = false, defaultValue = "1") int pageIndex,
            @RequestParam(required = false, defaultValue = "20") int pageSize
    ) {
        PageHelper.startPage(pageIndex, pageSize);
        List<CarForDisplay> carDisplays = carInfoMapper.getCarByCondition(option);
        PageInfo<CarForDisplay> pageInfo = new PageInfo<>(carDisplays);
        return new ApiResponse(200, "success", pageInfo);
    }

    @GetMapping("/car_detail/{modelId}")
    public ApiResponse CarDetail(@PathVariable Integer modelId) {
        if (modelId == null)
            return new ApiResponse(300, "非法参数");

        return new ApiResponse(200, "success", carService.getCarDetailInfo(modelId));
    }
}

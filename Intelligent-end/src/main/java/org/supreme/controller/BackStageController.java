package org.supreme.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.gson.Gson;
import org.springframework.web.bind.annotation.*;
import org.supreme.mapper.DatabaseMapper;
import org.supreme.model.entity.*;
import org.supreme.utils.ApiResponse;
import org.supreme.utils.AppTool;

import javax.annotation.Resource;
import java.util.List;

/**
 * BackStageController
 */
@RestController
@RequestMapping("/bk")
public class BackStageController {
    @Resource
    private DatabaseMapper databaseMapper;

    @PostMapping("/select/{tableName}")
    public ApiResponse SelectTableData(
            @PathVariable String tableName,
            @RequestParam(required = false, defaultValue = "1") Integer currentPage,
            @RequestParam(required = false, defaultValue = "20") Integer pageSize
    ) {
        if (CheckTableName(tableName)) {
            return new ApiResponse(300, "错误表名"  + tableName);
        }

        PageHelper.startPage(currentPage, pageSize);
        PageInfo<?> pageInfo = null;
        switch (tableName) {
            case "user":
                List<User> userInfos = databaseMapper.selectUser(null, tableName);
                pageInfo = new PageInfo<>(userInfos);
                break;
            case "brand":
                List<Brand> brandInfos = databaseMapper.selectBrand(null, tableName);
                pageInfo = new PageInfo<>(brandInfos);
                break;
            case "sub_brand":
                List<SubBrand> subBrandInfos = databaseMapper.selectSubBrand(null, tableName);
                pageInfo = new PageInfo<>(subBrandInfos);
                break;
            case "car_model":
                List<CarModel> carModelInfos = databaseMapper.selectCarModel(null, tableName);
                pageInfo = new PageInfo<>(carModelInfos);
                break;
            case "car_info":
                List<CarInfo> carInfos = databaseMapper.selectCarInfo(null, tableName);
                pageInfo = new PageInfo<>(carInfos);
                break;
            case "car_sale":
                List<CarSale> carSalesInfos = databaseMapper.selectCarSale(null, tableName);
                pageInfo = new PageInfo<>(carSalesInfos);
                break;
            case "car_star":
                List<CarStar> carStarInfos = databaseMapper.selectCarStar(null, tableName);
                pageInfo = new PageInfo<>(carStarInfos);
                break;
        }
        if (pageInfo != null && pageInfo.getList().size() > pageSize) {
            return new ApiResponse(300, "error");
        }

        // TODO 具体查询逻辑
        return new ApiResponse(200, "success", pageInfo);
    }

    /**
     * DeleteTableData
     */
    @PostMapping("/delete/{tableName}/{key}")
    public ApiResponse DeleteTableData(
            @PathVariable String tableName,
            @PathVariable Long key
    ) {
        if (CheckTableName(tableName)) {
            return new ApiResponse(300, "错误表名");
        }

        int updateNum = databaseMapper.deleteDataByTableNameKey(tableName, key);

        return updateNum > 0 ? new ApiResponse(205, "删除成功") : new ApiResponse(505, "删除失败");
    }

    /**
     * InsertTableData
     */
    @PostMapping("/insert/{tableName}")
    public ApiResponse InsertTableData(
            @RequestBody Object insertData,
            @PathVariable String tableName
    ) {
        if (CheckTableName(tableName)) {
            return new ApiResponse(300, "错误表名");
        }

        if (tableName.equals("user")) {
            Gson gson = new Gson();
            User user = gson.fromJson(gson.toJson(insertData), User.class);
            if (user != null && user.getPassword() != null) {
                user.setPassword(AppTool.MD5hash(user.getPassword()));
            }
            insertData = user;
        }

        int updateNum = databaseMapper.insertDataByTableName(insertData, tableName);

        return updateNum > 0 ? new ApiResponse(205, "插入成功") : new ApiResponse(505, "插入失败");
    }

    /**
     * UpdateTableData
     */
    @PostMapping("/update/{tableName}")
    public ApiResponse UpdateTableData(
            @RequestBody Object upDateData,
            @PathVariable String tableName
    ) {
        if (CheckTableName(tableName)) {
            return new ApiResponse(300, "错误表名");
        }

        if (tableName.equals("user")) {
            Gson gson = new Gson();
            User user = gson.fromJson(gson.toJson(upDateData), User.class);
            if (user != null && user.getPassword() != null) {
                user.setPassword(AppTool.MD5hash(user.getPassword()));
            }
            upDateData = user;
        }

        int updateNum = databaseMapper.updateDataByTableName(upDateData, tableName);
        return updateNum > 0 ? new ApiResponse(205, "更新成功") : new ApiResponse(505, "更新失败");
    }

    // 校验表名
    private boolean CheckTableName(String tableName) {
        String[] tableNames = {"brand", "sub_brand", "car_model", "car_info", "car_sale", "car_star", "user"};
        for (String name : tableNames) {
            if (name.equals(tableName))
                return false;
        }

        return true;
    }
}

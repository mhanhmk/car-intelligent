package org.supreme.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;
import org.supreme.mapper.*;
import org.supreme.model.dto.UserRequestBody;
import org.supreme.model.entity.CarStar;
import org.supreme.model.entity.User;
import org.supreme.exception.ErrorException;
import org.supreme.model.vo.CarSaleInfo;
import org.supreme.model.vo.CarStarInfo;
import org.supreme.utils.FieldCopyUtils;

import javax.annotation.Resource;

import java.sql.Date;
import java.util.Calendar;
import java.util.List;

import static org.supreme.utils.AppTool.MD5hash;

@Service
public class UserService {
    @Resource
    private UserMapper userMapper;

    @Resource
    private CarStarMapper carStarMapper;

    @Resource
    private CarSaleMapper carSaleMapper;

    @Resource
    private CarModelMapper carModelMapper;

    public User forLogin(String username, String passwd) {
        User name_user = userMapper.getByUsername(username);
        if (name_user != null) {
            if (name_user.getPassword().equals(MD5hash(passwd))) {
                return name_user;
            } else {
                throw new ErrorException(505, "密码错误");
            }
        } else {
            User email_user = userMapper.getByEmail(username);
            if (email_user != null) {
                if (email_user.getPassword().equals(MD5hash(passwd))) {
                    return email_user;
                } else {
                    throw new ErrorException(505, "密码错误");
                }
            } else {
                throw new ErrorException(505, "用户名或邮箱不存在");
            }
        }
    }

    public int forRegister(String userName, String passwd, String email) {
        if (userMapper.getByUsername(userName) != null) {
            throw new ErrorException(505, "用户名已存在");
        }

        if (userMapper.getByEmail(email) != null) {
            throw new ErrorException(505, "邮箱已注册");
        }

        return userMapper.insertUser(userName, MD5hash(passwd), email);
    }

    public int updateUserInfo(int id, UserRequestBody userRequest) {
        User oldUserInfo = userMapper.getById(id);
        if (oldUserInfo == null) {
            return 0;
        }

        // 检查用户名和邮箱是否已存在
        User userByUserName = userMapper.getByUsername(userRequest.getUserName());
        if (userByUserName != null && !userByUserName.getUserName().equals(userRequest.getUserName())) {
            throw new ErrorException(505, "用户名已存在");
        }

        User userByEmail = userMapper.getByEmail(userRequest.getEmail());
        if (userByEmail != null && !userByEmail.getEmail().equals(userRequest.getEmail())) {
            throw new ErrorException(505, "邮箱已存在");
        }

        // 将新的用户信息拷贝到旧用户
        FieldCopyUtils.copyNonNullFields(oldUserInfo, userRequest);

        return userMapper.updateUserInfo(oldUserInfo, "user");
    }

    public int star(Integer userId, Integer starId) {
        if (carModelMapper.getModelBYModelId(starId) == null) {
            throw new ErrorException(300, "非法请求");
        }

        CarStar carStar = new CarStar();
        carStar.setModelId(starId);
        carStar.setUserId(userId);
        java.util.Date utilDate = Calendar.getInstance().getTime();
        carStar.setStarDate(new Date(utilDate.getTime()));

        return carStarMapper.insertCarStar(carStar);
    }

    public int cancelStar(Integer userId, Integer starId) {
        return carStarMapper.deleteStarByUserIdCarId(userId, starId);
    }

    public PageInfo<?> userSales(Integer userId, Integer currentPage, Integer pageSize) {
        PageHelper.startPage(currentPage, pageSize);
        List<CarSaleInfo> carSaleInfos = carSaleMapper.getSaleInfo(userId);
        return new PageInfo<>(carSaleInfos);
    }

    public PageInfo<?> userStars(Integer userId, Integer currentPage, Integer pageSize) {
        PageHelper.startPage(currentPage, pageSize);
        List<CarStarInfo> starInfos = carStarMapper.getUserStars(userId);
        return new PageInfo<>(starInfos);
    }
}

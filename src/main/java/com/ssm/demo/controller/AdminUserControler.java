package com.ssm.demo.controller;

import com.ssm.demo.common.Result;
import com.ssm.demo.common.ResultGenerator;
import com.ssm.demo.entity.AdminUser;
import com.ssm.demo.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by 13 on 2018/7/4.
 */
@RestController
@RequestMapping("/users")
public class AdminUserControler {

    @Autowired
    private AdminUserService adminUserService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Result login(@RequestBody AdminUser user) {
        Result result = ResultGenerator.genFailResult("登录失败");
        if (StringUtils.isEmpty(user.getUserName()) || StringUtils.isEmpty(user.getPassword())) {
            result.setMessage("请填写登录信息！");
        }
        System.out.println(user.getUserName() + user.getPassword());
        try {
            AdminUser loginUser = adminUserService.updateTokenAndLogin(user.getUserName(), user.getPassword());
            System.out.println(loginUser);
            if (loginUser != null) {
                result = ResultGenerator.genSuccessResult(loginUser);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public Result register(@RequestBody AdminUser user) {
        Result result = ResultGenerator.genFailResult("注册失败");
        System.out.println(user.getUserName() + user.getPassword());
        return result;
    }
}

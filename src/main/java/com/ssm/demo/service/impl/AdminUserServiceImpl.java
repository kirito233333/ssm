package com.ssm.demo.service.impl;

import com.ssm.demo.dao.AdminUserDao;
import com.ssm.demo.entity.AdminUser;
import com.ssm.demo.service.AdminUserService;
import com.ssm.demo.utils.MD5Util;
import com.ssm.demo.utils.NumberUtil;
import com.ssm.demo.utils.SystemUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by 13 on 2018/7/4.
 */
@Service("adminUserService")//注意这个注解
public class AdminUserServiceImpl implements AdminUserService {

    @Autowired
    private AdminUserDao adminUserDao;

    @Override
    public AdminUser updateTokenAndLogin(String userName, String password) {
        System.out.println("+++"+userName+password);
        AdminUser adminUser = adminUserDao.getAdminUserByUserNameAndPassword(userName, MD5Util.MD5Encode(password, "UTF-8"));
        if (adminUser != null) {
            //登录后即执行修改token的操作
            String token = getNewToken(System.currentTimeMillis() + "", adminUser.getId());
            if (adminUserDao.updateUserToken(adminUser.getId(), token) > 0) {
                //返回数据时带上token
                adminUser.setUserToken(token);
                return adminUser;
            }
        }
        return null;
    }

    /**
     * 获取token值
     *
     * @param sessionId
     * @param userId
     * @return
     */
    private String getNewToken(String sessionId, Long userId) {
        String src = sessionId + userId + NumberUtil.genRandomNum(4);
        return SystemUtil.genToken(src);
    }

    @Override
    public AdminUser getAdminUserByToken(String userToken) {
        return adminUserDao.getAdminUserByToken(userToken);
    }
}

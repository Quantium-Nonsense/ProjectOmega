package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.auth.Privilege;


public interface PrivilegeService {
    Privilege findByName(String name);
}

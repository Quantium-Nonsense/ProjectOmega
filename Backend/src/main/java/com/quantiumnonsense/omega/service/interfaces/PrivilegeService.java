package com.quantiumnonsense.omega.service.interfaces;

import com.quantiumnonsense.omega.bean.dao.auth.Privilege;


public interface PrivilegeService {
    Privilege findByName(String name);

    void create(Privilege privilege);
}

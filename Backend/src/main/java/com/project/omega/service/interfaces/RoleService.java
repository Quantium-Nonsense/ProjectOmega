package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.auth.Role;

public interface RoleService {

    Role findByName(String name);

    void save(Role useRole);

}

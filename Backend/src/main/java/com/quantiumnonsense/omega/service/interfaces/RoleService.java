package com.quantiumnonsense.omega.service.interfaces;

import com.quantiumnonsense.omega.bean.dao.auth.Role;

import java.util.List;

public interface RoleService {

    Role findByName(String name);

    List<Role> findAll();

    void deleteRoleById(Long id);

    void save(Role useRole);

}

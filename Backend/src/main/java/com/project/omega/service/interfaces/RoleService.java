package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.auth.Role;

import java.util.List;

public interface RoleService {

    Role findByName(String name);

    Role findById(Long id);

    List<Role> findAll();

    void deleteRoleById(Long id);

    void save(Role useRole);

}

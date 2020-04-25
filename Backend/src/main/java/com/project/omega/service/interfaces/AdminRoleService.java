package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.auth.AdminRoles;
import com.project.omega.bean.dto.RoleDTO;
import com.project.omega.exceptions.NoRolesCreatedException;

import java.util.List;

public interface AdminRoleService {

    AdminRoles findByName(String name);

    AdminRoles create(RoleDTO roleDTO);

    AdminRoles deleteRoleById(Long roleId);

    List<AdminRoles> getAllRoles() throws NoRolesCreatedException;

}

package com.project.omega.service.implmentations;

import com.project.omega.bean.dao.auth.AdminRoles;
import com.project.omega.bean.dao.auth.Privilege;
import com.project.omega.bean.dto.IRoleUTO;
import com.project.omega.exceptions.NoRolesCreatedException;
import com.project.omega.helper.PrivilegeValidator;
import com.project.omega.repository.AdminRoleRepository;
import com.project.omega.repository.PrivilegeRepository;
import com.project.omega.service.interfaces.AdminRoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Service
@Transactional
public class AdminRoleServiceImpl implements AdminRoleService {

    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private AdminRoleRepository adminRoleRepository;

    @Autowired
    private PrivilegeRepository privilegeRepository;

    @Override
    public AdminRoles findByName(String name) {
        LOGGER.debug("Getting Roles by Name: {}", name);
        return adminRoleRepository.findByName(name);
    }

    @Override
    public AdminRoles create(IRoleUTO iRoleUTO) {
        LOGGER.debug("Creating Roles with information: {}", iRoleUTO);
        Collection<Privilege> privilegeList = iRoleUTO.getPrivileges();
        for (Privilege privilege : privilegeList) {
            boolean validator = PrivilegeValidator.privilegeValidator(privilege.getName());
            if (validator) {
                if (privilegeRepository.findByName(privilege.getName()) == null) {
                    privilegeRepository.save(new Privilege(privilege.getName()));
                }
            }
        }
        AdminRoles iRoles = new AdminRoles.AdminRolesBuilder()
                .setName(iRoleUTO.getName())
                .setPrivileges(privilegeList)
                .build();
        adminRoleRepository.save(iRoles);
        return iRoles;
    }

    @Override
    public AdminRoles deleteRoleById(Long roleId) {
        LOGGER.debug("Deleting Roles : {}", roleId);
        AdminRoles iRole = adminRoleRepository.getOne(roleId);
        adminRoleRepository.delete(iRole);
        return iRole;
    }

    @Override
    public List<AdminRoles> getAllRoles() throws NoRolesCreatedException {
        LOGGER.debug("Get All Created Roles with Permissions: {}");
        List<AdminRoles> rolesList = adminRoleRepository.findAll();
        if (rolesList.isEmpty()) {
            throw new NoRolesCreatedException("There no available roles");
        }
        return rolesList;
    }
}

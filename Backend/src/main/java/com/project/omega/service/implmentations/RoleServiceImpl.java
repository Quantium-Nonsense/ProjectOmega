package com.project.omega.service.implmentations;

import com.project.omega.bean.dao.auth.Role;
import com.project.omega.repository.RoleRepository;
import com.project.omega.service.interfaces.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name);
    }

    @Override
    public void save(Role useRole) {
        roleRepository.save(useRole);
    }
}

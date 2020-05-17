package com.project.omega.service.implmentations;

import com.project.omega.bean.dao.auth.Privilege;
import com.project.omega.repository.PrivilegeRepository;
import com.project.omega.service.interfaces.PrivilegeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PrivilegeServiceImpl implements PrivilegeService {

    @Autowired
    private PrivilegeRepository privilegeRepository;

    @Override
    public Privilege findByName(String name) {
        return privilegeRepository.findByName(name);
    }

    @Override
    public void create(Privilege privilege) {
        privilegeRepository.save(privilege);
    }
}

package com.quantiumnonsense.omega.service.implmentations;

import com.quantiumnonsense.omega.bean.dao.auth.Privilege;
import com.quantiumnonsense.omega.repository.PrivilegeRepository;
import com.quantiumnonsense.omega.service.interfaces.PrivilegeService;
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

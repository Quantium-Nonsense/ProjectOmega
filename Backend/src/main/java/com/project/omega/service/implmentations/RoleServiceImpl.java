package com.project.omega.service.implmentations;

import com.project.omega.bean.dao.auth.Role;
import com.project.omega.helper.RoleBasedConstant;
import com.project.omega.repository.RoleRepository;
import com.project.omega.service.interfaces.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name);
    }

    @Override
    public Role findById(Long id) {
        return roleRepository.findById(id).get();
    }

    @Override
    public List<Role> findAll() {
        List<Role> roles = roleRepository.findAll();
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        List<GrantedAuthority> authorities = currentUser.getAuthorities().stream().collect(Collectors.toList());
        boolean isAdmin = authorities.stream().anyMatch(a -> a.getAuthority().equals(RoleBasedConstant.ADMIN) &&
                a.getAuthority().equals(RoleBasedConstant.DEFAULT_USER));
        if(isAdmin) {
            roles.remove(roleRepository.findByName(RoleBasedConstant.SUPER_ADMIN));
        }
        return roles;
    }

    @Override
    public void deleteRoleById(Long id) {
        roleRepository.deleteById(id);
    }

    @Override
    public void save(Role useRole) {
        roleRepository.save(useRole);
    }
}

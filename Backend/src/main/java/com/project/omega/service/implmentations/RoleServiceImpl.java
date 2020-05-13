package com.project.omega.service.implmentations;

import com.project.omega.bean.dao.auth.Privilege;
import com.project.omega.bean.dao.auth.Role;
import com.project.omega.helper.PrivilegeValidator;
import com.project.omega.helper.RoleBasedConstant;
import com.project.omega.repository.RoleRepository;
import com.project.omega.service.interfaces.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService {
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PrivilegeServiceImpl privilegeService;

    @Autowired
    private MessageSource messages;

    @Override
    public Role findByName(String name) {
        LOGGER.debug("Getting Roles by Name: {}", name);
        Role role = roleRepository.findByName(name);
        if(role == null) {
            throw new RuntimeException(messages.getMessage("message.roleNotFound", null, null));
        }
        return roleRepository.findByName(name);
    }

    @Override
    public List<Role> findAll() {
        LOGGER.debug("Fetching all available roles.");
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
        LOGGER.debug("Deleting Roles : {}", id);
        roleRepository.deleteById(id);
    }

    @Override
    public void save(Role useRole) {
        LOGGER.debug("Creating Roles with information: {}", useRole);
        Collection<Privilege> privilegeList = useRole.getPrivileges();
        if(roleRepository.findByName(useRole.getName()) == null) {
            for (Privilege privilege : privilegeList) {
                boolean validator = PrivilegeValidator.privilegeValidator(privilege.getName());
                if (validator) {
                    if (privilegeService.findByName(privilege.getName()) == null) {
                        privilegeService.create(new Privilege(privilege.getName()));
                    }
                }
            }
            roleRepository.save(useRole);
        } else {
            throw new RuntimeException(messages.getMessage("message.roleExists", null, null));
        }

    }
}

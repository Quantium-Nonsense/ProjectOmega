package com.project.omega.authentication;

import com.project.omega.bean.dao.auth.AdminRoles;
import com.project.omega.bean.dao.auth.Privilege;
import com.project.omega.bean.dao.auth.Role;
import com.project.omega.bean.dao.entity.User;
import com.project.omega.helper.RoleBasedConstant;
import com.project.omega.repository.AdminRoleRepository;
import com.project.omega.repository.PrivilegeRepository;
import com.project.omega.repository.RoleRepository;
import com.project.omega.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Component
public class SetupDataLoaderForRoleAndPrivilege implements ApplicationListener<ContextRefreshedEvent> {
    private boolean alreadySetup = false;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PrivilegeRepository privilegeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AdminRoleRepository adminRoleRepository;

    @Override
    @Transactional
    public void onApplicationEvent(final ContextRefreshedEvent event) {
        if (alreadySetup) {
            return;
        }

        // == create initial privileges
        final Privilege readPrivilege = createPrivilegeIfNotFound("READ_PRIVILEGE");
        final Privilege writePrivilege = createPrivilegeIfNotFound("WRITE_PRIVILEGE");
        final Privilege passwordPrivilege = createPrivilegeIfNotFound("CHANGE_PASSWORD_PRIVILEGE");

        // == create initial roles
        final List<Privilege> adminPrivileges = new ArrayList<Privilege>(Arrays.asList(readPrivilege, writePrivilege, passwordPrivilege));
        final List<Privilege> userPrivileges = new ArrayList<Privilege>(Arrays.asList(readPrivilege, passwordPrivilege));

        createRoleIfNotFound(RoleBasedConstant.DEFAULT_USER, adminPrivileges);
        Role role = createRoleIfNotFound(RoleBasedConstant.SUPER_ADMIN, adminPrivileges);
        createRoleIfNotFound(RoleBasedConstant.ADMIN, adminPrivileges);
        createRoleIfNotFound(RoleBasedConstant.REP, userPrivileges);

        // == create initial user
        createUserIfNotFound("alex.karp475@gmail.com", "Nonsense", new ArrayList<Role>(Arrays.asList(role)));
        createUserIfNotFound("harryspitsillides@hotmail.com", "Nonsense", new ArrayList<Role>(Arrays.asList(role)));
        createUserIfNotFound("kaylesh.patel@live.co.uk", "Nonsense", new ArrayList<Role>(Arrays.asList(role)));
        createUserIfNotFound("dutta_ari@yahoo.in", "Nonsense", new ArrayList<Role>(Arrays.asList(role)));
        createUserIfNotFound("markscamilleri@gmail.com", "Nonsense", new ArrayList<Role>(Arrays.asList(role)));
        createUserIfNotFound("khalil.alhabal@gmail.com", "Nonsense", new ArrayList<Role>(Arrays.asList(role)));
        createUserIfNotFound("lixiaozhe.society@gmail.com", "Nonsense", new ArrayList<Role>(Arrays.asList(role)));
        createUserIfNotFound("dominikwas@outlook.com", "Nonsense", new ArrayList<Role>(Arrays.asList(role)));

        alreadySetup = true;
    }

    @Transactional
    private final Privilege createPrivilegeIfNotFound(final String name) {
        Privilege privilege = privilegeRepository.findByName(name);
        if (privilege == null) {
            privilege = new Privilege(name);
            privilege = privilegeRepository.save(privilege);
        }
        return privilege;
    }

    private final AdminRoles createAdminRoleIfNotFound(String name, Collection<Privilege> privileges) {
        AdminRoles role = adminRoleRepository.findByName(name);
        if (role == null) {
            role = new AdminRoles.AdminRolesBuilder()
                    .setName(name)
                    .setPrivileges(privileges)
                    .build();
        }
        role = adminRoleRepository.save(role);
        return role;
    }

    @Transactional
    private final Role createRoleIfNotFound(final String name, final Collection<Privilege> privileges) {
        Role role = roleRepository.findByName(name);
        if (role == null) {
            role = new Role(name);
        }
        role.setPrivileges(privileges);
        role = roleRepository.save(role);
        return role;
    }

    @Transactional
    private final User createUserIfNotFound(final String email,
                                            final String password, final Collection<Role> roles) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            user = new User.UserBuilder()
                    .setEmail(email)
                    .setPassword(passwordEncoder.encode(password))
                    .build();
        }
        user.setRoles(roles);
        user = userRepository.save(user);
        return user;
    }
}

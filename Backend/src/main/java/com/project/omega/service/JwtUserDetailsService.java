package com.project.omega.service;


import com.project.omega.bean.dao.auth.Role;
import com.project.omega.bean.dao.entity.User;
import com.project.omega.bean.dto.UserDTO;
import com.project.omega.exceptions.DuplicateUserException;
import com.project.omega.helper.RoleBasedConstant;
import com.project.omega.repository.UserRepository;
import com.project.omega.service.interfaces.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final Logger LOGGER = LoggerFactory.getLogger(getClass());
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private RoleService roleService;

    @Autowired
    private MessageSource messages;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
                new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }

    public User createUser(UserDTO user) throws DuplicateUserException {
        LOGGER.debug("Creating user account with information: {}", user);
        String email = user.getEmail();
        if (userRepository.existsByEmail(email)) {
            throw new DuplicateUserException(messages.getMessage("UniqueUsername.user.username", null, null));
        }
        Collection<Role> assignedRoles = user.getRoles();
        if(assignedRoles == null) {
            assignedRoles = new ArrayList<>();
        }
        if (assignedRoles.isEmpty()) {
            assignedRoles.add(roleService.findByName(RoleBasedConstant.DEFAULT_USER));
        }
        User registeredUser = bindUser(user, assignedRoles);
        return registeredUser;
    }

    public User bindUser(UserDTO users, Collection<Role> assignedRoles) {
        User u = new User.UserBuilder()
                .setEmail(users.getEmail())
                .setPassword(bcryptEncoder.encode(users.getPassword()))
                .setRoles(assignedRoles)
                .setEnabled(true)
                .build();
        return userRepository.save(u);
    }
}
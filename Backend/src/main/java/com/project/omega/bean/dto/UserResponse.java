package com.project.omega.bean.dto;

import com.project.omega.bean.dao.auth.Role;

import java.util.Collection;

public class UserResponse {
    private Long id;
    private String email;
    private Collection<Role> roles;

    public UserResponse(Long id, String email, Collection<Role> roles) {
        this.id = id;
        this.email = email;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }
}

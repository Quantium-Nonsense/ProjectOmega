package com.quantiumnonsense.omega.bean.dto;


import com.quantiumnonsense.omega.bean.dao.auth.Role;
import com.quantiumnonsense.omega.helper.annotations.ValidPassword;

import java.util.Collection;

public class UserDTO {
    private String email;
    @ValidPassword
    private String password;
    private Collection<Role> roles;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }
}


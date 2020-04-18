package com.project.omega.bean.dto;


import com.project.omega.bean.dao.auth.Role;
import com.project.omega.helper.annotations.ValidPassword;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Collection;

public class UserDTO {
    private String email;
    @ValidPassword
    private String password;
    private Collection<Role> roles;
    @NotNull
    @Size(min = 1)
    private String matchingPassword;

    public String getMatchingPassword() {
        return matchingPassword;
    }

    public void setMatchingPassword(String matchingPassword) {
        this.matchingPassword = matchingPassword;
    }

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


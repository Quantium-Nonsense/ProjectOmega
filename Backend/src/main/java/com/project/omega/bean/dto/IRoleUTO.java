package com.project.omega.bean.dto;

import com.project.omega.bean.dao.auth.Privilege;

import java.util.Collection;

public class IRoleUTO {

    private String name;

    private Collection<Privilege> privileges;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Collection<Privilege> getPrivileges() {
        return privileges;
    }

    public void setPrivileges(Collection<Privilege> privileges) {
        this.privileges = privileges;
    }
}

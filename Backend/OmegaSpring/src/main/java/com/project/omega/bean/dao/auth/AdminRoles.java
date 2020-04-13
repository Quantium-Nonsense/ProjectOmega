package com.project.omega.bean.dao.auth;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class AdminRoles {

    /*
     *
     * Admin Roles - For Super admins and Admins
     *
     *
     * */

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToMany
    @JoinTable(name = "roles_privileges", joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "privilege_id", referencedColumnName = "id"))
    private Collection<Privilege> privileges;

    public AdminRoles(final String name) {
        super();
        this.name = name;
    }

    public AdminRoles(String name, Collection<Privilege> privileges) {
        this.name = name;
        this.privileges = privileges;
    }


    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Collection<Privilege> getPrivileges() {
        return privileges;
    }

    public static class AdminRolesBuilder {

        private Long id;

        private String name;

        private Collection<Privilege> privileges;


        public AdminRolesBuilder() {
        }

        public AdminRolesBuilder setId(Long id) {
            this.id = id;
            return this;
        }

        public AdminRolesBuilder setName(String name) {
            this.name = name;
            return this;
        }

        public AdminRolesBuilder setPrivileges(Collection<Privilege> privileges) {
            this.privileges = privileges;
            return this;
        }

        public AdminRoles build() {
            return new AdminRoles(name);
        }
    }

    @Override
    public String toString() {
        return "IRoles{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", privileges=" + privileges +
                '}';
    }

}

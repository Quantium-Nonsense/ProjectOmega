package com.project.omega.bean;

import com.project.omega.enums.RoleEnum;
import lombok.Builder;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Entity
@Builder
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @Enumerated(EnumType.STRING)
    private RoleEnum role;

//    private Long industry;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
//    private Role role;

    public User() {

    }

    public User(Long id, String email, String password, RoleEnum role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RoleEnum getRole() {
        return role;
    }

    public void setRole(RoleEnum role) {
        this.role = role;
    }

    public static class UserBuilder {

        private Long id;
        private String email;
        private String password;
        private RoleEnum role;

        public UserBuilder() {
        }

        public UserBuilder setId(Long id) {
            this.id = id;
            return this;
        }

        public UserBuilder setEmail(String email) {
            this.email = email;
            return this;
        }

        public UserBuilder setPassword(String password) {
            this.password = password;
            return this;
        }

        public UserBuilder setRole(RoleEnum role) {
            this.role = role;
            return this;
        }

        public User build() {
            return new User(id, email, password, role);
        }
    }
}

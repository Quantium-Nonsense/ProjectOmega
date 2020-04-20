package com.project.omega.bean.dao.entity;

import org.hibernate.annotations.DynamicUpdate;
import org.springframework.transaction.annotation.Transactional;
//some extra stuff
import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@DynamicUpdate(true)
@Table(name = "industry")
@Transactional
public class Industry {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @OneToOne(mappedBy = "industry")
    private User user;

    public Industry() {
    }

    public Industry(Long id, String name, String description, User user) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.user = user;
    }

    public Industry(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public static class IndustryBuilder {
        private Long id;
        private String name;
        private String description;
        private User user;

        public IndustryBuilder() {

        }

        public IndustryBuilder setId(Long id) {
            this.id = id;
            return this;
        }

        public IndustryBuilder setName(String name) {
            this.name = name;
            return this;
        }

        public IndustryBuilder setDescription(String description) {
            this.description = description;
            return this;
        }

        public IndustryBuilder setUser(User user) {
            this.user = user;
            return this;
        }

        public Industry build() {
            return new Industry(id, name, description, user);
        }
    }
}







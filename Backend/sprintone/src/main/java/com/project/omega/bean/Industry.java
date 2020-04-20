package com.project.omega.bean;

import lombok.Builder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Entity
@Builder
public class Industry {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    public Industry(){}

    public Industry(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIndustryName() {
        return name;
    }

    public void setIndustryName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public static class IndustryBuilder {
        private Long id;
        private String name;
        private String description;

        public IndustryBuilder setId(Long id) {
            this.id = id;
            return this;
        }

        public IndustryBuilder setIndustryName(String name) {
            this.name = name;
            return this;
        }

        public IndustryBuilder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Industry build() {
            return new Industry(id, name, description);
        }
    }
}







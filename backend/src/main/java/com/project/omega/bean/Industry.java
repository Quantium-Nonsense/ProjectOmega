package com.project.omega.bean;

import lombok.Builder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Entity
@Builder
public class Industry implements Serializable {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String industryName;

    @NotBlank
    private String description;

    public Industry(){}

    public Industry(Long id, String industryName, String description) {
        this.id = id;
        this.industryName = industryName;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIndustryName() {
        return industryName;
    }

    public void setIndustryName(String industryName) {
        this.industryName = industryName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public static class IndustryBuilder {
        private Long id;
        private String industryName;
        private String description;

        public IndustryBuilder setId(Long id) {
            this.id = id;
            return this;
        }

        public IndustryBuilder setIndustryName(String industryName) {
            this.industryName = industryName;
            return this;
        }

        public IndustryBuilder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Industry build() {
            return new Industry(id, industryName, description);
        }
    }
}







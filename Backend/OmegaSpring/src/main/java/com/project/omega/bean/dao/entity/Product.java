package com.project.omega.bean.dao.entity;

import lombok.Builder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;

@Entity
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @PositiveOrZero
    private int price;

    public Product() {

    }

    public Product(Long id, String name, String description, int price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public static class ProductBuilder {

        private Long id;
        private String name;
        private String description;
        private int price;

        public ProductBuilder() {
        }

        public Product.ProductBuilder setId(Long id) {
            this.id = id;
            return this;
        }

        public Product.ProductBuilder setName(String name) {
            this.name = name;
            return this;
        }

        public Product.ProductBuilder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Product.ProductBuilder setPrice(int price) {
            this.price = price;
            return this;
        }

        public Product build() {
            return new Product(id, name, description, price);
        }
    }
}

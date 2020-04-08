package com.project.omega.bean;

import lombok.Builder;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;
import java.io.Serializable;

@Entity
@Builder
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotBlank
    private String category;

    @PositiveOrZero
    private int price;

    @OneToMany
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Product() {

    }

    public Product(Long id, String name, String description, String category, int price, User user) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.user = user;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public User getUser() {
        return user;
    }

    public void setUser() {
        this.user = user;
    }

    public static class ProductBuilder {

        private Long id;
        private String name;
        private String description;
        private String category;
        private int price;
        private User user;

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

        public Product.ProductBuilder setCategory(String category) {
            this.category = category;
            return this;
        }

        public Product.ProductBuilder setPrice(int price) {
            this.price = price;
            return this;
        }

        public Product.ProductBuilder setUser(User user) {
            this.user = user;
            return this;
        }

        public Product build() {
            return new Product(id, name, description, category, price, user);
        }
    }
}

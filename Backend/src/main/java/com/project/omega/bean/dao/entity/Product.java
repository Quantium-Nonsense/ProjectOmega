package com.project.omega.bean.dao.entity;

import lombok.Builder;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;
import java.io.Serializable;

@Entity
@Builder
@Table(name = "products")
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @PositiveOrZero
    private int price;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "supplier_id", referencedColumnName = "id")
    private Supplier supplier;

    public Product() {

    }

    public Product(Long id, String name, String description, int price, Supplier supplier) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.supplier = supplier;
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

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public static class ProductBuilder {

        private Long id;
        private String name;
        private String description;
        private int price;
        private Supplier supplier;

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

        public Product.ProductBuilder setSupplier(Supplier supplier) {
            this.supplier = supplier;
            return this;
        }

        public Product build() {
            return new Product(id, name, description, price, supplier);
        }
    }
}


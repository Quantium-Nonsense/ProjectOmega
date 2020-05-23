package com.quantiumnonsense.omega.bean.dto;

import com.quantiumnonsense.omega.bean.dao.entity.Supplier;

public class ProductDTO {

    private String name;

    private String description;

    private int price;

    private Supplier supplier;

    public ProductDTO(String name, String description, int price, Supplier supplier) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.supplier = supplier;
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
        return this.supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }
}

package com.project.omega.dto;

import com.project.omega.bean.Product;

import java.io.Serializable;


public class OrderProductDto implements Serializable {
    private Product product;
    private Integer quantity;

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}

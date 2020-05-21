package com.project.omega.bean.dto;

import com.project.omega.bean.dao.entity.Client;
import com.project.omega.bean.dao.entity.Product;
import com.project.omega.bean.dao.entity.User;

import java.io.Serializable;


public class OrderProductDto implements Serializable {
    private Product product;
    private Integer quantity;
    private Client client;

    public OrderProductDto(Product product, Integer quantity, Client client) {
        this.product = product;
        this.quantity = quantity;
        this.client = client;
    }

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

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}

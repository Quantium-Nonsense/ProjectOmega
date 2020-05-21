package com.project.omega.bean.dto;

public class ProductDTO {
    private Long id;

    private String name;

    private String description;

    private int price;

    private Long supplierId;

    public ProductDTO(Long id, String name, String description, int price, Long supplierId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.supplierId = supplierId;
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

    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }
}

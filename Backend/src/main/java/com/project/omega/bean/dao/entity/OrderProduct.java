package com.project.omega.bean.dao.entity;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class OrderProduct implements Serializable {
//    @Id
//    @JsonIgnore
//    private OrderProductPK productPk;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product productPk;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;

    @Column(nullable = false)
    private Integer quantity;


    public OrderProduct() {
        super();
    }

    public OrderProduct(Product productPk, Client client, Integer quantity) {
        this.productPk = productPk;
        this.client = client;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProductPk() {
        return productPk;
    }

    public void setProductPk(Product productPk) {
        this.productPk = productPk;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderProduct that = (OrderProduct) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(productPk, that.productPk) &&
                Objects.equals(client, that.client) &&
                Objects.equals(quantity, that.quantity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, productPk, client, quantity);
    }
}


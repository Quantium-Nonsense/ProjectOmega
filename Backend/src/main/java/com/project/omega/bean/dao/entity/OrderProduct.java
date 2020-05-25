package com.project.omega.bean.dao.entity;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class OrderProduct implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    private Client client;

    @Column(nullable = false)
    private Integer quantity;


    public OrderProduct() {
        super();
    }

    public OrderProduct(Product product, Client client, Integer quantity) {
        this.product = product;
        this.client = client;
        this.quantity = quantity;
    }

    public OrderProduct(Long id, Product product, Client client, Integer quantity) {
        this.id = id;
        this.product = product;
        this.client = client;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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
                Objects.equals(product, that.product) &&
                Objects.equals(client, that.client) &&
                Objects.equals(quantity, that.quantity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, product, client, quantity);
    }

    public static class OrderProductBuilder {

        private Long id;

        private Product product;

        private Client client;

        private int quantity;

        public OrderProductBuilder() {

        }

        public OrderProduct.OrderProductBuilder setId(Long id) {
            this.id = id;
            return this;
        }

        public OrderProduct.OrderProductBuilder setProduct(Product product) {
            this.product = product;
            return this;
        }

        public OrderProduct.OrderProductBuilder setClient(Client client) {
            this.client = client;
            return this;
        }

        public OrderProduct.OrderProductBuilder setQuantity(int quantity) {
            this.quantity = quantity;
            return this;
        }

        public OrderProduct build() {
            return new OrderProduct(id, product, client, quantity);
        }

    }
}


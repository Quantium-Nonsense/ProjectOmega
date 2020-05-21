package com.project.omega.bean.dao.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Embeddable
public class OrderProduct implements Serializable{
    @EmbeddedId
    @JsonIgnore
    private OrderProductPK productPk;

    @Column(nullable = false)
    private Integer quantity;


    public OrderProduct() {
        super();
    }


    public OrderProduct(Order order, Product productPk, Integer quantity, Client client) {
        this.productPk = new OrderProductPK();
        this.productPk.setOrder(order);
        this.productPk.setProduct(productPk);
        this.productPk.setClient(client);
        this.quantity = quantity;
    }


    @Transient
    public Product getProductPk() {
        return this.productPk.getProduct();
    }

    @Transient
    public Client getClient() {

        return this.productPk.getClient ();
    }

    @Transient
    public Integer getTotalPrice() {
        return productPk.getProduct().getPrice() * getQuantity();
    }


    public OrderProductPK getProduct() {

        return productPk;
    }

    public void setProductPk(OrderProductPK productPk) {

        this.productPk = productPk;
    }

    public Integer getQuantity() {

        return quantity;
    }

    public void setQuantity(Integer quantity) {

        this.quantity = quantity;
    }


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((productPk == null) ? 0 : productPk.hashCode());

        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        OrderProduct other = (OrderProduct) obj;
        if (productPk == null) {
            if (other.productPk != null) {
                return false;
            }
        } else if (!productPk.equals(other.productPk)) {
            return false;
        }

        return true;
    }
//    public OrderProduct build() {
//        return new OrderProduct(pk.setOrder(),
//        pk.setProduct(),
//        pk.setClient(), quantity);
//    }


}
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (!(o instanceof OrderProduct)) return false;
//        OrderProduct that = (OrderProduct) o;
//        return pk.equals(that.pk) &&
//                quantity.equals(that.quantity);
//    }
//
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(pk, quantity);
//    }


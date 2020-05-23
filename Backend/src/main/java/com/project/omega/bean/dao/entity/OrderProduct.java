package com.project.omega.bean.dao.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.omega.bean.dao.entity.OrderProductPK;
import com.project.omega.bean.dao.entity.Product;
import lombok.Builder;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Embeddable
public class OrderProduct implements Serializable{
    @EmbeddedId
    @JsonIgnore
    private OrderProductPK pk;

    @Column(nullable = false)
    private Integer quantity;


    public OrderProduct() {
        super();
    }


    public OrderProduct(Order order, Product product, Integer quantity, Client client) {
        pk = new OrderProductPK();
        pk.setOrder(order);
        pk.setProduct(product);
        pk.setClient(client);
        this.quantity = quantity;

    }


    @Transient
    public Product getProduct() {

        return this.pk.getProduct();
    }

    @Transient
    public Client getClient() {

        return this.pk.getClient ();
    }

    @Transient
    public Integer getTotalPrice() {
        return pk.getProduct().getPrice() * getQuantity();
    }


    public OrderProductPK getPk() {

        return pk;
    }

    public void setPk(OrderProductPK pk) {

        this.pk = pk;
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
        result = prime * result + ((pk == null) ? 0 : pk.hashCode());

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
        if (pk == null) {
            if (other.pk != null) {
                return false;
            }
        } else if (!pk.equals(other.pk)) {
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


package com.project.omega.bean.dao.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.project.omega.bean.dao.entity.Product;
import com.sun.istack.Nullable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "order")
public class OrderProductPK implements Serializable {

//    @JsonBakReference
    @ManyToOne(optional = false, fetch= FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;


    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;

    public Order getOrder() {
        return order;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (!(o instanceof OrderProductPK)) return false;
//        OrderProductPK that = (OrderProductPK) o;
//        return order.equals(that.order) &&
//                product.equals(that.product) && client.equals(that.client);
//    }

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
        OrderProductPK other = (OrderProductPK) obj;
        if (order == null) {
            if (other.order != null) {
                return false;
            }
        } else if (!order.equals(other.order)) {
            return false;
        }

        return true;
    }


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;

        result = prime * result + ((order.getId() == null)
                ? 0
                : order
                .getId()
                .hashCode());
        result = prime * result + ((product.getId() == null)
                ? 0
                : product
                .getId()
                .hashCode());
        result = prime * result + ((client.getId() == null)
                ? 0
                : client.getId().hashCode());

        return result;
    }

    public Object setOrder() {
        return new Order();
    }

    public Object setProduct() {
        return new Product();
    }
}

//    @Override
//    public int hashCode() {
//        return Objects.hash(order, product, client);
//    }
//}

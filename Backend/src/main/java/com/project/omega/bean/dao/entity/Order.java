package com.project.omega.bean.dao.entity;

import com.fasterxml.jackson.annotation.*;

import lombok.Builder;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;


@Entity
@Table(name = "orders")
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="orderProducts")
@Builder
public class Order implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dateCreated;

    @OneToMany
    @Valid
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<OrderProduct> orderProducts;

    @NotNull
    private Long userId;

    @NotNull
    private String status;

    @Transient
    public Double getTotalOrderPrice() {
        double sum = 0D;
        List<OrderProduct> orderProducts = getOrderProducts();
        for (OrderProduct op : orderProducts) {
            sum += op.getProduct().getPrice() * op.getQuantity();
        }
        return sum;
    }

    public Order(Long id, LocalDate dateCreated, List<OrderProduct> orderProducts, Long userId, String status) {
        this.id = id;
        this.dateCreated = dateCreated;
        this.orderProducts = orderProducts;
        this.userId = userId;
        this.status = status;
    }

    public Order() {

    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }

    public List<OrderProduct> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(List<OrderProduct> orderProducts) {
        this.orderProducts = orderProducts;
    }
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public static class OrderBuilder {
        private Long id;
        private LocalDate dateCreated;
        private List<OrderProduct> orderProducts;
        private Long userId;
        private String status;

        public OrderBuilder(){}

        public Order.OrderBuilder setId(Long id) {
            this.id = id;
            return this;
        }

        public Order.OrderBuilder setDateCreated(LocalDate dateCreated) {
            this.dateCreated = dateCreated;
            return this;
        }

        public Order.OrderBuilder setOrderProducts(List<OrderProduct> orderProducts) {
            this.orderProducts = orderProducts;
            return this;
        }

        public Order.OrderBuilder setUserId(Long userId) {
            this.userId = userId;
            return this;
        }

        public Order.OrderBuilder setStatus(String status) {
            this.status = status;
            return this;
        }

        public Order build() {
            return new Order(id, dateCreated, orderProducts, userId, status);
        }
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", dateCreated=" + dateCreated +
                ", orderProducts=" + orderProducts +
                ", userId=" + userId +
                ", status='" + status + '\'' +
                '}';
    }
}


package com.project.omega.bean.dao.entity;

import com.fasterxml.jackson.annotation.*;

import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.project.omega.bean.dao.entity.OrderProduct;
import com.project.omega.bean.dao.entity.User;
import com.project.omega.enums.OrderStatus;
import lombok.Builder;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;



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

    @OneToMany(mappedBy = "pk.order")
    @Valid
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<OrderProduct> orderProducts;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @Valid
    private User user;

    @NotBlank
    @Enumerated
    private OrderStatus status;

    @Transient
    public Double getTotalOrderPrice() {
        double sum = 0D;
        List<OrderProduct> orderProducts = getOrderProducts();
        for (OrderProduct op : orderProducts) {
            sum += op.getTotalPrice();
        }
        return sum;
    }

    public Order(Long id, LocalDate dateCreated, List<OrderProduct> orderProducts, User user, OrderStatus status) {
        this.id = id;
        this.dateCreated = dateCreated;
        this.orderProducts = orderProducts;
        this.user = user;
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
    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}


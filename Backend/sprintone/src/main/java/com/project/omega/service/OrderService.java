package com.project.omega.service;

import com.project.omega.bean.Order;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;


public interface OrderService {
    Order createOrder(Order order);


    void update(Order order);
}

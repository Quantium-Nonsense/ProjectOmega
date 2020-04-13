package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.entity.Order;

public interface OrderService {
    Order createOrder(Order order);


    void update(Order order);
}
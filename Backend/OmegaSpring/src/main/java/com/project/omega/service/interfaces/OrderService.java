package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.entity.Order;
import com.project.omega.exceptions.NoRecordsFoundException;

import java.util.Optional;


public interface OrderService {
    Order createOrder(Order order);
    Order getOrderById(Long id) throws NoRecordsFoundException;

    Order updateOrder(Order order);

    Iterable<Order> getAllOrders();
}

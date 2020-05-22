package com.quantiumnonsense.omega.service.interfaces;

import com.quantiumnonsense.omega.bean.dao.entity.Order;
import com.quantiumnonsense.omega.exceptions.OrderNotFoundException;


public interface OrderService {
    Order createOrder(Order order);
    Order getOrderById(Long id) throws OrderNotFoundException;
    Order updateOrder(Long id, Order order) throws OrderNotFoundException;
    Iterable<Order> getAllOrders();
}

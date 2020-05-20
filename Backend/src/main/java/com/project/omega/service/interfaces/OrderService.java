package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.entity.Order;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.OrderNotFoundException;

import java.util.Optional;


public interface OrderService {
    Order createOrder(Order order);
    Order getOrderById(Long id) throws OrderNotFoundException;
    Order updateOrder(Long id, Order order) throws OrderNotFoundException;
    Iterable<Order> getAllOrders();
}

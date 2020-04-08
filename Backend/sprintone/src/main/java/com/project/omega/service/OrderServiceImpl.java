package com.project.omega.service;


import com.project.omega.bean.Order;
import com.project.omega.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;


    public Order createOrder(Order order) {
        order.setDateCreated(LocalDate.now());
        order.setStatus("created");
        orderRepository.save(order);
        return order;
    }
    public void update(Order order) {
        orderRepository.save(order);
    }

}

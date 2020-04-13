package com.project.omega.service.implmentations;


import com.project.omega.bean.dao.entity.Order;
import com.project.omega.repository.OrderRepository;
import com.project.omega.service.interfaces.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

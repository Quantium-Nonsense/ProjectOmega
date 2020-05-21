package com.project.omega.service.implmentations;


import com.project.omega.bean.dao.entity.Order;
import com.project.omega.enums.OrderStatus;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.OrderNotFoundException;
import com.project.omega.repository.OrderRepository;
import com.project.omega.service.interfaces.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    MessageSource messages;

    public Order createOrder(Order order) {
        order.setDateCreated(LocalDate.now());
        order.setStatus(OrderStatus.PLACED);
        orderRepository.save(order);
        return order;
    }

    @Override
    public Order getOrderById(Long id) throws OrderNotFoundException {
            Optional<Order> order = orderRepository.findById(id);
            if (!order.isPresent()){
                throw new OrderNotFoundException(messages.getMessage("message.orderNotFound" , null, null));
            }
            return order.get();
    }

    @Override
    public List<Order> getAllOrders() {
        return this.orderRepository.findAll();
    }

    @Override
    public Order updateOrder(Long id, Order order) throws OrderNotFoundException {
      if (!orderRepository.existsById(id)) {
        throw new OrderNotFoundException(messages.getMessage("message.orderNotFound" , null, null));
      }
        orderRepository.save(order);
        return order;
    }
}



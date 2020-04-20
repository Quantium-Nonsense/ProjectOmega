package com.project.omega.service.implmentations;


import com.project.omega.bean.dao.entity.Order;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.repository.OrderRepository;
import com.project.omega.service.interfaces.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

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

    @Override
    public Order getOrderById(Long id) throws NoRecordsFoundException {
            Optional<Order> order = orderRepository.findById(id);
            if (!order.isPresent()){
                throw new NoRecordsFoundException("Order with id" + id + " not found");
            }
            return order.get();
    }
    @Override
    public Iterable<Order> getAllOrders() {
        return this.orderRepository.findAll();
    }


    public Order updateOrder(Order order) {
        Order Order = orderRepository.save(order);
        return order;
    }



//    public Optional<Order> getOrderById (Long id) throws NoRecordsFoundException {
//        Optional<Order> order = orderRepository.findById(id);
//        if (!order.isPresent()){
//            throw new NoRecordsFoundException("order" + id + "not Found");
//        }
//            return order;
//            }


            public Order updateOrderStatus (Long id, Order order) throws NoRecordsFoundException {
            if (!orderRepository.existsById(id)){
                throw new NoRecordsFoundException("order" + id + "not Found");
            }
                orderRepository.save(order);
                return order;

                    }

}



package com.project.omega.controller;

import com.project.omega.bean.dao.entity.OrderProduct;
import com.project.omega.exceptions.UserNotFoundException;
import com.project.omega.service.interfaces.OrderService;
import com.project.omega.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/statistics")
public class StatsController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @GetMapping(value = "/top")
    public ResponseEntity topOrderedProducts() {
        List<OrderProduct> orderProducts = new ArrayList<>();
        HashMap<String, Integer> topProducts = new HashMap<>();

        orderService.getAllOrders().forEach(order -> {
            orderProducts.addAll(order.getOrderProducts());
        });

        orderProducts.forEach(orderProduct -> {
            String name = orderProduct.getProduct().getName();
            if(topProducts.containsKey(name)) {
                topProducts.replace(name, topProducts.get(name) + orderProduct.getQuantity());
            } else {
                topProducts.put(name, orderProduct.getQuantity());
            }
        });

        return new ResponseEntity(topProducts, HttpStatus.OK);
    }

    @GetMapping(value = "/orders/status")
    public ResponseEntity ordersByStatus() {
        HashMap<String, Integer> orders = new HashMap<>();

        orderService.getAllOrders().forEach(order -> {
            String status = order.getStatus();
            if(orders.containsKey(status)) {
                orders.replace(status, orders.get(status) + 1);
            } else {
                orders.put(status, 1);
            }
        });

        return new ResponseEntity(orders, HttpStatus.OK);
    }

    @GetMapping(value = "/orders/rep")
    public ResponseEntity ordersByRep() {
        HashMap<String, Integer> orders = new HashMap<>();

        orderService.getAllOrders().forEach(order -> {
            try {
                String rep = userService.getUserById(order.getUserId()).getEmail();
                if(orders.containsKey(rep)) {
                    orders.replace(rep, orders.get(rep) + 1);
                } else {
                    orders.put(rep, 1);
                }
            } catch (UserNotFoundException e) {
                return;
            }
        });

        return new ResponseEntity(orders, HttpStatus.OK);
    }
}

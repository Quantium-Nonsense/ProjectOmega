package com.project.omega.controller;

import com.project.omega.bean.dao.entity.Order;
import com.project.omega.bean.dao.entity.OrderProduct;
import com.project.omega.bean.dao.entity.User;
import com.project.omega.bean.dto.OrderProductDto;
import com.project.omega.exceptions.*;
import com.project.omega.service.interfaces.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/order")
public class OrderController {
    @Autowired
    OrderService orderService;
    @Autowired
    ProductService productService;
    @Autowired
    OrderProductService orderProductService;
    @Autowired
    UserService userService;
    @Autowired
    ClientService clientService;

    @PostMapping(value = "/create", headers = "Accept=application/json")
    public ResponseEntity<Order> create(@RequestBody Order newOrder) throws ProductNotFoundException,
            ClientNotFoundException, NoRecordsFoundException, UserNotFoundException, OrderNotFoundException {

        List<OrderProductDto> productsForOrder = new ArrayList<>();

        newOrder.getOrderProducts().forEach(po -> {
            OrderProductDto opDto = new OrderProductDto(po.getProduct(), po.getQuantity(), po.getClient());
            productsForOrder.add(opDto);
        });

        validateProductsExistence(productsForOrder);

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((UserDetails)principal).getUsername();
        User user = userService.findUserByEmail(username);
        Long userId = user.getId();

        Order order = new Order();

        if(newOrder.getUserId() == null) {
            order.setUserId(userId);
        } else {
            order.setUserId(newOrder.getUserId());
        }

        order = orderService.createOrder(order);

        List<OrderProduct> orderProducts = new ArrayList<>();

        for (OrderProductDto dto : productsForOrder) {
            orderProducts.add(orderProductService.create(new OrderProduct(productService.getProductById(dto.getProduct().getId()),
                    clientService.getClientById(dto.getClient().getId()),
                    dto.getQuantity())));
        }

        order.setOrderProducts(orderProducts);

        this.orderService.updateOrder(order.getId(), order);

        String uri = ServletUriComponentsBuilder
                .fromCurrentServletMapping()
                .path("/orders/{id}")
                .buildAndExpand(order.getId())
                .toString();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", uri);

        return new ResponseEntity<>(order, headers, HttpStatus.CREATED);
    }

    @GetMapping(value = "/get")
    public ResponseEntity fetchAllOrders() {
        List<Order> order = orderService.getAllOrders();
        return new ResponseEntity(order, HttpStatus.OK);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity updateOrderById (@PathVariable (value ="id") Long id, @RequestBody Order update) throws NoRecordsFoundException, OrderNotFoundException {
        Order orderUpdate = new Order();
        Order oldOrder = orderService.getOrderById(id);

        if(update.getOrderProducts().isEmpty() || update.getOrderProducts() == null) {
            orderUpdate.setOrderProducts(oldOrder.getOrderProducts());
        } else {
            orderUpdate.setOrderProducts(update.getOrderProducts());
        }

        if(update.getStatus() == null) {
            orderUpdate.setStatus(oldOrder.getStatus());
        } else {
            orderUpdate.setStatus(update.getStatus());
        }

        if(update.getUserId() == null) {
            orderUpdate.setUserId(oldOrder.getUserId());
        } else {
            orderUpdate.setUserId(update.getUserId());
        }

        orderUpdate.setDateCreated(oldOrder.getDateCreated());
        orderUpdate.setId(oldOrder.getId());

        Order order = orderService.updateOrder(id, orderUpdate);
        return new ResponseEntity(order, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity fetchOrderById(@PathVariable(value = "id") Long id) throws OrderNotFoundException {
        Order order = orderService.getOrderById(id);
        return new ResponseEntity(order, HttpStatus.OK);
    }

    private void validateProductsExistence(List<OrderProductDto> orderProducts) throws ProductNotFoundException {
        List<OrderProductDto> list = new ArrayList<>();
        for (OrderProductDto op : orderProducts) {
            if (productService.getProductById(op.getProduct().getId()) != null) {
                list.add(op);
            }
        }
        if (CollectionUtils.isEmpty(list)) {
            new ProductNotFoundException("Product not found");
        }
    }

    public static class OrderForm implements Serializable {

        private List<OrderProductDto> productOrders;

        public List<OrderProductDto> getProductOrders() {
            return productOrders;
        }

        public void setProductOrders(List<OrderProductDto> productOrders) {
            this.productOrders = productOrders;
        }
    }
}

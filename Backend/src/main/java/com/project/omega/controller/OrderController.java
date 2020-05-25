package com.project.omega.controller;


import com.project.omega.authentication.JwtTokenUtil;
import com.project.omega.bean.dao.entity.Order;
import com.project.omega.bean.dao.entity.OrderProduct;
import com.project.omega.bean.dao.entity.User;
import com.project.omega.bean.dto.OrderProductDto;
import com.project.omega.exceptions.*;
import com.project.omega.service.interfaces.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    
    private final Logger LOGGER = LoggerFactory.getLogger(OrderController.class);
    
    @PostMapping(value = "/create", headers = "Accept=application/json")
    public ResponseEntity create(@RequestBody Order newOrder, @RequestHeader("Authorization") String token) throws ProductNotFoundException,
            ClientNotFoundException, NoRecordsFoundException, UserNotFoundException, OrderNotFoundException {
        LOGGER.info("Request received: /api/order/create");
        List<OrderProductDto> productsForOrder = new ArrayList<>();
        Order order = new Order();
        LOGGER.debug("Order object created");
        
        try {
            newOrder.getOrderProducts().forEach(po -> {
                OrderProductDto opDto = new OrderProductDto(po.getProduct(), po.getQuantity(), po.getClient());
                productsForOrder.add(opDto);
            });
            LOGGER.debug("Products added in List");
            
            validateProductsExistence(productsForOrder);

            Long userId = jwtTokenUtil.getIdFromToken(token.substring(7));

            if(newOrder.getUserId() == null) {
                order.setUserId(userId);
                LOGGER.debug("Using user id provided");
            } else {
                order.setUserId(newOrder.getUserId());
                LOGGER.debug("No user id was provided. This will be inferred from the requester token");
            }

            order = orderService.createOrder(order);
        } catch (Exception e) {
            LOGGER.warn("Something went wrong when creating this order", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getStackTrace().toString());
        }

        List<OrderProduct> orderProducts = new ArrayList<>();
        
        for (OrderProductDto dto : productsForOrder) {
            orderProducts.add(orderProductService.create(new OrderProduct(productService.getProductById(dto.getProduct().getId()),
                    clientService.getClientById(dto.getClient().getId()),
                    dto.getQuantity())));
        }
        
        order.setOrderProducts(orderProducts);
        
        this.orderService.updateOrder(order.getId(), order);
        
        LOGGER.info("New Order created and sent in response");
        return new ResponseEntity(order, HttpStatus.CREATED);
    }
    
    @GetMapping(value = "/get")
    public ResponseEntity fetchAllOrders() {
        LOGGER.info("Request received: /api/order/get");
        List<Order> order = orderService.getAllOrders();
        LOGGER.info("Orders found and sent in response");
        return new ResponseEntity(order, HttpStatus.OK);
    }
    
    @PutMapping(value = "/update/{id}")
    public ResponseEntity updateOrderById(@PathVariable(value = "id") Long id, @RequestBody Order update) throws NoRecordsFoundException, OrderNotFoundException {
        LOGGER.info("Request received: /api/order/update/{}", id);
        
        Order orderUpdate = new Order();
        Order oldOrder = orderService.getOrderById(id);
        
        if (update.getOrderProducts().isEmpty() || update.getOrderProducts() == null) {
            LOGGER.debug("Order Products is empty or null - will skip");
            orderUpdate.setOrderProducts(oldOrder.getOrderProducts());
        } else {
            LOGGER.debug("Updating order products");
            orderUpdate.setOrderProducts(update.getOrderProducts());
        }
        
        if (update.getStatus() == null) {
            LOGGER.debug("Order status is null - will skip");
            orderUpdate.setStatus(oldOrder.getStatus());
        } else {
            LOGGER.debug("Updating order status");
            orderUpdate.setStatus(update.getStatus());
        }
        
        if (update.getUserId() == null) {
            LOGGER.debug("Order user id is null - will skip");
            orderUpdate.setUserId(oldOrder.getUserId());
        } else {
            LOGGER.debug("Updating user id");
            orderUpdate.setUserId(update.getUserId());
        }
        
        orderUpdate.setDateCreated(oldOrder.getDateCreated());
        orderUpdate.setId(oldOrder.getId());
        
        Order order = orderService.updateOrder(id, orderUpdate);
        
        LOGGER.info("Order successfully updated and returned in response");
        return new ResponseEntity(order, HttpStatus.OK);
    }
    
    @GetMapping(value = "/{id}")
    public ResponseEntity fetchOrderById(@PathVariable(value = "id") Long id) throws OrderNotFoundException {
        LOGGER.info("Request received: /api/order/{}", id);
        Order order = orderService.getOrderById(id);
        LOGGER.info("Order found and returned in response");
        return new ResponseEntity(order, HttpStatus.OK);
    }
    
    private void validateProductsExistence(List<OrderProductDto> orderProducts) throws ProductNotFoundException {
        LOGGER.info("Validating whether the products exist");
        List<OrderProductDto> list = new ArrayList<>();
        for (OrderProductDto op : orderProducts) {
            if (productService.getProductById(op.getProduct().getId()) != null) {
                LOGGER.debug("Product {} exists and it is being added", op.getProduct().getId());
                list.add(op);
            }
        }
        if (list.isEmpty()) {
            LOGGER.warn("None of the products were found");
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

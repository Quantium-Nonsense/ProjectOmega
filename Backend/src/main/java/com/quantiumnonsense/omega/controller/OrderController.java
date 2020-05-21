package com.quantiumnonsense.omega.controller;

import com.quantiumnonsense.omega.bean.dao.entity.Order;
import com.quantiumnonsense.omega.bean.dao.entity.OrderProduct;
import com.quantiumnonsense.omega.bean.dao.entity.User;
import com.quantiumnonsense.omega.bean.dto.OrderProductDto;
import com.quantiumnonsense.omega.exceptions.*;
import com.quantiumnonsense.omega.service.interfaces.OrderProductService;
import com.quantiumnonsense.omega.service.interfaces.OrderService;
import com.quantiumnonsense.omega.service.interfaces.ClientService;
import com.quantiumnonsense.omega.service.interfaces.ProductService;
import com.quantiumnonsense.omega.service.interfaces.UserService;
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
    public ResponseEntity<Order> create(@RequestBody OrderForm form) throws ProductNotFoundException,
            ClientNotFoundException, NoRecordsFoundException, UserNotFoundException {
        List<OrderProductDto> formDtos = form.getProductOrders();

        validateProductsExistence(formDtos);

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String username = ((UserDetails)principal).getUsername();
            User user = userService.findUserByEmail(username);
            Long userId = user.getId();

        Order order = new Order();

        order.setUserId(userId);

        order = orderService.createOrder(order);

        List<OrderProduct> orderProducts = new ArrayList<>();


        for (OrderProductDto dto : formDtos) {
            orderProducts.add(orderProductService.create(new OrderProduct(
                    order,
                    productService.getProductById(dto.getProduct().getId()),
                    dto.getQuantity(),
                    clientService.getClientById(dto.getClient().getId()))));
        }

        order.setOrderProducts(orderProducts);
        System.out.print(order);

        this.orderService.updateOrder(order);

        System.out.print(order);
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
        Iterable<Order> order = orderService.getAllOrders();
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
        if (!CollectionUtils.isEmpty(list)) {
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

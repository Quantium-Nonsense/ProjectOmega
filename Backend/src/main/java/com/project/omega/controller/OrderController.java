package com.project.omega.controller;

import com.mysql.cj.x.protobuf.MysqlxCrud;
import com.project.omega.bean.dao.entity.*;
import com.project.omega.bean.dao.entity.Order;
import com.project.omega.bean.dao.entity.OrderProduct;
import com.project.omega.bean.dao.entity.Order;
import com.project.omega.bean.dao.entity.User;
import com.project.omega.bean.dto.OrderProductDto;
import com.project.omega.exceptions.*;
import com.project.omega.service.interfaces.*;
import com.project.omega.service.implmentations.*;
import com.project.omega.service.interfaces.OrderProductService;
import com.project.omega.service.interfaces.OrderService;
import com.project.omega.service.interfaces.ClientService;
import com.project.omega.service.interfaces.OrderService;
import com.project.omega.service.interfaces.ProductService;
import com.project.omega.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
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
    public ResponseEntity<Order> create(@RequestBody OrderForm form) throws ProductNotFoundException, ClientNotFoundException, NoRecordsFoundException, UserNotFoundException {
        List<OrderProductDto> formDtos = form.getProductOrders();

        validateProductsExistence(formDtos);

        User user = userService.getUserById(
                form.getUser().getId());

        Order order = new Order();


        order.setUser(user);

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
    public ResponseEntity fetchOrderById(@PathVariable(value = "id") Long id) throws NoRecordsFoundException {
        Order order = orderService.getOrderById(id);
        return new ResponseEntity(order, HttpStatus.OK);
    }

    //Product Existence Validation method
    private void validateProductsExistence(List<OrderProductDto> orderProducts) throws ProductNotFoundException {
        List<OrderProductDto> list = new ArrayList<>();
        for (OrderProductDto op : orderProducts) {
            if (productService.getProductById(op.getProduct().getId()) != null) {
                list.add(op);
            }
        }

        if (!CollectionUtils.isEmpty(list)) {
            new ResourceNotFoundException("Product not found");
        }
    }

    /// Class for form received from Front-End
    public static class OrderForm implements Serializable {

        private List<OrderProductDto> productOrders;
        private User user;

        public User getUser() {
            return user;
        }

        public void setUser(User user) {
            this.user = user;
        }


        public List<OrderProductDto> getProductOrders() {

            return productOrders;
        }

        public void setProductOrders(List<OrderProductDto> productOrders) {

            this.productOrders = productOrders;
        }
    }


//
//    public static class ClientForm implements Serializable {
//
//        private FormDTO OrderClient;
//
//        public FormDTO getClientOrders() {
//            return OrderClient;
//            }
//        }
//
//    @GetMapping(value = "/get")
//    @ResponseStatus(HttpStatus.OK)
//    public @NotNull Iterable<Order> list() {
//        return this.orderService.getAllOrders();
//    }
//
//
//    @PutMapping (value = "update/{id}/")
//    public ResponseEntity updateStatus(@PathVariable (value="id") Long id, @RequestBody Order order){
//        Order newOrder =orderService.updateOrder(order);
//        return new ResponseEntity(order, HttpStatus.OK);
//    }
//    @GetMapping (value = "/get")
//
//    OrderClient orderClient = orderClientService.create(new OrderClient(order, userService.getUserById(formdtos2.getUser().getId()),
//            clientService.getClientById(formdtos2.getClient().getId())));
//
//    order.setOrderClient(orderClient);
}

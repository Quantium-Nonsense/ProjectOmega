package com.project.omega.controller;

import com.project.omega.bean.Order;
import com.project.omega.bean.OrderProduct;
import com.project.omega.dto.OrderProductDto;
import com.project.omega.exceptions.ProductNotFoundException;
import com.project.omega.exceptions.ResourceNotFoundException;
import com.project.omega.service.OrderProductService;
import com.project.omega.service.OrderService;
import com.project.omega.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value="/order")
public class OrderController {

    @Autowired
    OrderService orderService;
    @Autowired
    ProductService productService;
    @Autowired
    OrderProductService orderProductService;



    @PostMapping(value = "/create", headers = "Accept=application/json")
    public ResponseEntity<Order> create(@RequestBody OrderForm form) throws ProductNotFoundException {
        List<OrderProductDto> formDtos = form.getProductOrders();
        System.out.println(formDtos);
        Order order = new Order();
        order = orderService.createOrder(order);
        List<OrderProduct> orderProducts = new ArrayList<>();

        validateProductsExistence(formDtos);

        for (OrderProductDto dto : formDtos) {
            orderProducts.add(orderProductService.create(new OrderProduct(order, productService.getProductById(dto
                    .getProduct()
                    .getId()), dto.getQuantity())));
        }

        order.setOrderProducts(orderProducts);

        this.orderService.update(order);

        String uri = ServletUriComponentsBuilder
                .fromCurrentServletMapping()
                .path("/orders/{id}")
                .buildAndExpand(order.getId())
                .toString();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", uri);

        return new ResponseEntity<>(order, headers, HttpStatus.CREATED);
    }

    private void validateProductsExistence(List<OrderProductDto> orderProducts) {
        List<OrderProductDto> list = new ArrayList<>();
        for (OrderProductDto op : orderProducts) {
            if (productService.getProductById(op.getProduct().getId())!=null)
            {
                list.add(op);
            }
            else
                {
                    throw new RuntimeException("product not found");

            }

        }

        if (!CollectionUtils.isEmpty(list)) {
            new ResourceNotFoundException("Product not found");
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

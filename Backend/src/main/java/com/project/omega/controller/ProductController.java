package com.project.omega.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.omega.bean.dao.entity.Product;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.ProductNotFoundException;
import com.project.omega.service.interfaces.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    private ObjectMapper mapper = new ObjectMapper();

    @PostMapping(value = "/create", headers = "Accept=application/json")
    public ResponseEntity createProduct(@RequestBody Product product) {
        Product newProduct = productService.createProduct(product);
        return new ResponseEntity(newProduct, HttpStatus.CREATED);
    }

    @GetMapping(value = "/get")
    public ResponseEntity getProducts() throws NoRecordsFoundException {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity(products, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getById(@PathVariable(value = "id") Long id) throws ProductNotFoundException {
        Product product = productService.getProductById(id);
        return new ResponseEntity(product, HttpStatus.OK);
    }

    @GetMapping(value = "/gt/{price}")
    public ResponseEntity getByPriceGt(@PathVariable(value = "price") int price) throws NoRecordsFoundException {
        List<Product> products = productService.getProductsAbovePrice(price);
        return new ResponseEntity(products, HttpStatus.OK);
    }

    @GetMapping(value = "/lt/{price}")
    public ResponseEntity getByPriceLt(@PathVariable(value = "price") int price) throws NoRecordsFoundException {
        List<Product> products = productService.getProductsBelowPrice(price);
        return new ResponseEntity(products, HttpStatus.OK);
    }

    @GetMapping(value = "/eq/{price}")
    public ResponseEntity getByPriceEq(@PathVariable(value = "price") int price) throws NoRecordsFoundException {
        List<Product> products = productService.getProductsEqualPrice(price);
        return new ResponseEntity(products, HttpStatus.OK);
    }

    @GetMapping(value = "/search/{name}")
    public ResponseEntity getBySearchQuery(@PathVariable(value = "name") String name) throws NoRecordsFoundException {
        List<Product> products = productService.getProductsBySearchQuery(name);
        return new ResponseEntity(products, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteById(@PathVariable(value = "id") Long id) throws ProductNotFoundException {
        Product products = productService.deleteProductById(id);
        return new ResponseEntity(products, HttpStatus.GONE);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity updateById(@PathVariable(value = "id") Long id, @RequestBody Product update) throws Exception {
        Product product = productService.updateProductById(id, update);
        return new ResponseEntity(product, HttpStatus.OK);
    }
}


package com.project.omega.controller;

import com.project.omega.bean.dao.entity.Product;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.ProductNotFoundException;
import com.project.omega.exceptions.SupplierNotFoundException;
import com.project.omega.service.interfaces.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping(value = "/create", headers = "Accept=application/json")
    public ResponseEntity createProduct(@RequestBody Product product) throws SupplierNotFoundException {
        Product newProduct = productService.createProduct(product);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/api/product/create"));
        return new ResponseEntity(newProduct, headers, HttpStatus.CREATED);
    }

    @GetMapping(value = "/get")
    public ResponseEntity getProducts() throws NoRecordsFoundException {
        try {
            List<Product> products = productService.getAllProducts();
            return new ResponseEntity(products, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(new ArrayList<>(), HttpStatus.OK);
        }
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getById(@PathVariable(value = "id") Long id) throws ProductNotFoundException {
        Product product = productService.getProductById(id);
        return new ResponseEntity(product, HttpStatus.OK);
    }

    @GetMapping(value = "/gt/{price}")
    public ResponseEntity getByPriceGt(@PathVariable(value = "price") int price) {
        List<Product> products = null;
        try {
            products = productService.getProductsAbovePrice(price);
        } catch (NoRecordsFoundException e) {
            new ResponseEntity(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity(products, HttpStatus.OK);
    }

    @GetMapping(value = "/lt/{price}")
    public ResponseEntity getByPriceLt(@PathVariable(value = "price") int price) {
        List<Product> products = null;
        try {
            products = productService.getProductsBelowPrice(price);
        } catch (NoRecordsFoundException e) {
            return ResponseEntity.status(HttpStatus.OK).body("No products found.");
        }
        return new ResponseEntity(products, HttpStatus.OK);
    }

    @GetMapping(value = "/eq/{price}")
    public ResponseEntity getByPriceEq(@PathVariable(value = "price") int price) {
        List<Product> products = null;
        try {
            products = productService.getProductsEqualPrice(price);
        } catch (NoRecordsFoundException e) {
            return new ResponseEntity(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity(products, HttpStatus.OK);
    }

    @GetMapping(value = "/search/{name}")
    public ResponseEntity getBySearchQuery(@PathVariable(value = "name") String name) {
        List<Product> products = null;
        try {
            products = productService.getProductsBySearchQuery(name);
        } catch (NoRecordsFoundException e) {
            return new ResponseEntity(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity(products, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteById(@PathVariable(value = "id") Long id) throws ProductNotFoundException {
        Product products = productService.deleteProductById(id);
        return new ResponseEntity(products, HttpStatus.OK);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity updateById(@PathVariable(value = "id") Long id, @RequestBody Product update) throws Exception {
        Product product = productService.updateProductById(id, update);
        return new ResponseEntity(product, HttpStatus.OK);
    }

    @GetMapping(value = "/supplier/{id}")
    public ResponseEntity getBySupplierId(@PathVariable(value = "id") Long id) {
        List<Product> products = null;
        try {
            products = productService.getProductsBySupplier(id);
        } catch (NoRecordsFoundException e) {
            return new ResponseEntity(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity(products, HttpStatus.OK);
    }
}


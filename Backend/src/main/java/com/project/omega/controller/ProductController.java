package com.project.omega.controller;

import com.project.omega.bean.dao.entity.Product;
import com.project.omega.bean.dto.ProductDTO;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.ProductNotFoundException;
import com.project.omega.exceptions.SupplierNotFoundException;
import com.project.omega.service.interfaces.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/product")
public class ProductController {
    @Autowired
    private ProductService productService;
    
    private final Logger LOGGER = LoggerFactory.getLogger(ProductController.class);

    @PostMapping(value = "/create", headers = "Accept=application/json")
    public ResponseEntity createProduct(@RequestBody Product product) throws SupplierNotFoundException {
        LOGGER.info("Request received: /api/product/create");
        Product newProduct = productService.createProduct(product);
        LOGGER.info("Product successfully created and returned in response");
        return new ResponseEntity(newProduct, HttpStatus.CREATED);
    }

    @GetMapping(value = "/get")
    public ResponseEntity getProducts() throws NoRecordsFoundException {
        LOGGER.info("Request received: /api/product/get");
        try {
            List<Product> products = productService.getAllProducts();
            LOGGER.info("Products successfully found and returned");
            return new ResponseEntity(products, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Something happened when returning the list of products", e);
            return new ResponseEntity(new ArrayList<>(),HttpStatus.OK);
        }
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getById(@PathVariable(value = "id") Long id) throws ProductNotFoundException {
        LOGGER.info("Request received: /api/product/{}", id);
        Product product = productService.getProductById(id);
        LOGGER.info("Product found and returned in response");
        return new ResponseEntity(product, HttpStatus.OK);
    }

    @GetMapping(value = "/gt/{price}")
    public ResponseEntity getByPriceGt(@PathVariable(value = "price") int price) {
        LOGGER.info("Request received: /api/product/gt/{}", price);
        List<Product> products = null;
        try {
            products = productService.getProductsAbovePrice(price);
        } catch (NoRecordsFoundException e) {
            LOGGER.info("No products found in search");
            new ResponseEntity(new ArrayList<>(), HttpStatus.OK);
        }
        LOGGER.info("Products found and returned in response");
        return new ResponseEntity(products, HttpStatus.OK);
    }

    @GetMapping(value = "/lt/{price}")
    public ResponseEntity getByPriceLt(@PathVariable(value = "price") int price) {
        LOGGER.info("Request received: /api/product/lt/{}", price);
        List<Product> products = null;
        try {
            products = productService.getProductsBelowPrice(price);
        } catch (NoRecordsFoundException e) {
            LOGGER.info("No products found in search");
            return ResponseEntity.status(HttpStatus.OK).body("No products found.");
        }
        LOGGER.info("Products found and returned in response");
        return new ResponseEntity(products, HttpStatus.OK);
    }

    @GetMapping(value = "/eq/{price}")
    public ResponseEntity getByPriceEq(@PathVariable(value = "price") int price) {
        LOGGER.info("Request received: /api/product/eq/{}", price);
        List<Product> products = null;
        try {
            products = productService.getProductsEqualPrice(price);
        } catch (NoRecordsFoundException e) {
            LOGGER.info("No products found in search");
            return new ResponseEntity(new ArrayList<>(), HttpStatus.OK);
        }
        LOGGER.info("Products found and returned in response");
        return new ResponseEntity(products, HttpStatus.OK);
    }

    @GetMapping(value = "/search/{name}")
    public ResponseEntity getBySearchQuery(@PathVariable(value = "name") String name) {
        LOGGER.info("Request received: /api/product/search/{}", name);
        List<Product> products = null;
        try {
            products = productService.getProductsBySearchQuery(name);
        } catch (NoRecordsFoundException e) {
            LOGGER.info("No products found in search");
            return new ResponseEntity(new ArrayList<>(), HttpStatus.OK);
        }
        LOGGER.info("Products found and returned in response");
        return new ResponseEntity(products, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteById(@PathVariable(value = "id") Long id) throws ProductNotFoundException {
        LOGGER.info("Request received: /api/product/delete/{}", id);
        Product products = productService.deleteProductById(id);
        LOGGER.info("Product successfully deleted");
        return new ResponseEntity(products, HttpStatus.OK);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity updateById(@PathVariable(value = "id") Long id, @RequestBody Product update) throws Exception {
        LOGGER.info("Request received: /api/product/update/{}", id);
        Product product = productService.updateProductById(id, update);
        LOGGER.info("Product successfully updated");
        return new ResponseEntity(product, HttpStatus.OK);
    }

    @GetMapping(value = "/supplier/{id}")
    public ResponseEntity getBySupplierId(@PathVariable(value = "id") Long id) {
        LOGGER.info("Request received: /api/product/supplier/{}", id);
        List<Product> products = null;
        try {
            products = productService.getProductsBySupplier(id);
        } catch (NoRecordsFoundException e) {
            LOGGER.info("No products found in search");
            return new ResponseEntity(new ArrayList<>(), HttpStatus.OK);
        }
        LOGGER.info("Products found and returned in response");
        return new ResponseEntity(products, HttpStatus.OK);
    }
}


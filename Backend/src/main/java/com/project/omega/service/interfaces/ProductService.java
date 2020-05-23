package com.quantiumnonsense.omega.service.interfaces;

import com.quantiumnonsense.omega.bean.dao.entity.Product;
import com.quantiumnonsense.omega.bean.dto.ProductDTO;
import com.quantiumnonsense.omega.exceptions.NoRecordsFoundException;
import com.quantiumnonsense.omega.exceptions.ProductNotFoundException;
import com.quantiumnonsense.omega.exceptions.SupplierNotFoundException;

import java.util.List;

public  interface ProductService {

    Product createProduct(ProductDTO product) throws SupplierNotFoundException;
    List<Product> getAllProducts() throws NoRecordsFoundException;
    List<Product> getProductsAbovePrice(int price) throws NoRecordsFoundException;
    List<Product> getProductsBelowPrice(int price) throws NoRecordsFoundException;
    List<Product> getProductsEqualPrice(int price) throws NoRecordsFoundException;
    Product getProductById(Long id) throws ProductNotFoundException;
    List<Product> getProductsBySearchQuery(String name) throws NoRecordsFoundException;
    Product updateProductById(Long id, Product newProduct) throws Exception;
    Product deleteProductById(Long id) throws ProductNotFoundException;
    List<Product> getProductsBySupplier(Long id) throws NoRecordsFoundException;
}
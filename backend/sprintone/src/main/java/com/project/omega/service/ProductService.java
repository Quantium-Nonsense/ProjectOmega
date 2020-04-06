package com.project.omega.service;

import com.project.omega.bean.Product;
import com.project.omega.bean.User;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.ProductNotFoundException;
import com.project.omega.exceptions.UserNotFoundException;

import java.util.List;

public interface ProductService {

Product createProduct(Product product);
List<Product> getAllProducts() throws NoRecordsFoundException;
List<Product> getProductsAbovePrice(int price) throws NoRecordsFoundException;
List<Product> getProductsBelowPrice(int price) throws NoRecordsFoundException;
List<Product> getProductsEqualPrice(int price) throws NoRecordsFoundException;
Product getProductById(Long id) throws ProductNotFoundException;
List<Product> getProductsBySearchQuery(String name) throws NoRecordsFoundException;
Product updateProductById(Long id, Product newProduct) throws Exception;
Product deleteProductById(Long id) throws ProductNotFoundException;
List<Product> getProductsFromUser(Long id) throws NoRecordsFoundException, UserNotFoundException;
}

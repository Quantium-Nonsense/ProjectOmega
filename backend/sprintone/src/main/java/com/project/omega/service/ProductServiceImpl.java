package com.project.omega.service;

import com.project.omega.bean.Product;
import com.project.omega.bean.User;
import com.project.omega.exceptions.NoRecordsFoundException;

import com.project.omega.exceptions.ProductNotFoundException;
import com.project.omega.exceptions.UserNotFoundException;
import com.project.omega.helper.Constant;
import com.project.omega.repository.ProductRepository;
import com.project.omega.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService{

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    public Product createProduct(Product product) {
        productRepository.save(product);
        return product;
    }

    public List<Product> getAllProducts() throws NoRecordsFoundException {
        List<Product> products = productRepository.findAll();
        if(products.isEmpty()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_PRODUCTS);
        }
        return products;
    }

    public List<Product> getProductsAbovePrice(int price) throws NoRecordsFoundException {
        List<Product> products = productRepository.findByPriceGreaterThanEqual(price);
        if(products.isEmpty()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_PRODUCTS);
        }
        return products;
    }

    public List<Product> getProductsBelowPrice(int price) throws NoRecordsFoundException {
        List<Product> products = productRepository.findByPriceLessThanEqual(price);
        if(products.isEmpty()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_PRODUCTS);
        }
        return products;
    }

    public List<Product> getProductsEqualPrice(int price) throws NoRecordsFoundException {
        List<Product> products = productRepository.findByPrice(price);
        if(products.isEmpty()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_PRODUCTS);
        }
        return products;
    }

    public Product getProductById(Long id) throws ProductNotFoundException {
        Optional<Product> product = productRepository.findById(id);
        if(!product.isPresent()) {
            throw new ProductNotFoundException(Constant.ERROR_PRODUCT_NOT_FOUND + id);
        }
        return product.get();
    }

    public List<Product> getProductsBySearchQuery(String name) throws NoRecordsFoundException {
        List<Product> products = productRepository.findByNameContaining(name);
        if(products.isEmpty()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_PRODUCTS);
        }
        return products;
    }

    public List<Product> getProductsByCategory(String category) throws NoRecordsFoundException {
        List<Product> products = productRepository.findByCategoryContaining(category);
        if(products.isEmpty()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_PRODUCTS);
        }
        return products;
    }

    public Product updateProductById(Long id, Product newProduct) throws Exception {
        if(!productRepository.existsById(id)) {
            throw new ProductNotFoundException(Constant.ERROR_PRODUCT_NOT_FOUND + id);
        }
        if(newProduct.getName() != null && newProduct.getDescription() != null && newProduct.getCategory() != null && newProduct.getPrice() >= 0) {
            newProduct.setId(id);
            productRepository.save(newProduct);
        } else {
           throw new RuntimeException("Null/invalid values detected");
        }
        return newProduct;
    }

    public Product deleteProductById(Long id) throws ProductNotFoundException{
        Optional<Product> product = productRepository.findById(id);
        if(!product.isPresent()) {
            throw new ProductNotFoundException(Constant.ERROR_PRODUCT_NOT_FOUND + id);
        }
        productRepository.deleteById(id);
        return product.get();
    }

    public List<Product> getProductsFromUser(Long id) throws NoRecordsFoundException, UserNotFoundException {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()) {
            List<Product> products = productRepository.findByUser(user);
            if(products.isEmpty()) {
                throw new NoRecordsFoundException(Constant.ERROR_NO_PRODUCTS);
            }
            return products;

        } else {
            throw new UserNotFoundException(Constant.ERROR_USER_NOT_FOUND + id);
        }
    }
}

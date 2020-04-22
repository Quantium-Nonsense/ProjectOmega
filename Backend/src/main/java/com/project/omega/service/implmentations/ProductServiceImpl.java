package com.project.omega.service.implmentations;

import com.project.omega.bean.dao.entity.Product;
import com.project.omega.bean.dao.entity.Supplier;
import com.project.omega.bean.dto.ProductDTO;
import com.project.omega.exceptions.NoRecordsFoundException;

import com.project.omega.exceptions.ProductNotFoundException;
import com.project.omega.repository.ProductRepository;
import com.project.omega.repository.SupplierRepository;
import com.project.omega.service.interfaces.ProductService;
import com.project.omega.service.interfaces.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    SupplierService supplierService;

    @Autowired
    MessageSource messages;

    public Product createProduct(ProductDTO productDTO) throws NoRecordsFoundException {
        Supplier supplier = supplierService.getSupplierById(productDTO.getSupplierId());
        Product product = new Product.ProductBuilder()
                .setName(productDTO.getName())
                .setDescription(productDTO.getDescription())
                .setPrice(productDTO.getPrice())
                .setSupplier(supplier)
                .build();
        productRepository.save(product);
        return product;
    }

    public List<Product> getAllProducts() throws NoRecordsFoundException {
        List<Product> products = productRepository.findAll();
        if (products.isEmpty()) {
            throw new NoRecordsFoundException(messages.getMessage("message.noRecords", null, null));
        }
        return products;
    }

    public List<Product> getProductsAbovePrice(int price) throws NoRecordsFoundException {
        List<Product> products = productRepository.findByPriceGreaterThanEqual(price);
        if (products.isEmpty()) {
            throw new NoRecordsFoundException(messages.getMessage("message.noProducts", null, null));
        }
        return products;
    }

    public List<Product> getProductsBelowPrice(int price) throws NoRecordsFoundException {
        List<Product> products = productRepository.findByPriceLessThanEqual(price);
        if (products.isEmpty()) {
            throw new NoRecordsFoundException(messages.getMessage("message.noProducts", null, null));
        }
        return products;
    }

    public List<Product> getProductsEqualPrice(int price) throws NoRecordsFoundException {
        List<Product> products = productRepository.findByPrice(price);
        if (products.isEmpty()) {
            throw new NoRecordsFoundException(messages.getMessage("message.noProducts", null, null));
        }
        return products;
    }

    public Product getProductById(Long id) throws ProductNotFoundException {
        Optional<Product> product = productRepository.findById(id);
        if (!product.isPresent()) {
            throw new ProductNotFoundException(messages.getMessage("message.productNotFound", null, null));
        }
        return product.get();
    }

    public List<Product> getProductsBySearchQuery(String name) throws NoRecordsFoundException {
        List<Product> products = productRepository.findByNameContaining(name);
        if (products.isEmpty()) {
            throw new NoRecordsFoundException(messages.getMessage("message.noProducts", null, null));
        }
        return products;
    }

    public Product updateProductById(Long id, Product newProduct) throws Exception {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException(messages.getMessage("message.productNotFound", null, null));
        }
        if (newProduct.getName() != null && newProduct.getDescription() != null && newProduct.getPrice() >= 0) {
            newProduct.setId(id);
            productRepository.save(newProduct);
        } else {
            throw new RuntimeException("Null/invalid values detected");
        }
        return newProduct;
    }

    public Product deleteProductById(Long id) throws ProductNotFoundException {
        Optional<Product> product = productRepository.findById(id);
        if (!product.isPresent()) {
            throw new ProductNotFoundException(messages.getMessage("message.productNotFound", null, null));
        }
        productRepository.deleteById(id);
        return product.get();
    }

    public List<Product> getProductsBySupplier(Long id) throws NoRecordsFoundException {
        List<Product> products = productRepository.findBySupplier_Id(id);
        if(products.isEmpty()) {
            throw new NoRecordsFoundException(messages.getMessage("message.noProducts", null, null));
        }
        return products;
    }
}

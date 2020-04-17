package com.project.testcontroller;

import com.project.OmegaApplicationTests;
import com.project.omega.bean.dao.entity.Product;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.ProductNotFoundException;
import com.project.omega.helper.Constant;
import com.project.omega.repository.ProductRepository;
import com.project.omega.service.implmentations.ProductServiceImpl;
import com.project.omega.service.interfaces.ProductService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.MessageSource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProductTestService extends OmegaApplicationTests {
    @Mock
    ProductRepository productRepository;

    @InjectMocks
    ProductService productService = new ProductServiceImpl();

    @Autowired
    MessageSource messages;

    @Test
    public void createProductTest() throws NoRecordsFoundException {
        Product product = new Product.ProductBuilder()
                .setId(1L)
                .setName("Fockittol")
                .setDescription("Effectively eliminates all the f*ucks given about anything.")
                .setPrice(420)
                .build();
        Mockito.when(productRepository.save(Mockito.any(Product.class))).thenReturn(product);
        Mockito.when(productRepository.findAll()).thenReturn(Stream.of(product).collect(Collectors.toList()));
        Assert.assertEquals("Fockittol", productService.createProduct(product).getName());
        Assert.assertEquals(1, productService.getAllProducts().size());
    }

    @Test
    public void getAllProductsTest_Positive() throws NoRecordsFoundException {
        Product product_one = new Product.ProductBuilder()
                .setId(1L)
                .setName("Fockittol")
                .setDescription("Effectively eliminates all the f*ucks given about anything.")
                .setPrice(420)
                .build();
        Product product_two = new Product.ProductBuilder()
                .setId(2L)
                .setName("Coronaforte")
                .setDescription("Prevents coronavirus.")
                .setPrice(19)
                .build();
        Mockito.when(productRepository.findAll()).thenReturn(Stream.of(product_one, product_two).collect(Collectors.toList()));
        Assert.assertEquals(2, productService.getAllProducts().size());
        Assert.assertTrue(productService.getAllProducts().contains(product_two));
        Assert.assertTrue(productService.getAllProducts().contains(product_one));
    }

    @Test
    public void getAllProductsTest_Negative() {
        Mockito.when(productRepository.findAll()).thenReturn(new ArrayList<Product>());
        try {
            productService.getAllProducts();
        } catch (NoRecordsFoundException e) {
            Assert.assertTrue(productRepository.findAll().isEmpty());
            Assert.assertTrue(e.getMessage().equals(messages.getMessage("message.noRecords", null, null)));
        }
    }

    @Test
    public void getProductByIdTest_Positive() throws ProductNotFoundException {
        Product product_one = new Product.ProductBuilder()
                .setId(1L)
                .setName("Fockittol")
                .setDescription("Effectively eliminates all the f*ucks given about anything.")
                .setPrice(420)
                .build();
        Product product_two = new Product.ProductBuilder()
                .setId(2L)
                .setName("Coronaforte")
                .setDescription("Prevents coronavirus.")
                .setPrice(19)
                .build();
        Mockito.when(productRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(product_one));
        Assert.assertEquals(product_one.getName(), productService.getProductById(1L).getName());
    }

    @Test
    public void getProductByIdTest_Negative() {
        Mockito.when(productRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        try {
            productService.getProductById(1L);
        } catch (ProductNotFoundException e) {
            Assert.assertTrue(e.getMessage().equals(messages.getMessage("message.productNotFound", null, null)));
        }
    }

    @Test
    public void updateProductByIdTest() throws Exception {
        Product product = new Product.ProductBuilder()
                .setId(1L)
                .setName("Fockittol")
                .setDescription("Effectively eliminates all the f*ucks given about anything.")
                .setPrice(420)
                .build();
        Product product_details = new Product.ProductBuilder()
                .setId(1L)
                .setName("Fockittol")
                .setDescription("...")
                .setPrice(20)
                .build();
        Mockito.when(productRepository.existsById(1L)).thenReturn(true);
        Mockito.when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        Mockito.when(productRepository.save(Mockito.any(Product.class))).thenReturn(product_details);
        Assert.assertEquals(product.getPrice(), productService.getProductById(1L).getPrice());
        Assert.assertEquals(product.getDescription(), productService.getProductById(1L).getDescription());
        product_details.setId(null);
        Assert.assertEquals("...", productService.updateProductById(1L, product_details).getDescription());
        Assert.assertEquals(20, productService.updateProductById(1L, product_details).getPrice());
    }

    @Test
    public void deleteProductByIdTest() throws ProductNotFoundException {
        Product product_one = new Product.ProductBuilder()
                .setId(1L)
                .setName("Fockittol")
                .setDescription("Effectively eliminates all the f*ucks given about anything.")
                .setPrice(420)
                .build();
        Mockito.when(productRepository.findById(1L)).thenReturn(Optional.of(product_one));
        productService.deleteProductById(1L);
        Mockito.verify(productRepository, Mockito.times(1)).deleteById(1L);
    }

    @Test
    public void searchProductsTest() throws NoRecordsFoundException {
        Product product_one = new Product.ProductBuilder()
                .setId(1L)
                .setName("Fockittol")
                .setDescription("Effectively eliminates all the f*ucks given about anything.")
                .setPrice(420)
                .build();
        Product product_two = new Product.ProductBuilder()
                .setId(2L)
                .setName("Fockitforte")
                .setDescription("Effective sedative.")
                .setPrice(210)
                .build();
        Mockito.when(productRepository.findByNameContaining(Mockito.anyString())).thenReturn(Stream.of(product_one, product_two).collect(Collectors.toList()));
        Assert.assertEquals(2, productService.getProductsBySearchQuery("Fock").size());
    }

    @Test
    public void getProductByPrice() throws NoRecordsFoundException {
        Product product_one = new Product.ProductBuilder()
                .setId(1L)
                .setName("Fockittol")
                .setDescription("Effectively eliminates all the f*ucks given about anything.")
                .setPrice(420)
                .build();
        Product product_two = new Product.ProductBuilder()
                .setId(2L)
                .setName("Fockitforte")
                .setDescription("Effective sedative.")
                .setPrice(210)
                .build();
        Mockito.when(productRepository.findByPrice(Mockito.anyInt())).thenReturn(Stream.of(product_one).collect(Collectors.toList()));
        Mockito.when(productRepository.findByPriceGreaterThanEqual(Mockito.anyInt())).thenReturn(Stream.of(product_one).collect(Collectors.toList()));
        Mockito.when(productRepository.findByPriceLessThanEqual(Mockito.anyInt())).thenReturn(Stream.of(product_two).collect(Collectors.toList()));
        Assert.assertEquals(1, productService.getProductsEqualPrice(420).size());
        Assert.assertEquals(1, productService.getProductsAbovePrice(300).size());
        Assert.assertEquals(1, productService.getProductsBelowPrice(300).size());
    }
}

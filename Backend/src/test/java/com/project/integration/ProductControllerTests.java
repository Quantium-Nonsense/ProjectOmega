package com.project.integration;

import com.project.omega.bean.dao.auth.JwtRequest;
import com.project.omega.bean.dao.entity.Product;
import com.project.omega.bean.dao.entity.Supplier;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Random;


@RunWith(SpringRunner.class)
@SpringBootTest
public class ProductControllerTests {

    //private int port = 5000;

    private String remoteBaseUrl = "http://40.65.236.154";

    TestRestTemplate restTemplate = new TestRestTemplate();

    HttpHeaders headers = new HttpHeaders();

//    private String createURLWithPort(String uri) {
//
//        return "http://localhost:" + port + uri;
//    }

    public String createURLWithPort(String uri) {

        return remoteBaseUrl + uri;
    }

    @Test
    public void addProducts() {
        /*LOGIN AS ADMIN*/
        JwtRequest req = new JwtRequest("arindam@gmail.com", "password@123");
        HttpEntity<JwtRequest> httpReq = new HttpEntity<>(req, headers);
        ResponseEntity<String> adminLoginResp = restTemplate.exchange(
                createURLWithPort("/api/authenticate"),
                HttpMethod.POST, httpReq, String.class);
        String loginResp = adminLoginResp.getHeaders().get(HttpHeaders.LOCATION).get(0);
        Assert.assertTrue("Should Authenticate Admin", loginResp.contains("/api/authenticate"));

        String token = adminLoginResp.getBody().split(":")[1];
        String bearer = "Bearer " + token.substring(1, token.length() - 2);
        headers.set("Authorization", bearer);

        /*ADD SUPPLIER*/
        Supplier supplier = new Supplier("Sonalika", "Ghosh", "ABC Company", "ABC Block-3, Brighton, United Kingdom", "BN 9BJ", "Some Town", "East Sussex", "United Kingdom", "Sonalika@gmail.com", "ABC Company Supplies ABC", "+44 123456789", "We also want to sell DEF");
        HttpEntity<Supplier> supplierReq = new HttpEntity<>(supplier, headers);
        ResponseEntity<Supplier> createSupplierUri = restTemplate.exchange(
                createURLWithPort("/api/supplier/create"),
                HttpMethod.POST, supplierReq, Supplier.class);
        String supplierResponse = createSupplierUri.getHeaders().get(HttpHeaders.LOCATION).get(0);
        Assert.assertTrue("Should Create Supplier", supplierResponse.contains("/api/supplier/create"));
        /*Add Product*/
        Product product = new Product(new Random().nextLong(), "Savlon", " Antiseptic Liquid", 5, createSupplierUri.getBody());
        HttpEntity<Product> productReq = new HttpEntity<>(product, headers);
        ResponseEntity<Product> productReUri = restTemplate.exchange(
                createURLWithPort("/api/product/create"),
                HttpMethod.POST, productReq, Product.class);
        Product actualProduct = productReUri.getBody();
        String prodResp = productReUri.getHeaders().get(HttpHeaders.LOCATION).get(0);
        Assert.assertTrue("Product Should be Created", prodResp.contains("/api/product/create"));
    }

}

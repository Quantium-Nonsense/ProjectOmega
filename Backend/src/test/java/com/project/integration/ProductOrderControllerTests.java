package com.project.integration;

import com.project.omega.bean.dao.auth.JwtRequest;
import com.project.omega.bean.dao.entity.Client;
import com.project.omega.bean.dao.entity.Order;
import com.project.omega.bean.dao.entity.OrderProduct;
import com.project.omega.bean.dao.entity.Product;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProductOrderControllerTests {

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
    public void addProductOrderForClient() {
        /*Login as Representative*/
        JwtRequest req = new JwtRequest("kaylesh@gmail.com", "password@123");
        HttpEntity<JwtRequest> httpReq = new HttpEntity<>(req, headers);
        ResponseEntity<String> adminLoginResp = restTemplate.exchange(
                createURLWithPort("/api/authenticate"),
                HttpMethod.POST, httpReq, String.class);
        String loginResp = adminLoginResp.getHeaders().get(HttpHeaders.LOCATION).get(0);
        Assert.assertTrue("Should Authenticate Representative", loginResp.contains("/api/authenticate"));

        String token = adminLoginResp.getBody().split(":")[1];
        String bearer = "Bearer " + token.substring(1, token.length() - 2);
        headers.set("Authorization", bearer);

        /*Fetch Client*/
        Client client = new Client();
        HttpEntity<Client> clientEntity = new HttpEntity<>(client, headers);
        ResponseEntity<Client> clientResponse = restTemplate.exchange(
                createURLWithPort("/api/client/64"),
                HttpMethod.GET, clientEntity, Client.class);
        Client actualClient = clientResponse.getBody();

        /*Fetch Product*/
        Product product = new Product();
        HttpEntity<Product> productEntity = new HttpEntity<>(product, headers);
        ResponseEntity<Product> productResponse = restTemplate.exchange(
                createURLWithPort("/api/product/69"),
                HttpMethod.GET, productEntity, Product.class);
        Product actualProduct = productResponse.getBody();

        OrderProduct orderProduct = new OrderProduct(Math.abs(new Random().nextLong()), actualProduct, actualClient, 25);
        List<OrderProduct> orderProductsList = new ArrayList<>();
        orderProductsList.add(orderProduct);

        Order order = new Order(null, orderProductsList, null);
        HttpEntity<Order> httpReqForOrder = new HttpEntity<>(order, headers);
        ResponseEntity<String> orderResp = restTemplate.exchange(
                createURLWithPort("/api/order/create"),
                HttpMethod.POST, httpReqForOrder, String.class);
        String orderResponse = orderResp.getHeaders().get(HttpHeaders.LOCATION).get(0);
        Assert.assertTrue("Order should be create", orderResponse.contains("/api/order/create"));
    }
}

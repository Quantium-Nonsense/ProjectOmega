package com.project.integration;

import com.project.omega.bean.dao.auth.JwtRequest;
import com.project.omega.bean.dao.entity.Client;
import com.project.omega.bean.dto.ClientDTO;
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
public class ClientRegistrationControllerTests {

    private int port = 5000;

    TestRestTemplate restTemplate = new TestRestTemplate();

    HttpHeaders headers = new HttpHeaders();

    private String createURLWithPort(String uri) {
        return "http://localhost:" + port + uri;
    }

    @Test
    public void addClient() {
        /*Admin Login*/
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

        /*Add Client*/
        Long id = new Random().nextLong();
        ClientDTO clientDTO = new ClientDTO(id, "martin", "berger", "Martin is our new client. Associated with NHS", "Martin Berger Co.", "martin@gmail.com", "+44 654563322", "Orders would be added by Rep.");
        Client client = new Client(clientDTO.getId(), clientDTO.getFirst_name(), clientDTO.getLast_name(), clientDTO.getDescription(), clientDTO.getCompanyName(), clientDTO.getEmail(), clientDTO.getContactNumber(), clientDTO.getNotes());
        HttpEntity<Client> clientHttpEntity = new HttpEntity<>(client, headers);
        ResponseEntity<String> clientResp = restTemplate.exchange(
                createURLWithPort("/api/client/create"),
                HttpMethod.POST, clientHttpEntity, String.class);
        String clientDetails = clientResp.getHeaders().get(HttpHeaders.LOCATION).get(0);
        Assert.assertTrue("Client should be created.", clientDetails.contains("/api/client/create"));
    }
}

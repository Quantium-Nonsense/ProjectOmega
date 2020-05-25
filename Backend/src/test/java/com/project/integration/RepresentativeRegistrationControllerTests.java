package com.project.integration;

import com.project.omega.bean.dao.auth.JwtRequest;
import com.project.omega.bean.dao.auth.Role;
import com.project.omega.bean.dto.UserDTO;
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
import java.util.Collection;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RepresentativeRegistrationControllerTests {

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
    public void addRepUser() {
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

        Collection<Role> roles = new ArrayList<>();
        Role role = new Role();
        HttpEntity<Role> roleEntity = new HttpEntity<>(role, headers);
        ResponseEntity<Role> roleResponse = restTemplate.exchange(
                createURLWithPort("/api/role/ROLE_REP"),
                HttpMethod.GET, roleEntity, Role.class);
        Role actualRole = roleResponse.getBody();
        roles.add(actualRole);

        UserDTO rep = new UserDTO("kaylesh@gmail.com", "password@123", roles);
        HttpEntity<UserDTO> httpRegistrationEntity = new HttpEntity<>(rep, headers);
        ResponseEntity<String> registrationResp = restTemplate.exchange(
                createURLWithPort("/api/registration"),
                HttpMethod.POST, httpRegistrationEntity, String.class);
        String resp = registrationResp.getHeaders().get(HttpHeaders.LOCATION).get(0);
        Assert.assertTrue("Should Register Representative.", resp.contains("/api/registration"));
        JwtRequest repReq = new JwtRequest(rep.getEmail(), rep.getPassword());
        HttpEntity<JwtRequest> httpRepReq = new HttpEntity<>(repReq, headers);
        ResponseEntity<String> repLoginResp = restTemplate.exchange(
                createURLWithPort("/api/authenticate"),
                HttpMethod.POST, httpRepReq, String.class);
        String loginRepResp = repLoginResp.getHeaders().get(HttpHeaders.LOCATION).get(0);
        Assert.assertTrue("Should Authenticate Rep", loginRepResp.contains("/api/authenticate"));
    }
}

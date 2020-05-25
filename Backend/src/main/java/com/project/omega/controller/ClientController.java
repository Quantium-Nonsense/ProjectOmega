package com.project.omega.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.omega.bean.dao.entity.Client;
import com.project.omega.exceptions.ClientNotFoundException;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.service.interfaces.ClientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin
@RequestMapping(value = "/api/client")
public class ClientController {
    
    @Autowired
    ClientService clientService;
    
    private Logger logger = LoggerFactory.getLogger(ClientController.class);
    
    private ObjectMapper mapper = new ObjectMapper();
    
    @PostMapping(value = "/create", headers = "Accept=application/json")
    public ResponseEntity<Client> createClient(@RequestBody Client client) {
        logger.info("Request received: /api/client/create with hash {}", client.hashCode());
        logger.debug("Request body object: {}", client);
        
        Client newClient = clientService.createClient(client);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/api/client/create"));

        logger.debug("newClient id: {}", newClient.getId());
        logger.info("/create with hash {} is complete", client.hashCode());
        return new ResponseEntity(newClient, headers, HttpStatus.CREATED);
    }
    
    @GetMapping(value = "/get")
    public ResponseEntity<Client> getAllClients() {
        logger.info("Request received: /api/client/get");
        try {
            List<Client> clients = clientService.getAllClients();
            logger.info("Records found and returned");
            return new ResponseEntity(clients, HttpStatus.OK);
        } catch (NoRecordsFoundException e) {
            logger.info("No records found");
            return new ResponseEntity(new ArrayList(), HttpStatus.OK);
        }
    }
    
    @GetMapping(value = "/{id}")
    public ResponseEntity getClient(@PathVariable(value = "id") Long id) throws ClientNotFoundException, NoRecordsFoundException {
        logger.info("Request received: /api/client/{}", id);
        Client client = null;
        try {
            client = clientService.getClientById(id);
        } catch (NoRecordsFoundException e) {
            logger.warn("No records to search");
            throw e;
        } catch (ClientNotFoundException e) {
            logger.warn("Client with id {} was not found", id);
            throw e;
        }
        logger.info("Client {} found and returned", id);
        return new ResponseEntity(client, HttpStatus.OK);
    }
    
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteClient(@PathVariable(value = "id") Long id) throws ClientNotFoundException {
        logger.info("Request received: /api/client/delete/{}", id);
        Optional<Client> client = null;
        try {
            client = clientService.deleteClientById(id);
        } catch (ClientNotFoundException e) {
            logger.warn("Client with id {} was not found", id);
            throw e;
        }
        logger.info("Client {} deleted", id);
        return new ResponseEntity(client, HttpStatus.OK);
    }
    
    @PutMapping(value = "/update/{id}")
    public ResponseEntity updateClient(@PathVariable(value = "id") Long id, @RequestBody Client updated) throws ClientNotFoundException {
        logger.info("Request received: /api/update/{}", id);
        Client client = null;
        try {
            client = clientService.updateClientById(id, updated);
        } catch (ClientNotFoundException e) {
            logger.warn("Client with id {} was not found", id);
            throw e;
        }
        logger.info("Client {} was updated with new attributes and returned", id);
        return new ResponseEntity(client, HttpStatus.OK);
    }
}



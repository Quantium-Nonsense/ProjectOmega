package com.project.omega.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.omega.bean.dao.entity.Client;
import com.project.omega.exceptions.ClientNotFoundException;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.repository.ClientRepository;
import com.project.omega.service.interfaces.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import javax.lang.model.element.VariableElement;
//import javax.xml.ws.Response;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/client")
public class ClientController {

    @Autowired
    ClientService clientService;

    private ObjectMapper mapper = new ObjectMapper();

    @PostMapping(value = "/create", headers = "Accept=application/json")
    public ResponseEntity<Client> createClient(@RequestBody Client client) {
        Client newClient = clientService.createClient(client);
        return new ResponseEntity(newClient, HttpStatus.CREATED);
    }

    @GetMapping(value = "/get")
    public ResponseEntity<Client> getAllClients() throws NoRecordsFoundException {
        List<Client> clients = clientService.getAllClients();
        return new ResponseEntity(clients, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getClient(@PathVariable(value = "id") Long id) throws ClientNotFoundException, NoRecordsFoundException {
        Client client = clientService.getClientById(id);
        return new ResponseEntity(client, HttpStatus.OK);

    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteClient(@PathVariable(value = "id") Long id) throws ClientNotFoundException {
        Optional<Client> client = clientService.deleteClientById(id);
        return new ResponseEntity(client, HttpStatus.OK);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity updateClient(@PathVariable(value = "id") Long id, @RequestBody Client updated) throws ClientNotFoundException {
        Client client = clientService.updateClientById(id, updated);
        return new ResponseEntity(client, HttpStatus.OK);
    }
}



package com.quantiumnonsense.omega.service.interfaces;

import com.quantiumnonsense.omega.bean.dao.entity.Client;
import com.quantiumnonsense.omega.exceptions.ClientNotFoundException;
import com.quantiumnonsense.omega.exceptions.NoRecordsFoundException;

import java.util.List;
import java.util.Optional;

public interface ClientService {



    Client createClient(Client client);
    List<Client> getAllClients () throws NoRecordsFoundException;
    Client getClientById (Long id) throws NoRecordsFoundException, ClientNotFoundException;
//    List <Client> getClientsbySearchQuery(String name) throws NoRecordsFoundException;
    Client updateClientById(Long id, Client newClient) throws ClientNotFoundException;
    Optional<Client> deleteClientById(Long id) throws ClientNotFoundException;



}

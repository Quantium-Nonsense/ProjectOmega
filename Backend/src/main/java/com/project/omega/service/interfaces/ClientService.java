package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.entity.Client;
import com.project.omega.exceptions.ClientNotFoundException;
import com.project.omega.exceptions.NoRecordsFoundException;

import java.util.List;
import java.util.Optional;

public interface ClientService {



    Client createClient(Client client);
    List<Client> getAllClients () throws NoRecordsFoundException;
    Client getClientById (Long id) throws ClientNotFoundException;
//    List <Client> getClientsbySearchQuery(String name) throws NoRecordsFoundException;
    Client updateClientById(Long id, Client newClient) throws ClientNotFoundException;
    Optional<Client> deleteClientById(Long id) throws ClientNotFoundException;



}

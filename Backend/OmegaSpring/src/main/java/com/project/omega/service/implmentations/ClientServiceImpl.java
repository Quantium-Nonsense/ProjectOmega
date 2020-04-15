package com.project.omega.service.implmentations;

import com.project.omega.bean.dao.entity.Client;
import com.project.omega.exceptions.ClientNotFoundException;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.helper.Constant;
import com.project.omega.repository.ClientRepository;
import com.project.omega.service.interfaces.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClientServiceImpl implements ClientService {

    @Autowired
    ClientRepository clientRepository;

    public Client createClient(Client client) {
        clientRepository.save(client);
        return client;
    }

    public List<Client> getAllClients() throws NoRecordsFoundException {
        List<Client> clients = clientRepository.findAll();
        if(clients.isEmpty()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_PRODUCTS);
        }
        return clients;
    }

    public Client getClientById (Long id) throws ClientNotFoundException {
        Optional<Client> client = clientRepository.findById(id);
        if(!client.isPresent()) {
            throw new ClientNotFoundException(Constant.ERROR_CLIENT_NOT_FOUND + id);

        }
        return client.get();

    }


//    public List<Client> getClientsBySearchQuery(String name) throws NoRecordsFoundException {
//        List<Client> clients = clientRepository.findByClientNameContaining(name);
//        if (clients.isEmpty()){
//            throw new NoRecordsFoundException(Constant.ERROR_NO_RECORDS);
//        }
//        return clients;
//    }


    public Client updateClientById(Long id, Client newClient) throws ClientNotFoundException{
        if (!clientRepository.findById(id).isPresent()){
            throw new ClientNotFoundException(Constant.ERROR_CLIENT_NOT_FOUND + id );
        }
        if(newClient.getFirst_name() != null && newClient.getLast_name()!= null) {
            newClient.setId(id);
            clientRepository.save(newClient);

        } else {
            throw new RuntimeException("Null/invalid values detected");
        }
        return newClient;
    }

    public Optional<Client> deleteClientById(Long id) throws ClientNotFoundException {
        Optional<Client> client = clientRepository.findById(id);
        if (!client.isPresent()){
            throw new ClientNotFoundException(Constant.ERROR_CLIENT_NOT_FOUND + id );
        }
        clientRepository.deleteById(id);
        return client;



    }




}

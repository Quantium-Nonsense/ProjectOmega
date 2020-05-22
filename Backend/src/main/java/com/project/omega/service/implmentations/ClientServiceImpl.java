package com.project.omega.service.implmentations;

import com.project.omega.bean.dao.entity.Client;
import com.project.omega.exceptions.ClientNotFoundException;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.repository.ClientRepository;
import com.project.omega.service.interfaces.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private MessageSource messages;

    public Client createClient(Client client) {
        if(client.getNotes().isEmpty() || client.getNotes() == null) {
            client.setNotes("");
        }
        clientRepository.save(client);
        return client;
    }

    public List<Client> getAllClients() throws NoRecordsFoundException {
        List<Client> clients = clientRepository.findAll();
        if (clients.isEmpty()) {
            throw new NoRecordsFoundException(messages.getMessage("message.noRecords", null, null));
        }
        return clients;
    }

    public Client getClientById(Long id) throws ClientNotFoundException {
        Optional<Client> client = clientRepository.findById(id);
        if (!client.isPresent()) {
            throw new ClientNotFoundException(messages.getMessage("message.clientNotFound", null, null));

        }
        return client.get();

    }

    public Client updateClientById(Long id, Client newClient) throws ClientNotFoundException {
        if (!clientRepository.findById(id).isPresent()) {
            throw new ClientNotFoundException(messages.getMessage("message.clientNotFound", null, null));
        }
        if (newClient.getFirstName() != null && newClient.getLastName() != null) {
            newClient.setId(id);
            clientRepository.save(newClient);
        } else {
            throw new RuntimeException("Null/invalid values detected");
        }
        return newClient;
    }

    public Optional<Client> deleteClientById(Long id) throws ClientNotFoundException {
        Optional<Client> client = clientRepository.findById(id);
        if (!client.isPresent()) {
            throw new ClientNotFoundException(messages.getMessage("message.clientNotFound", null, null));
        }
        clientRepository.deleteById(id);
        return client;
    }


}

package com.project.testcontroller;

import com.project.OmegaApplicationTests;
import com.project.omega.bean.dao.entity.Client;
import com.project.omega.bean.dao.entity.Product;
import com.project.omega.exceptions.ClientNotFoundException;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.ProductNotFoundException;
import com.project.omega.repository.ClientRepository;
import com.project.omega.service.implmentations.ClientServiceImpl;
import com.project.omega.service.interfaces.ClientService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.MessageSource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ClientTestService extends OmegaApplicationTests {
    @Mock
    ClientRepository clientRepository;

    @InjectMocks
    ClientService clientService = new ClientServiceImpl();

    @Autowired
    MessageSource messages;

    @Test
    public void createClientTest() throws NoRecordsFoundException {
        Client client = new Client.ClientBuilder()
                .setId(1L)
                .setFirst_name("John")
                .setLast_name("Doe")
                .setDescription("Buys lots of things")
                .setCompanyName("Lloyds")
                .setEmail("a@a.com")
                .setContactNumber("02088273729")
                .setNotes("that's a random phone number")
                .build();

        Mockito.when(clientRepository.save(Mockito.any(Client.class))).thenReturn(client);
        Mockito.when(clientRepository.findAll()).thenReturn(Stream.of(client).collect(Collectors.toList()));
        Assert.assertEquals(1, clientService.getAllClients().size());
    }


    @Test
    public void getAllClientsTest_Positive() throws NoRecordsFoundException {
        Client client_one = new Client.ClientBuilder()
                .setId(1L)
                .setFirst_name("John")
                .setLast_name("Doe")
                .setDescription("Buys lots of things")
                .setCompanyName("Lloyds")
                .setEmail("a@a.com")
                .setContactNumber("02088273729")
                .setNotes("that's a random phone number")
                .build();
        Client client_two = new Client.ClientBuilder()
                .setId(2L)
                .setFirst_name("Jane")
                .setLast_name("Smith")
                .setDescription("Doesn't buy much")
                .setCompanyName("Sdyoll")
                .setEmail("b@b.com")
                .setContactNumber("02088747643")
                .setNotes("that's another random phone number")
                .build();
        Mockito.when(clientRepository.findAll()).thenReturn(Stream.of(client_one, client_two).collect(Collectors.toList()));
        Assert.assertEquals(2, clientService.getAllClients().size());
        Assert.assertTrue(clientService.getAllClients().contains(client_two));
        Assert.assertTrue(clientService.getAllClients().contains(client_one));
    }

    @Test
    public void getAllClientsTest_Negative() throws NoRecordsFoundException {
        Mockito.when(clientRepository.findAll()).thenReturn(new ArrayList<Client>());
        try {
            clientService.getAllClients();
        } catch (NoRecordsFoundException e) {
            Assert.assertTrue(clientRepository.findAll().isEmpty());
            Assert.assertTrue(e.getMessage().equals(messages.getMessage("message.noRecords", null, null)));
        }
    }

    @Test
    public void getClientByIdTest_Positive() throws ClientNotFoundException {
        Client client_one = new Client.ClientBuilder()
                .setId(1L)
                .setFirst_name("John")
                .setLast_name("Doe")
                .setDescription("Buys lots of things")
                .setCompanyName("Lloyds")
                .setEmail("a@a.com")
                .setContactNumber("02088273729")
                .setNotes("that's a random phone number")
                .build();
        Client client_two = new Client.ClientBuilder()
                .setId(2L)
                .setFirst_name("Jane")
                .setLast_name("Smith")
                .setDescription("Doesn't buy much")
                .setCompanyName("Sdyoll")
                .setEmail("b@b.com")
                .setContactNumber("02088747643")
                .setNotes("that's another random phone number")
                .build();
        Mockito.when(clientRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(client_one));
        Assert.assertEquals(client_one.getFirst_name(), clientService.getClientById(1L).getFirst_name());
    }

    @Test
    public void getClientByIdTest_Negative() throws ClientNotFoundException {
        Mockito.when(clientRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        try {
            clientService.getClientById(1L);
        } catch (ClientNotFoundException e) {
            Assert.assertTrue(e.getMessage().equals(messages.getMessage("message.clientNotFound", null, null)));
        }
    }

    @Test
    public void updateClientByIdTest() throws ClientNotFoundException {

    }

    @Test
    public void deleteClientByIdTest() throws ClientNotFoundException {

    }

}

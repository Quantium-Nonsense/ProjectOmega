package com.project.testcontroller;

import com.project.OmegaApplicationTests;
import com.project.omega.bean.dao.entity.Client;
import com.project.omega.bean.dao.entity.Product;
import com.project.omega.exceptions.ClientNotFoundException;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.repository.ClientRepository;
import com.project.omega.service.implmentations.ClientServiceImpl;
import com.project.omega.service.interfaces.ClientService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Collectors;
import java.util.stream.Stream;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ClientTestService extends OmegaApplicationTests {
    @Mock
    ClientRepository clientRepository;

    @InjectMocks
    ClientService clientService = new ClientServiceImpl();

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
        
    }

    @Test
    public void getAllClientsTest_Negative() throws NoRecordsFoundException {

    }

    @Test
    public void getClientByIdTest_Positive() throws ClientNotFoundException {

    }

    @Test
    public void getClientByIdTest_Negative() throws ClientNotFoundException {

    }

    @Test
    public void updateClientByIdTest() throws ClientNotFoundException {

    }

    @Test
    public void deleteClientByIdTest() throws ClientNotFoundException {

    }

}

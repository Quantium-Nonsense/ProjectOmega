package com.project.testcontroller;

import com.project.OmegaApplicationTests;
import com.project.omega.exceptions.ClientNotFoundException;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.repository.ClientRepository;
import com.project.omega.service.implmentations.ClientServiceImpl;
import com.project.omega.service.interfaces.ClientService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ClientTestService extends OmegaApplicationTests {
    @Mock
    ClientRepository clientRepository;

    @InjectMocks
    ClientService clientService = new ClientServiceImpl();

    @Test
    public void createClientTest() throws NoRecordsFoundException {

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

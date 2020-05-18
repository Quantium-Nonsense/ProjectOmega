package com.project.testcontroller;

import com.project.OmegaApplicationTests;
import com.project.omega.repository.ClientRepository;
import com.project.omega.service.implmentations.ClientServiceImpl;
import com.project.omega.service.interfaces.ClientService;
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
}

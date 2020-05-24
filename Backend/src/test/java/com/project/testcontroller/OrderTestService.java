package com.project.testcontroller;

import com.project.OmegaApplicationTests;
import com.project.omega.exceptions.OrderNotFoundException;
import com.project.omega.repository.OrderProductRepository;
import com.project.omega.repository.OrderRepository;
import com.project.omega.service.implmentations.OrderProductServiceImpl;
import com.project.omega.service.implmentations.OrderServiceImpl;
import com.project.omega.service.interfaces.OrderProductService;
import com.project.omega.service.interfaces.OrderService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.MessageSource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrderTestService extends OmegaApplicationTests {
    @Mock
    OrderProductRepository orderProductRepository;

    @Mock
    OrderRepository orderRepository;

    @InjectMocks
    OrderProductService orderProductService = new OrderProductServiceImpl(orderProductRepository);

    @InjectMocks
    OrderService orderService = new OrderServiceImpl();

    @Autowired
    MessageSource messages;

    @Test
    public void createOrderProductTest() {

    }

    @Test
    public void createOrderTest() {

    }

    @Test
    public void getAllOrdersTest_Positive() {

    }

    @Test
    public void getAllOrdersTest_Negative() {

    }

    @Test
    public void getOrderByIdTest_Positive() throws OrderNotFoundException {

    }

    @Test
    public void getOrderByIdTest_Negative() throws OrderNotFoundException {

    }

    @Test
    public void updateOrderByIdTest() throws OrderNotFoundException {

    }

    @Test
    public void deleteOrderProductByProductIdTest() {

    }


}

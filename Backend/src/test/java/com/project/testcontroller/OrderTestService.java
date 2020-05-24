package com.project.testcontroller;

import com.project.OmegaApplicationTests;
import com.project.omega.bean.dao.entity.*;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.OrderNotFoundException;
import com.project.omega.exceptions.ProductNotFoundException;
import com.project.omega.helper.TestingConstant;
import com.project.omega.repository.OrderProductRepository;
import com.project.omega.repository.OrderRepository;
import com.project.omega.service.implmentations.OrderProductServiceImpl;
import com.project.omega.service.implmentations.OrderServiceImpl;
import com.project.omega.service.interfaces.OrderProductService;
import com.project.omega.service.interfaces.OrderService;
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

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
        Product product = new Product.ProductBuilder()
                .setId(1L)
                .setName("Fockittol")
                .setDescription("Effectively eliminates all the f*ucks given about anything.")
                .setPrice(420)
                .build();
        Client client = new Client.ClientBuilder()
                .setId(1L)
                .setFirstName("John")
                .setLast_name("Doe")
                .setDescription("Buys lots of things")
                .setCompanyName("Lloyds")
                .setEmail("a@a.com")
                .setContactNumber("02088273729")
                .setNotes("that's a random phone number")
                .build();

        OrderProduct orderProduct = new OrderProduct.OrderProductBuilder()
                .setId(1L)
                .setProduct(product)
                .setClient(client)
                .setQuantity(2)
                .build();

        Mockito.when(orderProductRepository.save(Mockito.any(OrderProduct.class))).thenReturn(orderProduct);
        Assert.assertEquals(orderProduct, orderProductService.create(orderProduct));

    }

    @Test
    public void createOrderTest() {
        Product product = new Product.ProductBuilder()
                .setId(1L)
                .setName("Fockittol")
                .setDescription("Effectively eliminates all the f*ucks given about anything.")
                .setPrice(420)
                .build();
        Client client = new Client.ClientBuilder()
                .setId(1L)
                .setFirstName("John")
                .setLast_name("Doe")
                .setDescription("Buys lots of things")
                .setCompanyName("Lloyds")
                .setEmail("a@a.com")
                .setContactNumber("02088273729")
                .setNotes("that's a random phone number")
                .build();
        LocalDate dateCreated = LocalDate.now();

        OrderProduct orderProduct = new OrderProduct.OrderProductBuilder()
                .setId(1L)
                .setProduct(product)
                .setClient(client)
                .setQuantity(2)
                .build();

        List<OrderProduct> productList = new ArrayList<>();
        productList.add(orderProduct);

        User user = new User.UserBuilder()
                .setId(TestingConstant.TEST_ID_1)
                .setEmail(TestingConstant.TEST_EMAIL_1)
                .setPassword(TestingConstant.TEST_PASSWORD)
                .build();

        Order order = new Order.OrderBuilder()
                .setId(1L)
                .setDateCreated(dateCreated)
                .setOrderProducts(productList)
                .setUserId(user.getId())
                .setStatus("STATED")
                .build();

        Mockito.when(orderRepository.save(Mockito.any(Order.class))).thenReturn(order);
        Mockito.when(orderRepository.findAll()).thenReturn(Stream.of(order).collect(Collectors.toList()));
        Assert.assertEquals(1, orderService.getAllOrders().size());

    }

    @Test
    public void getAllOrdersTest_Positive() {
        Product product = new Product.ProductBuilder()
                .setId(1L)
                .setName("Fockittol")
                .setDescription("Effectively eliminates all the f*ucks given about anything.")
                .setPrice(420)
                .build();
        Client client = new Client.ClientBuilder()
                .setId(1L)
                .setFirstName("John")
                .setLast_name("Doe")
                .setDescription("Buys lots of things")
                .setCompanyName("Lloyds")
                .setEmail("a@a.com")
                .setContactNumber("02088273729")
                .setNotes("that's a random phone number")
                .build();
        LocalDate dateCreated = LocalDate.now();

        OrderProduct orderProduct = new OrderProduct.OrderProductBuilder()
                .setId(1L)
                .setProduct(product)
                .setClient(client)
                .setQuantity(2)
                .build();

        List<OrderProduct> productList = new ArrayList<>();
        productList.add(orderProduct);

        User user = new User.UserBuilder()
                .setId(TestingConstant.TEST_ID_1)
                .setEmail(TestingConstant.TEST_EMAIL_1)
                .setPassword(TestingConstant.TEST_PASSWORD)
                .build();

        Order order_one = new Order.OrderBuilder()
                .setId(1L)
                .setDateCreated(dateCreated)
                .setOrderProducts(productList)
                .setUserId(user.getId())
                .setStatus("STATED")
                .build();

        Order order_two = new Order.OrderBuilder()
                .setId(2L)
                .setDateCreated(LocalDate.now())
                .setOrderProducts(productList)
                .setUserId(user.getId())
                .setStatus("UNSTATED")
                .build();

        Mockito.when(orderRepository.findAll()).thenReturn(Stream.of(order_one, order_two).collect(Collectors.toList()));
        Assert.assertEquals(2, orderService.getAllOrders().size());
        Assert.assertTrue(orderService.getAllOrders().contains(order_one));
        Assert.assertTrue(orderService.getAllOrders().contains(order_two));
    }

    @Test
    public void getAllOrdersTest_Negative() {
        Mockito.when(orderRepository.findAll()).thenReturn(new ArrayList<Order>());
        Assert.assertTrue(orderService.getAllOrders().isEmpty());
    }

    @Test
    public void getOrderByIdTest_Positive() throws OrderNotFoundException {
        Product product = new Product.ProductBuilder()
                .setId(1L)
                .setName("Fockittol")
                .setDescription("Effectively eliminates all the f*ucks given about anything.")
                .setPrice(420)
                .build();
        Client client = new Client.ClientBuilder()
                .setId(1L)
                .setFirstName("John")
                .setLast_name("Doe")
                .setDescription("Buys lots of things")
                .setCompanyName("Lloyds")
                .setEmail("a@a.com")
                .setContactNumber("02088273729")
                .setNotes("that's a random phone number")
                .build();
        LocalDate dateCreated = LocalDate.now();

        OrderProduct orderProduct = new OrderProduct.OrderProductBuilder()
                .setId(1L)
                .setProduct(product)
                .setClient(client)
                .setQuantity(2)
                .build();

        List<OrderProduct> productList = new ArrayList<>();
        productList.add(orderProduct);

        User user = new User.UserBuilder()
                .setId(TestingConstant.TEST_ID_1)
                .setEmail(TestingConstant.TEST_EMAIL_1)
                .setPassword(TestingConstant.TEST_PASSWORD)
                .build();

        Order order = new Order.OrderBuilder()
                .setId(1L)
                .setDateCreated(dateCreated)
                .setOrderProducts(productList)
                .setUserId(user.getId())
                .setStatus("STATED")
                .build();

        Mockito.when(orderRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(order));
        Assert.assertEquals(order.getDateCreated(), orderService.getOrderById(1L).getDateCreated());
    }

    @Test
    public void getOrderByIdTest_Negative() throws OrderNotFoundException {
        Mockito.when(orderRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        try {
            orderService.getOrderById(1L);
        } catch (OrderNotFoundException e) {
            Assert.assertTrue(e.getMessage().equals(messages.getMessage("message.orderNotFound", null, null)));
        }
    }

    @Test
    public void updateOrderByIdTest() throws OrderNotFoundException {
        Product product = new Product.ProductBuilder()
                .setId(1L)
                .setName("Fockittol")
                .setDescription("Effectively eliminates all the f*ucks given about anything.")
                .setPrice(420)
                .build();
        Client client = new Client.ClientBuilder()
                .setId(1L)
                .setFirstName("John")
                .setLast_name("Doe")
                .setDescription("Buys lots of things")
                .setCompanyName("Lloyds")
                .setEmail("a@a.com")
                .setContactNumber("02088273729")
                .setNotes("that's a random phone number")
                .build();
        LocalDate dateCreated = LocalDate.now();

        OrderProduct orderProduct = new OrderProduct.OrderProductBuilder()
                .setId(1L)
                .setProduct(product)
                .setClient(client)
                .setQuantity(2)
                .build();

        List<OrderProduct> productList = new ArrayList<>();
        productList.add(orderProduct);

        User user = new User.UserBuilder()
                .setId(TestingConstant.TEST_ID_1)
                .setEmail(TestingConstant.TEST_EMAIL_1)
                .setPassword(TestingConstant.TEST_PASSWORD)
                .build();

        Order order_one = new Order.OrderBuilder()
                .setId(1L)
                .setDateCreated(dateCreated)
                .setOrderProducts(productList)
                .setUserId(user.getId())
                .setStatus("STATED")
                .build();

        OrderProduct updatedOrderProduct = new OrderProduct.OrderProductBuilder()
                .setId(2L)
                .setProduct(product)
                .setClient(client)
                .setQuantity(3)
                .build();
        List<OrderProduct> updatedProductList = new ArrayList<>();
        updatedProductList.add(updatedOrderProduct);
        Order order_two = new Order.OrderBuilder()
                .setId(1L)
                .setDateCreated(LocalDate.now())
                .setOrderProducts(updatedProductList)
                .setUserId(user.getId())
                .setStatus("STATED")
                .build();
        Mockito.when(orderRepository.existsById(1L)).thenReturn(true);
        Mockito.when(orderRepository.findById(1L)).thenReturn(Optional.of(order_one));
        Mockito.when(orderRepository.save(Mockito.any(Order.class))).thenReturn(order_two);
        Mockito.when(orderProductRepository.save(Mockito.any(OrderProduct.class))).thenReturn(updatedOrderProduct);
        Assert.assertEquals(order_one.getDateCreated(), orderService.getOrderById(1L).getDateCreated());
        Assert.assertEquals(order_one.getTotalOrderPrice(), orderService.getOrderById(1L).getTotalOrderPrice());
        order_two.setId(null);
        Assert.assertEquals(order_two.getDateCreated(), orderService.updateOrder(1L, order_two).getDateCreated());
        Assert.assertEquals(order_two.getTotalOrderPrice(), orderService.updateOrder(1L, order_two).getTotalOrderPrice());
    }

    @Test
    public void deleteOrderProductByProductIdTest() {

    }


}

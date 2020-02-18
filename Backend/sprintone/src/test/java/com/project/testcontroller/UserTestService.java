package com.project.testcontroller;

import com.project.OmegaApplicationTests;
import com.project.omega.bean.User;
import com.project.omega.controller.UserController;
import com.project.omega.enums.RolesEnum;
import com.project.omega.exceptions.DuplicateUserException;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.helper.Constant;
import com.project.omega.repository.UserRepository;
import com.project.omega.service.UserService;
import com.project.omega.service.UserServiceImpl;
import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
public class UserTestService extends OmegaApplicationTests {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService = new UserServiceImpl();

    @Test
    @DisplayName("Test for creating new user.")
    public void createUser_PositiveTest() throws Exception {
        User user = new User.UserBuilder()
                .setId("id2394839834134")
                .setEmail("a@a.com")
                .setPassword("password")
                .setRole(RolesEnum.TEST_ROLE)
                .build();
        Mockito.when(userRepository.save(Mockito.any(User.class))).thenReturn(user);
        Assert.assertEquals("a@a.com", userService.createUser(user).getEmail());
    }

    @Test
    @DisplayName("Test for adding existing user.")
    public void createUser_NegativeTest() throws DuplicateUserException {
        User user_one = new User.UserBuilder()
                .setId("id2394839834134")
                .setEmail("a@a.com")
                .setPassword("password")
                .setRole(RolesEnum.TEST_ROLE)
                .build();
        String expected = Constant.ERROR_USER_EXISTS + user_one.getEmail();
        Mockito.when(userRepository.findByEmail(user_one.getEmail())).thenReturn(1);
        try {
            userService.createUser(user_one);
        } catch (DuplicateUserException e) {
            Assert.assertTrue(e.getMessage().contains(expected));
        }
    }

    @Test
    @DisplayName("Test for retrieving all users.")
    public void getAllUsers_PositiveTest() throws Exception {
        User user_one = new User.UserBuilder()
                .setId("id2394839834134")
                .setEmail("a@a.com")
                .setPassword("password")
                .setRole(RolesEnum.TEST_ROLE)
                .build();
        User user_two = new User.UserBuilder()
                .setId("id6545869643123")
                .setEmail("a@b.com")
                .setPassword("password")
                .setRole(RolesEnum.TEST_ROLE)
                .build();
        Mockito.when(userRepository.findAll()).thenReturn(Stream.of(user_one, user_two).collect(Collectors.toList()));
        Assert.assertEquals(2, userService.getAllUsers().size());
    }

    @Test
    @DisplayName("Test for retrieving all users from an empty database.")
    public void getAllUsers_NegativeTest() throws NoRecordsFoundException {
        List<User> empty = new ArrayList<>();
        Mockito.when(userRepository.findAll()).thenReturn(empty);
        try {
            userService.getAllUsers();
        } catch (NoRecordsFoundException e) {
            Assert.assertTrue(e.getMessage().contains(Constant.ERROR_NO_RECORDS));
        }
    }
}

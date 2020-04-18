package com.project.testcontroller;

import com.project.OmegaApplicationTests;
import com.project.omega.bean.dao.entity.User;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.helper.TestingConstant;
import com.project.omega.repository.UserRepository;
import com.project.omega.service.implmentations.UserServiceImpl;
import com.project.omega.service.interfaces.UserService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserTestService extends OmegaApplicationTests {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService = new UserServiceImpl();

    @Test
    @DisplayName("Test for retrieving all users.")
    public void getAllUsers_PositiveTest() throws Exception {
        User user_one = new User.UserBuilder()
                .setId(TestingConstant.TEST_ID_1)
                .setEmail(TestingConstant.TEST_EMAIL_1)
                .setPassword(TestingConstant.TEST_PASSWORD)
                .build();
        User user_two = new User.UserBuilder()
                .setId(TestingConstant.TEST_ID_2)
                .setEmail(TestingConstant.TEST_EMAIL_2)
                .setPassword(TestingConstant.TEST_PASSWORD)
                .build();
        Mockito.when(userRepository.findAll()).thenReturn(Stream.of(user_one, user_two).collect(Collectors.toList()));
        Mockito.when(userRepository.existsByEmail(Mockito.anyString())).thenReturn(true);
        Assert.assertEquals(2, userService.getAllUsers().size());
        Assert.assertTrue(userRepository.existsByEmail(user_one.getEmail()));
        Assert.assertTrue(userRepository.existsByEmail(user_two.getEmail()));
    }

    @Test
    @DisplayName("Test for retrieving all users from an empty database.")
    public void getAllUsers_NegativeTest() throws NoRecordsFoundException {
        List<User> empty = new ArrayList<>();
        Mockito.when(userRepository.findAll()).thenReturn(empty);
        try {
            userService.getAllUsers();
        } catch (Exception e) {
            Assert.assertEquals(0, userRepository.findAll().size());
        }
    }

    @Test
    @DisplayName("Test for retrieving a user by id.")
    public void getUserById_PositiveTest() throws Exception {
        User user_one = new User.UserBuilder()
                .setId(TestingConstant.TEST_ID_1)
                .setEmail(TestingConstant.TEST_EMAIL_1)
                .setPassword(TestingConstant.TEST_PASSWORD)
                .build();
        Mockito.when(userRepository.findById(TestingConstant.TEST_ID_1)).thenReturn(Optional.of(user_one));
        Assert.assertEquals(user_one.getId(), userService.getUserById(TestingConstant.TEST_ID_1).getId());
        Assert.assertEquals(user_one.getEmail(), userService.getUserById(TestingConstant.TEST_ID_1).getEmail());
    }

    @Test
    @DisplayName("Test for retrieving a user by an invalid id.")
    public void getUserById_NegativeTest() throws Exception {
        User user_one = new User.UserBuilder()
                .setId(TestingConstant.TEST_ID_1)
                .setEmail(TestingConstant.TEST_EMAIL_1)
                .setPassword(TestingConstant.TEST_PASSWORD)
                .build();
        Mockito.when(userRepository.findById(TestingConstant.TEST_ID_1)).thenReturn(Optional.of(user_one));
        Mockito.when(userRepository.findById(TestingConstant.TEST_ID_2)).thenReturn(Optional.empty());
        Mockito.when(userRepository.findAll()).thenReturn(Stream.of(user_one).collect(Collectors.toList()));
        try {
            userService.getUserById(TestingConstant.TEST_ID_2);
        } catch (Exception e) {
            Assert.assertEquals(1, userRepository.findAll().size());
            Assert.assertEquals(user_one.getId(), userRepository.findById(TestingConstant.TEST_ID_1).get().getId());
        }
    }

    @Test
    @DisplayName("Test for deleting a user.")
    public void deleteUser_Test() throws Exception {
        User user_one = new User.UserBuilder()
                .setId(TestingConstant.TEST_ID_1)
                .setEmail(TestingConstant.TEST_EMAIL_1)
                .setPassword(TestingConstant.TEST_PASSWORD)
                .build();
        Mockito.when(userRepository.findById(TestingConstant.TEST_ID_1)).thenReturn(Optional.of(user_one));
        userService.deleteUserById(TestingConstant.TEST_ID_1);
        Mockito.verify(userRepository, Mockito.times(1)).deleteById(TestingConstant.TEST_ID_1);
    }

    @Test
    @DisplayName("Test for updating user details")
    public void updateUser_Test() throws Exception {
        User user_one = new User.UserBuilder()
                .setId(TestingConstant.TEST_ID_1)
                .setEmail(TestingConstant.TEST_EMAIL_1)
                .setPassword(TestingConstant.TEST_PASSWORD)
                .build();
        User user_detail = new User.UserBuilder()
                .setId(TestingConstant.TEST_ID_1)
                .setEmail("email")
                .setPassword("password")
                .build();
        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(user_one));
        Mockito.when(userRepository.save(Mockito.any(User.class))).thenReturn(user_detail);
        Assert.assertEquals(TestingConstant.TEST_ID_1, userService.updateUserById(TestingConstant.TEST_ID_1, user_detail).getId());
    }
}

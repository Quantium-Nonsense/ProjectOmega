//package com.project.testcontroller;
//
//import com.project.OmegaApplicationTests;
//import com.project.omega.bean.dao.entity.User;
//import com.project.omega.helper.Constant;
//import com.project.omega.repository.UserRepository;
//import com.project.omega.service.implmentations.UserServiceImpl;
//import com.project.omega.service.interfaces.UserService;
//import org.junit.Assert;
//import org.junit.Test;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//import java.util.stream.Stream;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//public class UserTestService extends OmegaApplicationTests {
//
//    @Mock
//    private UserRepository userRepository;
//
//    @InjectMocks
//    private UserService userService = new UserServiceImpl();
//
//    @Test
//    @DisplayName("Test for retrieving all users.")
//    public void getAllUsers_PositiveTest() throws Exception {
//        User user_one = new User.UserBuilder()
//                .setId(Constant.TEST_ID_1)
//                .setEmail("a@a.com")
//                .setPassword(Constant.TEST_PASSWORD)
//                .build();
//        User user_two = new User.UserBuilder()
//                .setId(Constant.TEST_ID_2)
//                .setEmail("a@b.com")
//                .setPassword(Constant.TEST_PASSWORD)
//                .build();
//        Mockito.when(userRepository.findAll()).thenReturn(Stream.of(user_one, user_two).collect(Collectors.toList()));
//        Mockito.when(userRepository.existsByEmail(Mockito.anyString())).thenReturn(true);
//        Assert.assertEquals(2, userService.getAllUsers().size());
//        Assert.assertTrue(userRepository.existsByEmail(user_one.getEmail()));
//        Assert.assertTrue(userRepository.existsByEmail(user_two.getEmail()));
//    }
//
//    @Test
//    @DisplayName("Test for retrieving all users from an empty database.")
//    public void getAllUsers_NegativeTest() throws Exception {
//        List<User> empty = new ArrayList<>();
//        Mockito.when(userRepository.findAll()).thenReturn(empty);
//        try {
//            userService.getAllUsers();
//        } catch (Exception e) {
//            Assert.assertEquals(0, userRepository.findAll().size());
//            Assert.assertTrue(e.getMessage().contains(Constant.ERROR_NO_RECORDS));
//        }
//    }
//
//    @Test
//    @DisplayName("Test for retrieving a user by id.")
//    public void getUserById_PositiveTest() throws Exception {
//        User user_one = new User.UserBuilder()
//                .setId(Constant.TEST_ID_1)
//                .setEmail("a@a.com")
//                .setPassword(Constant.TEST_PASSWORD)
//                .build();
//        Mockito.when(userRepository.findById(Constant.TEST_ID_1)).thenReturn(Optional.of(user_one));
//        Assert.assertEquals(user_one.getId(), userService.getUserById(Constant.TEST_ID_1).getId());
//        Assert.assertEquals(user_one.getEmail(), userService.getUserById(Constant.TEST_ID_1).getEmail());
//    }
//
//    @Test
//    @DisplayName("Test for retrieving a user by an invalid id.")
//    public void getUserById_NegativeTest() throws Exception {
//        User user_one = new User.UserBuilder()
//                .setId(Constant.TEST_ID_1)
//                .setEmail("a@a.com")
//                .setPassword(Constant.TEST_PASSWORD)
//                .build();
//        Mockito.when(userRepository.findById(Constant.TEST_ID_1)).thenReturn(Optional.of(user_one));
//        Mockito.when(userRepository.findById(Constant.TEST_ID_2)).thenReturn(Optional.empty());
//        Mockito.when(userRepository.findAll()).thenReturn(Stream.of(user_one).collect(Collectors.toList()));
//        try {
//            userService.getUserById(Constant.TEST_ID_2);
//        } catch (Exception e) {
//            Assert.assertTrue(e.getMessage().contains(Constant.ERROR_USER_NOT_FOUND + Constant.TEST_ID_2));
//            Assert.assertEquals(1, userRepository.findAll().size());
//            Assert.assertEquals(user_one.getId(), userRepository.findById(Constant.TEST_ID_1).get().getId());
//        }
//    }
//
//    @Test
//    @DisplayName("Test for deleting a user.")
//    public void deleteUser_Test() throws Exception {
//        User user_one = new User.UserBuilder()
//                .setId(Constant.TEST_ID_1)
//                .setEmail("a@a.com")
//                .setPassword(Constant.TEST_PASSWORD)
//                .build();
//        Mockito.when(userRepository.findById(Constant.TEST_ID_1)).thenReturn(Optional.of(user_one));
//        userService.deleteUserById(Constant.TEST_ID_1);
//        Mockito.verify(userRepository, Mockito.times(1)).deleteById(Constant.TEST_ID_1);
//    }
//
//    @Test
//    @DisplayName("Test for updating user details")
//    public void updateUser_Test() throws Exception {
//        User user_one = new User.UserBuilder()
//                .setId(Constant.TEST_ID_1)
//                .setEmail("a@a.com")
//                .setPassword(Constant.TEST_PASSWORD)
//                .build();
//        User user_detail = new User.UserBuilder()
//                .setId(Constant.TEST_ID_1)
//                .setEmail("b@b.org")
//                .setPassword("newpassword")
//                .build();
//        Mockito.when(userRepository.existsById(Mockito.anyLong())).thenReturn(true);
//        Mockito.when(userRepository.save(Mockito.any(User.class))).thenReturn(user_detail);
//        Assert.assertEquals(Constant.TEST_ID_1, userService.updateUserById(Constant.TEST_ID_1, user_detail).getId());
//    }
//}

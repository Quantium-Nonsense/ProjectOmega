package com.project.omega.controller;

import com.project.omega.bean.dao.entity.User;
import com.project.omega.bean.dto.UserResponse;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.UserNotFoundException;
import com.project.omega.service.interfaces.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/user")
public class UserController {
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private UserService userService;

    @GetMapping(value = "/get")
    public ResponseEntity getUsers() {
        LOGGER.info("Fetching users...");
        List<User> users = null;
        try {
            users = userService.getAllUsers();
        } catch (NoRecordsFoundException e) {
            LOGGER.warn("No users were found", e);
            return new ResponseEntity(new ArrayList<>(), HttpStatus.OK);
        }
        List<UserResponse> u = users.stream().map(user -> {
            UserResponse response = new UserResponse(user.getId(), user.getEmail(), user.getRoles());
            return response;
        }).collect(Collectors.toList());
        
        LOGGER.info("Users found and sent in response");
        return new ResponseEntity(u, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getById(@PathVariable(value = "id") Long id) throws UserNotFoundException {
        LOGGER.info("Fetching user: {}", id);
        User user = userService.getUserById(id);
        UserResponse userResponse = new UserResponse(user.getId(), user.getEmail(), user.getRoles());
        LOGGER.info("User {} found and sent in response", id);
        return new ResponseEntity(userResponse, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteById(@PathVariable(value = "id") Long id) throws UserNotFoundException {
        LOGGER.info("Deleting user: {}", id);
        User user = userService.deleteUserById(id);
        UserResponse u = new UserResponse(user.getId(), user.getEmail(), user.getRoles());
        return new ResponseEntity(u, HttpStatus.OK);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity updateById(@PathVariable(value = "id") Long id,
                                     @RequestBody User updatedUser) throws Exception {
        LOGGER.info("Updating user: {}", id);
        User userToUpdate = new User();
        User userInDb = userService.getUserById(id);

        if (!updatedUser.getEmail().isEmpty()) {
            LOGGER.info("Updating email");
            userToUpdate.setEmail(updatedUser.getEmail());
        } else {
            LOGGER.info("No email supplied - will skip");
            userToUpdate.setEmail(userInDb.getEmail());
        }

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            LOGGER.info("Updating password");
            userToUpdate.setPassword(updatedUser.getPassword());
        } else {
            LOGGER.info("No new password supplied - will skip");
            userToUpdate.setPassword(userInDb.getPassword());
        }

        if (updatedUser.getRoles() != null && !updatedUser.getRoles().isEmpty()) {
            LOGGER.info("Updating roles");
            userToUpdate.setRoles(updatedUser.getRoles());
        } else {
            LOGGER.info("No new roles supplied - will skip");
            userToUpdate.setRoles(userInDb.getRoles());
        }

        if (updatedUser.getEnabled()) {
            LOGGER.info("Updating user's enabled state");
            userToUpdate.setEnabled(updatedUser.getEnabled());
        } else {
            LOGGER.info("No new enabled state supplied - will skip");
            userToUpdate.setEnabled(userInDb.getEnabled());
        }

        User user = userService.updateUserById(id, userToUpdate);
        UserResponse u = new UserResponse(user.getId(), user.getEmail(), user.getRoles());
        
        LOGGER.info("User updated successfully");
        return new ResponseEntity(u, HttpStatus.OK);
    }
}

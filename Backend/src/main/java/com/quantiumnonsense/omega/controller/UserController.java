package com.quantiumnonsense.omega.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.quantiumnonsense.omega.bean.dao.entity.User;
import com.quantiumnonsense.omega.bean.dto.UserResponse;
import com.quantiumnonsense.omega.exceptions.NoRecordsFoundException;
import com.quantiumnonsense.omega.exceptions.UserNotFoundException;
import com.quantiumnonsense.omega.service.interfaces.UserService;
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
    @Autowired
    private UserService userService;

    private ObjectMapper mapper = new ObjectMapper();

    @GetMapping(value = "/get")
    public ResponseEntity getUsers() {
        List<User> users = null;
        try {
            users = userService.getAllUsers();
        } catch (NoRecordsFoundException e) {
            return new ResponseEntity(new ArrayList<>(), HttpStatus.OK);
        }
        List<UserResponse> u = users.stream().map(user -> {
            UserResponse r = new UserResponse(user.getId(), user.getEmail(), user.getRoles());
            return r;
        }).collect(Collectors.toList());
        return new ResponseEntity(u, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getById(@PathVariable(value = "id") Long id) throws UserNotFoundException {
        User user = userService.getUserById(id);
        UserResponse u = new UserResponse(user.getId(), user.getEmail(), user.getRoles());
        return new ResponseEntity(u, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteById(@PathVariable(value = "id") Long id) throws UserNotFoundException {
        User user = userService.deleteUserById(id);
        UserResponse u = new UserResponse(user.getId(), user.getEmail(), user.getRoles());
        return new ResponseEntity(u, HttpStatus.OK);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity updateById(@PathVariable(value = "id") Long id,
                                     @RequestBody User updatedUser) throws Exception {
        User userToUpdate = new User();
        User userInDb = userService.getUserById(id);

        if (!updatedUser.getEmail().isEmpty()) {
            userToUpdate.setEmail(updatedUser.getEmail());
        } else {
            userToUpdate.setEmail(userInDb.getEmail());
        }

        if (!updatedUser.getPassword().isEmpty()) {
            userToUpdate.setPassword(updatedUser.getPassword());
        } else {
            userToUpdate.setPassword(userInDb.getPassword());
        }

        if (!updatedUser.getRoles().isEmpty()) {
            userToUpdate.setRoles(updatedUser.getRoles());
        } else {
            userToUpdate.setRoles(userInDb.getRoles());
        }

        User user = userService.updateUserById(id, userToUpdate);
        UserResponse u = new UserResponse(user.getId(), user.getEmail(), user.getRoles());
        return new ResponseEntity(u, HttpStatus.OK);
    }
}

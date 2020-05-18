package com.project.omega.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.omega.bean.dao.entity.User;
import com.project.omega.bean.dto.UserResponse;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.UserNotFoundException;
import com.project.omega.service.interfaces.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
            return ResponseEntity.status(HttpStatus.OK).body("No users found.");
        }
        List<UserResponse> u = users.stream().map(user -> {
           UserResponse r = new UserResponse(user.getId(), user.getEmail(), user.getRoles());
           return r;
        }).collect(Collectors.toList());
        return new ResponseEntity(users, HttpStatus.CREATED);
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
                                     @RequestBody User update) throws Exception {
        User user = userService.updateUserById(id, update);
        UserResponse u = new UserResponse(user.getId(), user.getEmail(), user.getRoles());
        return new ResponseEntity(u, HttpStatus.OK);
    }
}

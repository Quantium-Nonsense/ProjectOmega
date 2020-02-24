package com.project.omega.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.omega.bean.User;
import com.project.omega.exceptions.DuplicateUserException;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.UserNotFoundException;
import com.project.omega.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    UserService userService;

    private ObjectMapper mapper = new ObjectMapper();

    @PostMapping(value = "/create", headers = "Accept=application/json")
    public ResponseEntity createUser(@RequestBody User user) throws DuplicateUserException {
        User newUser = userService.createUser(user);
        return new ResponseEntity(newUser, HttpStatus.CREATED);
    }

    @GetMapping(value = "/get")
    public ResponseEntity getUsers() throws NoRecordsFoundException {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity(users, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getById(@PathVariable(value = "id") Long id) throws UserNotFoundException {
        User user = userService.getUserById(id);
        return new ResponseEntity(user, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteById(@PathVariable(value = "id") Long id) throws UserNotFoundException {
        User user = userService.deleteUserById(id);
        return new ResponseEntity(user, HttpStatus.I_AM_A_TEAPOT);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity updateById(@PathVariable(value = "id") Long id,
                                     @RequestBody User update) throws Exception {
        User user = userService.updateUserById(id, update);
        return new ResponseEntity(user, HttpStatus.OK);
    }
}

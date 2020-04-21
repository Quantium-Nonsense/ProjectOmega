package com.project.omega.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.omega.bean.dao.entity.User;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.UserNotFoundException;
import com.project.omega.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    private ObjectMapper mapper = new ObjectMapper();

    @GetMapping(value = "/get")
    public ResponseEntity getUsers() throws NoRecordsFoundException {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity(users, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getById(@PathVariable(value = "id") Long id) throws UserNotFoundException {
        User user = userService.getUserById(id);
        return new ResponseEntity(user, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteById(@PathVariable(value = "id") Long id) throws UserNotFoundException {
        User user = userService.deleteUserById(id);
        return new ResponseEntity(user, HttpStatus.OK);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity updateById(@PathVariable(value = "id") Long id,
                                     @RequestBody User update) throws Exception {
        User user = userService.updateUserById(id, update);
        return new ResponseEntity(user, HttpStatus.OK);
    }
}

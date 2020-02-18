package com.project.omega.controller;

import com.project.omega.bean.User;
import com.project.omega.exceptions.DuplicateUserException;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) throws DuplicateUserException {
        userService.createUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity getUsers() throws NoRecordsFoundException {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}

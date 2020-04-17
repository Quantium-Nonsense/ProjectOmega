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
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserService userService;

    private ObjectMapper mapper = new ObjectMapper();

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

    @PutMapping(value = "/updateForIndustry/{id}/{industryName}")
    public ResponseEntity updateByIdForIndustry(@PathVariable(value = "id") Long id, @PathVariable(value = "industryName") String industry) throws Exception {
        User user = userService.updateUserByIdForIndustry(id, industry);
        return new ResponseEntity(user, HttpStatus.OK);
    }

    @GetMapping(value = "/get/{name}")
    public ResponseEntity getUsersInIndustry(@PathVariable(value = "name") String industryName) throws NoRecordsFoundException {
        List<User> users = userService.getUsersFromIndustry(industryName);
        return new ResponseEntity(users, HttpStatus.OK);
    }
}

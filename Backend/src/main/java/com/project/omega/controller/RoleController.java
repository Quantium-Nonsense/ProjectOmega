package com.project.omega.controller;

import com.project.omega.bean.dao.auth.Role;
import com.project.omega.service.interfaces.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/role")
public class RoleController {
    
    @Autowired
    private RoleService roleService;
    
    private final Logger LOGGER = LoggerFactory.getLogger(RoleController.class);
    
    @PostMapping(value = "/create", headers = "Accept=application/json")
    public ResponseEntity createRole(@RequestBody Role role) {
        LOGGER.info("Request received: /api/role/create");
        roleService.save(role);
        LOGGER.info("Role has been successfully created");
        return new ResponseEntity(HttpStatus.CREATED);
    }
    
    @GetMapping(value = "/get", headers = "Accept=application/json")
    public ResponseEntity getAllRole() {
        LOGGER.info("Request received: /api/role/get");
        List<Role> roles = roleService.findAll();
        LOGGER.info("Roles found and sent in response");
        return new ResponseEntity(roles, HttpStatus.OK);
    }
    
    @GetMapping(value = "/{name}", headers = "Accept=application/json")
    public ResponseEntity getRoleByName(@PathVariable(value = "name") String name) {
        LOGGER.info("Request received: /api/role/{}", name);
        Role role = roleService.findByName(name);
        LOGGER.info("Role found and is sent in response");
        return new ResponseEntity(role, HttpStatus.OK);
    }
    
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteRoleById(@PathVariable(value = "id") Long id) {
        LOGGER.info("Request received: /api/delete/{}", id);
        roleService.deleteRoleById(id);
        LOGGER.info("Role successfully deleted");
        return new ResponseEntity(HttpStatus.OK);
    }
}




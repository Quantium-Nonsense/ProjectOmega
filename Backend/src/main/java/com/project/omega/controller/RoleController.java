package com.project.omega.controller;

import com.project.omega.bean.dao.auth.Role;
import com.project.omega.service.interfaces.RoleService;
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

    @PostMapping(value = "/create", headers = "Accept=application/json")
    public ResponseEntity createRole(@RequestBody Role role) {
        roleService.save(role);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping(value = "/get", headers = "Accept=application/json")
    public ResponseEntity getAllRole() {
        List<Role> roles = roleService.findAll();
        return new ResponseEntity(roles, HttpStatus.OK);
    }

    @GetMapping(value = "/{name}", headers = "Accept=application/json")
    public ResponseEntity getRoleByName(@PathVariable(value = "name") String name) {
        Role role = roleService.findByName(name);
        return new ResponseEntity(role, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteRoleById(@PathVariable(value = "id") Long id)  {
        roleService.deleteRoleById(id);
        return new ResponseEntity(HttpStatus.OK);
    }
}




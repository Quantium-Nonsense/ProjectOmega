package com.project.omega.controller;

import com.project.omega.bean.dao.auth.AdminRoles;
import com.project.omega.bean.dto.IRoleUTO;
import com.project.omega.exceptions.NoRolesCreatedException;
import com.project.omega.service.interfaces.AdminRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/role")
public class AdminRoleController {

    @Autowired
    private AdminRoleService roleService;

    @PostMapping(value = "/create", headers = "Accept=application/json")
    public ResponseEntity createRole(@RequestBody IRoleUTO iRoleUTO) {
        AdminRoles iRoles = roleService.create(iRoleUTO);
        return new ResponseEntity(iRoles, HttpStatus.CREATED);
    }

    @GetMapping(value = "/get", headers = "Accept=application/json")
    public ResponseEntity getAllRole() {
        List<AdminRoles> iRoles = null;
        try {
            iRoles = roleService.getAllRoles();
        } catch (NoRolesCreatedException exception) {
            exception.getMessage();
        }
        return new ResponseEntity(iRoles, HttpStatus.OK);
    }

    @GetMapping(value = "/get/{name}", headers = "Accept=application/json")
    public ResponseEntity getRoleByName(@PathVariable(value = "name") String name) {
        AdminRoles iRole = roleService.findByName(name);
        return new ResponseEntity(iRole, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteRoleById(@PathVariable(value = "id") Long id)  {
        AdminRoles iRole = roleService.deleteRoleById(id);
        return new ResponseEntity(iRole, HttpStatus.GONE);
    }

}




package com.project.omega.controller;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class DummyController {
    @RequestMapping(value = "/hello")
    public String displayMessage() {
        List<String> list = new ArrayList<>();
        list.add("hello");
        list.stream();
        return "We are awesome";
    }

}

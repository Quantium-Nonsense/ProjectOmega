package com.quantiumnonsense.omega.controller;

import com.quantiumnonsense.omega.bean.dto.ClientLogDto;
import com.quantiumnonsense.omega.service.interfaces.KafkaProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class LogController {
    private KafkaProducerService kafkaProducerService;
    
    @Autowired
    public LogController(KafkaProducerService kafkaProducerService) {
        this.kafkaProducerService = kafkaProducerService;
    }
    
    @PostMapping(value = "/log")
    public ResponseEntity<HttpStatus> create(@RequestBody ClientLogDto log) {
        kafkaProducerService.sendMessage("Test Message");
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

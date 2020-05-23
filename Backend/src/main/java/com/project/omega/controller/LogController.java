package com.project.omega.controller;

import com.project.omega.bean.dto.ClientLogDto;
import com.project.omega.bean.dto.KafkaLogDto;
import com.project.omega.service.interfaces.KafkaProducerService;
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
        KafkaLogDto kafkaLog = new KafkaLogDto();
        
        kafkaLog.setFilename(log.getFilename());
        kafkaLog.setLogLevel(log.getLogLevel());
        kafkaLog.setTimestamp(log.getTimestamp());
        kafkaLog.setFilename(log.getFilename());
        kafkaLog.setLineNumber(log.getLineNumber());
        kafkaLog.setMessage(log.getMessage());
        kafkaLog.setAdditional(log.getAdditional());
        
        // We do not use the logger service since this is not a backend log.
        kafkaProducerService.sendMessage(kafkaLog);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

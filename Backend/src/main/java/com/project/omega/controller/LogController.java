package com.project.omega.controller;

import com.project.omega.bean.dto.ClientLogDto;
import com.project.omega.bean.dto.KafkaLogFrontendDto;
import com.project.omega.service.interfaces.KafkaProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/log")
public class LogController {
    private KafkaProducerService kafkaProducerService;
    
    @Autowired
    public LogController(KafkaProducerService kafkaProducerService) {
        this.kafkaProducerService = kafkaProducerService;
    }
    
    private ResponseEntity<HttpStatus> sendLog(ClientLogDto log, String source){
        KafkaLogFrontendDto kafkaLog = new KafkaLogFrontendDto();
    
        kafkaLog.setFilename(log.getFilename());
        kafkaLog.setLogLevel(log.getLevel());
        kafkaLog.setTimestamp(log.getTimestamp());
        kafkaLog.setFilename(log.getFilename());
        kafkaLog.setLineNumber(log.getLineNumber());
        kafkaLog.setMessage(log.getMessage());
        kafkaLog.setAdditional(log.getAdditional());
        kafkaLog.setContext(source);
    
        // We do not use the logger service since this is not a backend log.
        kafkaProducerService.sendMessage(kafkaLog);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @PostMapping(value = "/admin")
    public ResponseEntity<HttpStatus> createAdminLog(@RequestBody ClientLogDto log) {
        return sendLog(log, "admin_client");
    }
    
    @PostMapping(value = "/rep")
    public ResponseEntity<HttpStatus> createRepLog(@RequestBody ClientLogDto log) {
        return sendLog(log, "rep_client");
    }
}

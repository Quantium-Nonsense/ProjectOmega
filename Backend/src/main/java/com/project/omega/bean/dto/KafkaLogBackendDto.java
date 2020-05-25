package com.project.omega.bean.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class KafkaLogBackendDto extends KafkaLogDto {
    private String timestamp;
    
    public String getTimestamp() {
        return timestamp;
    }
    
    @Override
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp.format(DateTimeFormatter.ISO_DATE_TIME);
    }
    
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
    
}

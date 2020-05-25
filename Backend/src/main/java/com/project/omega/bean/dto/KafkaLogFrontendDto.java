package com.project.omega.bean.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class KafkaLogFrontendDto extends KafkaLogDto {
    private LocalDateTime timestamp;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    @Override
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}

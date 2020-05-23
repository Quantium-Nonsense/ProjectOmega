package com.project.omega.bean.dto;

import com.project.omega.enums.LogLevel;

import java.io.Serializable;
import java.time.LocalDateTime;

public class ClientLogDto implements Serializable {
    private LogLevel logLevel;
    private LocalDateTime timestamp;
    private String filename;
    private String lineNumber;
    private String message;
    private Serializable[] additional;
    
    public void setLogLevel(LogLevel logLevel) {
        this.logLevel = logLevel;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    
    public void setFilename(String filename) {
        this.filename = filename;
    }
    
    public void setLineNumber(String lineNumber) {
        this.lineNumber = lineNumber;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public void setAdditional(Serializable[] additional) {
        this.additional = additional;
    }
    
    public LogLevel getLogLevel() {
        return logLevel;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public String getFilename() {
        return filename;
    }
    
    public String getLineNumber() {
        return lineNumber;
    }
    
    public String getMessage() {
        return message;
    }
    
    public Serializable[] getAdditional() {
        return additional;
    }
}

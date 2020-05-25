package com.project.omega.bean.dto;

import ch.qos.logback.classic.Level;
import com.project.omega.enums.LogLevel;

import java.io.Serializable;
import java.time.LocalDateTime;

public abstract class KafkaLogDto implements Serializable {
    private LogLevel logLevel;
    private String threadName;
    private String filename;
    private String lineNumber;
    private String message;
    private Serializable[] additional;
    private String context;
    
    public LogLevel getLogLevel() {
        return logLevel;
    }
    
    public void setLogLevel(LogLevel logLevel) {
        this.logLevel = logLevel;
    }
    
    // Converts logback log levels to our log levels
    // Which are also the frontend levels
    public void setLogLevel(Level logLevel) {
        if (Level.TRACE.equals(logLevel)) {
            this.logLevel = LogLevel.TRACE;
        } else if (Level.DEBUG.equals(logLevel)) {
            this.logLevel = LogLevel.DEBUG;
        } else if (Level.INFO.equals(logLevel)) {
            this.logLevel = LogLevel.INFO;
        } else if (Level.WARN.equals(logLevel)) {
            this.logLevel = LogLevel.WARN;
        } else if (Level.ERROR.equals(logLevel)) {
            this.logLevel = LogLevel.ERROR;
        }
    }
    
    public String getThreadName() {
        return threadName;
    }
    
    public void setThreadName(String threadName) {
        this.threadName = threadName;
    }
    
    public abstract void setTimestamp(LocalDateTime timestamp);
    
    public String getFilename() {
        return filename;
    }
    
    public void setFilename(String filename) {
        this.filename = filename;
    }
    
    public String getLineNumber() {
        return lineNumber;
    }
    
    public void setLineNumber(String lineNumber) {
        this.lineNumber = lineNumber;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public Serializable[] getAdditional() {
        return additional;
    }
    
    public void setAdditional(Serializable[] additional) {
        this.additional = additional;
    }
    
    public String getContext() {
        return context;
    }
    
    public void setContext(String context) {
        this.context = context;
    }
}

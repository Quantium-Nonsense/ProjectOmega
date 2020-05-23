package com.project.omega.bean.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

public class ClientLogDto implements Serializable {
    public enum LogLevel {
        TRACE(0),
        DEBUG(1),
        INFO(2),
        LOG(3),
        WARN(4),
        ERROR(5),
        FATAL(6),
        OFF(7);
        
        private int numVal;
        
        LogLevel(int numVal) {
            this.numVal = numVal;
        }
    }
    
    
    private LogLevel logLevel;
    private LocalDateTime timestamp;
    private String filename;
    private String lineNumber;
    private String message;
    private Serializable[] additional;
}

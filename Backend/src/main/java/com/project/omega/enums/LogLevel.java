package com.project.omega.enums;

import com.fasterxml.jackson.annotation.JsonValue;

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
    
    @JsonValue
    public String getJSONValue() {
        switch (this) {
            case TRACE:
                return "TRACE";
            case DEBUG:
                return "DEBUG";
            case INFO:
                return "INFO";
            case LOG:
                return "LOG";
            case WARN:
                return "WARN";
            case ERROR:
                return "ERROR";
            case FATAL:
                return "FATAL";
            case OFF:
                return "OFF";
        }
        
        return "";
    }
}

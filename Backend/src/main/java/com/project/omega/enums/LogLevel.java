package com.project.omega.enums;

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

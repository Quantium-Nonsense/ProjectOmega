package com.project.omega.logger;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.classic.spi.IThrowableProxy;
import ch.qos.logback.classic.spi.StackTraceElementProxy;
import ch.qos.logback.core.AppenderBase;
import com.project.omega.bean.dto.KafkaLogDto;
import com.project.omega.service.interfaces.KafkaProducerService;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class KafkaAppender extends AppenderBase<ILoggingEvent> {
    @Autowired
    private KafkaProducerService kafkaProducerService;
    
    
    @Override
    protected void append(ILoggingEvent iLoggingEvent) {
        KafkaLogDto log = new KafkaLogDto();
        
        StringBuilder stackBuilder = new StringBuilder();
        writeStack(iLoggingEvent.getThrowableProxy(), "", stackBuilder);
        
        log.setLogLevel(iLoggingEvent.getLevel());
        log.setMessage(iLoggingEvent.getFormattedMessage());
        log.setThreadName(iLoggingEvent.getThreadName());
        log.setTimestamp(LocalDateTime.ofInstant(
                Instant.ofEpochMilli(iLoggingEvent.getTimeStamp()),
                ZoneId.systemDefault()
        ));
        log.setAdditional(new String[]{stackBuilder.toString()});
        log.setFilename(iLoggingEvent.getLoggerName());
        log.setContext("backend");
        
        kafkaProducerService.sendMessage(log);
    }
    
    
    // Stack writer from google
    private void writeStack(IThrowableProxy throwProxy, String prefix, StringBuilder payload) {
        if (throwProxy == null) {
            return;
        }
        payload
                .append(prefix)
                .append(throwProxy.getClassName())
                .append(": ")
                .append(throwProxy.getMessage())
                .append('\n');
        StackTraceElementProxy[] trace = throwProxy.getStackTraceElementProxyArray();
        if (trace == null) {
            trace = new StackTraceElementProxy[0];
        }
        
        int commonFrames = throwProxy.getCommonFrames();
        int printFrames = trace.length - commonFrames;
        for (int i = 0; i < printFrames; i++) {
            payload.append("    ").append(trace[i]).append('\n');
        }
        if (commonFrames != 0) {
            payload.append("    ... ").append(commonFrames).append(" common frames elided\n");
        }
        
        writeStack(throwProxy.getCause(), "caused by: ", payload);
    }
}

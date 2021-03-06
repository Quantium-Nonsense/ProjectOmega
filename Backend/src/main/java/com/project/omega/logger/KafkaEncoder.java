package com.project.omega.logger;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.classic.spi.IThrowableProxy;
import ch.qos.logback.classic.spi.StackTraceElementProxy;
import ch.qos.logback.core.encoder.EncoderBase;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.omega.bean.dto.KafkaLogBackendDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class KafkaEncoder extends EncoderBase<ILoggingEvent> {
    
    private Logger logger = LoggerFactory.getLogger(KafkaEncoder.class);
    
    @Override
    public byte[] encode(ILoggingEvent iLoggingEvent) {
        KafkaLogBackendDto log = new KafkaLogBackendDto();
        
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
        
        ObjectMapper objectMapper = new ObjectMapper();
        
        try {
            return objectMapper.writeValueAsBytes(log);
        } catch (JsonProcessingException e) {
            // This should not happen
            logger.error("An exception was thrown when processing this log entry {}. Using manual formatting", iLoggingEvent, e);
            return ("{ \"logLevel\": " +
                           log.getLogLevel().getJSONValue() +
                           ", \"message\": " +
                           log.getMessage() +
                           ", \"threadName\": " +
                           log.getThreadName() +
                           ", \"timestamp\": " +
                           log.getTimestamp() +
                           ", \"additional\": " +
                           log.getAdditional()[0] +
                           ", \"filename\": " +
                           log.getFilename() +
                           ", \"context\": " +
                           log.getContext() +
                           " }").getBytes();
        }
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
    
    @Override
    public byte[] headerBytes() {
        return new byte[0];
    }
    
    @Override
    public byte[] footerBytes() {
        return new byte[0];
    }
}

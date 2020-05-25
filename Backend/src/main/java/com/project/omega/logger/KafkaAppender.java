package com.project.omega.logger;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Properties;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.classic.spi.IThrowableProxy;
import ch.qos.logback.classic.spi.StackTraceElementProxy;
import ch.qos.logback.core.AppenderBase;
import com.project.omega.bean.dto.KafkaLogFrontendDto;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.config.SaslConfigs;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.kafka.support.serializer.JsonSerializer;


public class KafkaAppender extends AppenderBase<ILoggingEvent> {
    
    private String topic;
    private String bootstrapServer;
    private String loginModule;
    private String username;
    private String password;
    private String saslMechanism;
    private String securityProtocol;
    
    private Producer<String, KafkaLogFrontendDto> kafkaProducer;
    
    public String getLoginModule() {
        return loginModule;
    }
    
    public void setLoginModule(String loginModule) {
        this.loginModule = loginModule;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getSaslMechanism() {
        return saslMechanism;
    }
    
    public void setSaslMechanism(String saslMechanism) {
        this.saslMechanism = saslMechanism;
    }
    
    public String getSecurityProtocol() {
        return securityProtocol;
    }
    
    public void setSecurityProtocol(String securityProtocol) {
        this.securityProtocol = securityProtocol;
    }
    
    public String getTopic() {
        return topic;
    }
    
    public void setTopic(String topic) {
        this.topic = topic;
    }
    
    public String getBootstrapServer() {
        return bootstrapServer;
    }
    
    public void setBootstrapServer(String bootstrapServer) {
        this.bootstrapServer = bootstrapServer;
    }
    
    @Override
    public void start() {
        super.start();
        
        String jaasTemplate = "%s required username=\"%s\" password=\"%s\";";
        String jaasCfg = String.format(jaasTemplate, this.loginModule, this.username, this.password);
        
        Properties configProps = new Properties();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, this.bootstrapServer);
        configProps.put(
                ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,
                StringSerializer.class);
        configProps.put(
                ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,
                JsonSerializer.class);
        configProps.put(SaslConfigs.SASL_JAAS_CONFIG, jaasCfg);
        configProps.put(SaslConfigs.SASL_MECHANISM, this.saslMechanism);
        configProps.put(AdminClientConfig.SECURITY_PROTOCOL_CONFIG, securityProtocol);
        
        this.kafkaProducer = new KafkaProducer<>(configProps);
    }
    
    @Override
    protected void append(ILoggingEvent iLoggingEvent) {
        KafkaLogFrontendDto log = new KafkaLogFrontendDto();
        
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
        
        kafkaProducer.send(new ProducerRecord<>(topic, log));
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
    public void stop() {
        super.stop();
        kafkaProducer.close();
    }
}

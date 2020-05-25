package com.project.omega.config;

import com.project.omega.bean.dto.KafkaLogFrontendDto;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.config.SaslConfigs;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaProducerConfig {
    
    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapAddress;
    
    @Value("${spring.kafka.producer.properties.topics}")
    private String topic;
    
    @Value("${spring.kafka.jaas.login-module}")
    private String loginModule;
    
    @Value("${spring.kafka.jaas.options.username}")
    private String username;
    
    @Value("${spring.kafka.jaas.options.password}")
    private String password;
    
    @Value("${spring.kafka.jaas.options.sasl.mechanism}")
    private String saslMechanism;
    
    @Value("${spring.kafka.jaas.options.security.protocol}")
    private String securityProtocol;
    
    @Bean
    public ProducerFactory<String, KafkaLogFrontendDto> producerFactory() {
    
        String jaasTemplate = "%s required username=\"%s\" password=\"%s\";";
        String jaasCfg = String.format(jaasTemplate, this.loginModule, this.username, this.password);
    
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(
                ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,
                this.bootstrapAddress);
        configProps.put(
                ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,
                StringSerializer.class);
        configProps.put(
                ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,
                JsonSerializer.class);
        configProps.put(SaslConfigs.SASL_JAAS_CONFIG, jaasCfg);
        configProps.put(SaslConfigs.SASL_MECHANISM, this.saslMechanism);
        configProps.put(AdminClientConfig.SECURITY_PROTOCOL_CONFIG, securityProtocol);
        configProps.put("topic", topic);
        
        return new DefaultKafkaProducerFactory<>(configProps);
    }
    
    @Bean
    public KafkaTemplate<String, KafkaLogFrontendDto> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }
}
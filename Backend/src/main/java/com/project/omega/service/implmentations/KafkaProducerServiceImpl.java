package com.project.omega.service.implmentations;

import com.project.omega.service.interfaces.KafkaProducerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import com.project.omega.bean.dto.KafkaLogDto;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

@Service
public class KafkaProducerServiceImpl implements KafkaProducerService {
    
    @Autowired
    private KafkaTemplate<String, KafkaLogDto> kafkaTemplate;
    
    @Value("${spring.kafka.producer.properties.topics}")
    private String topic;
    
    @Override
    public void sendMessage(KafkaLogDto message) {
        Logger logger = LoggerFactory.getLogger(KafkaProducerServiceImpl.class);
        
        ListenableFuture<? extends SendResult<String, KafkaLogDto>> future
                = kafkaTemplate.send(topic, message);
        
        future.addCallback(new ListenableFutureCallback<SendResult<String, KafkaLogDto>>() {
            @Override
            public void onFailure(Throwable throwable) {
                logger.error("Failed to send message via Kafka: {}", throwable.getMessage());
            }
            
            @Override
            public void onSuccess(SendResult<String, KafkaLogDto> stringSendResult) {
                // do nothing
            }
        });
    }
}

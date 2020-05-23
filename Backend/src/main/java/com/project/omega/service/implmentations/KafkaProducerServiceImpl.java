package com.quantiumnonsense.omega.service.implmentations;

import com.quantiumnonsense.omega.service.interfaces.KafkaProducerService;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

import java.util.Map;

@Service
public class KafkaProducerServiceImpl implements KafkaProducerService {
    
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;
    
    @Override
    public void sendMessage(String message) {
        ListenableFuture<? extends SendResult<String, String>> future
                = kafkaTemplate.send("staging-logs", message);
        
        future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
            @Override
            public void onFailure(Throwable throwable) {
                //log to console cause failure means it can't be sent to kafka
            }
    
            @Override
            public void onSuccess(SendResult<String, String> stringSendResult) {
                // do nothing
            }
        });
    }
}

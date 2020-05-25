package com.project.omega.service.interfaces;

import com.project.omega.bean.dto.KafkaLogFrontendDto;

public interface KafkaProducerService {
    public void sendMessage(KafkaLogFrontendDto message);
}

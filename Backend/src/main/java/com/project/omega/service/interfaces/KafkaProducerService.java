package com.project.omega.service.interfaces;

import com.project.omega.bean.dto.KafkaLogDto;

public interface KafkaProducerService {
    public void sendMessage(KafkaLogDto message);
}

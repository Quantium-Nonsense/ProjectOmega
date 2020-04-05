package com.project.omega.service;

import com.project.omega.bean.Industry;
import com.project.omega.exceptions.NoRecordsFoundException;

import java.util.List;

public interface IndustryService {

boolean createIndustry (Industry industry);
List<Industry> getAllIndustry();
Industry getIndustryById(Long id) throws NoRecordsFoundException;
boolean deleteIndustryById(Long id);
boolean updateIndustry(Long id, Industry newIndustry);
}

package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.entity.Industry;
import com.project.omega.exceptions.DuplicateIndustryException;
import com.project.omega.exceptions.IndustryNotFoundException;
import com.project.omega.exceptions.NoRecordsFoundException;

import java.util.List;

public interface IndustryService {

    Industry createIndustry (Industry industry) throws DuplicateIndustryException;
    List<Industry> getAllIndustry() throws NoRecordsFoundException;
    Industry getIndustryById(Long id) throws NoRecordsFoundException;
    Industry getIndustryByName(String name) throws NoRecordsFoundException;
    Industry deleteIndustryById(Long id) throws IndustryNotFoundException;
    Industry updateIndustry(Long id, Industry newIndustry) throws Exception;
}

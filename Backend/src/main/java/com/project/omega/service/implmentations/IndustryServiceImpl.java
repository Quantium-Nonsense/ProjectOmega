package com.project.omega.service.implmentations;

import com.project.omega.bean.dao.entity.*;
import com.project.omega.exceptions.*;

import com.project.omega.helper.Constant;
import com.project.omega.repository.IndustryRepository;
import com.project.omega.service.interfaces.IndustryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class IndustryServiceImpl implements IndustryService {

    @Autowired
    IndustryRepository industryRepository;

    public Industry createIndustry(Industry industry) throws DuplicateIndustryException {
        if(industryRepository.existsByName(industry.getName())) {
            throw new DuplicateIndustryException(Constant.ERROR_INDUSTRY_EXISTS + industry.getName());
        }
        industryRepository.save(industry);
        return industry;
    }

    public List<Industry> getAllIndustry() throws NoRecordsFoundException
    {
        List<Industry> industries = (List) industryRepository.findAll();
        if(industries.isEmpty()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_RECORDS);
        }
        return industries;
    }

    public Industry getIndustryById(Long id) throws NoRecordsFoundException {
        Optional<Industry> industry = industryRepository.findById(id);
        if(!industry.isPresent()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_RECORDS);
        }
        return industry.get();
    }

    public Industry deleteIndustryById(Long id) throws IndustryNotFoundException
    {
        Optional<Industry> industry = industryRepository.findById(id);
        if(!industry.isPresent())
        {
            throw new IndustryNotFoundException(Constant.ERROR_INDUSTRY_NOT_FOUND + id);
        }
        industryRepository.deleteById(id);
        return industry.get();
    }

    public Industry getIndustryByName(String name) throws NoRecordsFoundException {
        Optional<Industry> industry = industryRepository.findByName(name);
        if (!industry.isPresent()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_RECORDS);
        }
        return industry.get();
    }

    public Industry updateIndustry(Long id, Industry newIndustry) throws Exception
    {
        Optional<Industry> industry = industryRepository.findById(id);
        if(!industry.isPresent())
        {
            throw new IndustryNotFoundException(Constant.ERROR_INDUSTRY_NOT_FOUND + id);
        }
        if(newIndustry.getName() != null && newIndustry.getDescription() != null)
        {
            Industry i = new Industry.IndustryBuilder()
                    .setId(id)
                    .setName(newIndustry.getName())
                    .setDescription(newIndustry.getDescription())
                    .setUser(newIndustry.getUser())
                    .build();
            industryRepository.save(newIndustry);
            return newIndustry;
        }
        else
            throw new RuntimeException("Null values detected.");
    }






}

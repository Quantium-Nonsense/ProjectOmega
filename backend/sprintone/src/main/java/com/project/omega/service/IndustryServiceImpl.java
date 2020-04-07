package com.project.omega.service;

import com.project.omega.bean.Industry;
import com.project.omega.exceptions.DuplicateIndustryException;
import com.project.omega.exceptions.IndustryNotFoundException;
import com.project.omega.exceptions.NoRecordsFoundException;

import com.project.omega.helper.Constant;
import com.project.omega.repository.IndustryRepository;
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

    public Industry createIndustry (Industry industry) throws DuplicateIndustryException
    {
        if (industryRepository.existsByIndustryName(industry.getIndustryName()))
        {
            throw new DuplicateIndustryException(Constant.ERROR_INDUSTRY_EXISTS + industry.getId());
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
    public Industry updateIndustry(Long id, Industry newIndustry) throws Exception
    {
        Optional<Industry> industry = industryRepository.findById(id);
        if(!industry.isPresent())
        {
            throw new IndustryNotFoundException(Constant.ERROR_INDUSTRY_NOT_FOUND + id);
        }
        if(newIndustry.getIndustryName() != null && newIndustry.getDescription() != null)
        {
            newIndustry.setId(id);
            industryRepository.save(newIndustry);
            return newIndustry;
        }
        else
            throw new RuntimeException("Null values detected.");
    }
}

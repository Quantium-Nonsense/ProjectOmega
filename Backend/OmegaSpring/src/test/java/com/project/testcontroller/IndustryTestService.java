package com.project.testcontroller;

import com.project.OmegaApplicationTests;
import com.project.omega.bean.dao.entity.Industry;
import com.project.omega.exceptions.DuplicateIndustryException;
import com.project.omega.exceptions.IndustryNotFoundException;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.helper.Constant;
import com.project.omega.repository.IndustryRepository;
import com.project.omega.service.interfaces.IndustryService;
import com.project.omega.service.implmentations.IndustryServiceImpl;
import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RunWith(SpringRunner.class)
@SpringBootTest
public class IndustryTestService extends OmegaApplicationTests {
    @Mock
    private IndustryRepository industryRepository;

    @InjectMocks
    private IndustryService industryService = new IndustryServiceImpl();

    @Test
    @DisplayName("Test for adding an industry.")
    public void createIndustry_Positive() throws DuplicateIndustryException, NoRecordsFoundException {
        Industry industry = new Industry.IndustryBuilder()
                .setId(1L)
                .setName("pharmaceuticals")
                .setDescription("Distribution of pharmaceutical products.")
                .build();
        Mockito.when(industryRepository.save(Mockito.any(Industry.class))).thenReturn(industry);
        Mockito.when(industryRepository.findAll()).thenReturn(Stream.of(industry).collect(Collectors.toList()));
        Assert.assertEquals(industry.getName(), industryService.createIndustry(industry).getName());
        Assert.assertEquals(industry.getName(), industryService.getAllIndustry().get(0).getName());
    }

    @Test
    @DisplayName("Test for trying to add existing industry")
    public void createIndustry_Negative() throws DuplicateIndustryException, NoRecordsFoundException {
        Industry industry_one = new Industry.IndustryBuilder()
                .setId(1L)
                .setName("pharmaceuticals")
                .setDescription("Distribution of pharmaceutical products.")
                .build();
        Industry industry_two = new Industry.IndustryBuilder()
                .setId(2L)
                .setName("pharmaceuticals")
                .setDescription("Distribution of drugs, wink wink..")
                .build();
        Mockito.when(industryRepository.existsByName(Mockito.anyString())).thenReturn(true);
        Mockito.when(industryRepository.findAll()).thenReturn(Stream.of(industry_two).collect(Collectors.toList()));
        try {
            industryService.createIndustry(industry_one);
        } catch (Exception e) {
            Assert.assertEquals(industry_one.getName(), industryService.getAllIndustry().get(0).getName());
            Assert.assertEquals(e.getMessage(), Constant.ERROR_INDUSTRY_EXISTS + industry_one.getName());
        }

    }

    @Test
    @DisplayName("Test for getting all existing industries.")
    public void getAllIndustry_Positive() throws NoRecordsFoundException {
        Industry industry_one = new Industry.IndustryBuilder()
                .setId(1L)
                .setName("pharmaceuticals")
                .setDescription("Distribution of pharmaceutical products.")
                .build();
        Industry industry_two = new Industry.IndustryBuilder()
                .setId(2L)
                .setName("alcohol")
                .setDescription("No description required here...")
                .build();
        Mockito.when(industryRepository.findAll()).thenReturn(Stream.of(industry_one, industry_two).collect(Collectors.toList()));
        Assert.assertEquals(2, industryService.getAllIndustry().size());
    }

    @Test
    @DisplayName("Test for getting all existing industries.")
    public void getAllIndustry_Negative() throws NoRecordsFoundException {
        Mockito.when(industryRepository.findAll()).thenReturn(new ArrayList<Industry>());
        try {
            industryService.getAllIndustry();
        } catch (Exception e) {
            Assert.assertEquals(0, industryRepository.findAll().size());
            Assert.assertEquals(e.getMessage(), Constant.ERROR_NO_RECORDS);
        }
    }

    @Test
    @DisplayName("Test for finding an industry by id.")
    public void getIndustryById_Positive() throws NoRecordsFoundException {
        Industry industry_one = new Industry.IndustryBuilder()
                .setId(1L)
                .setName("pharmaceuticals")
                .setDescription("Distribution of pharmaceutical products.")
                .build();
        Mockito.when(industryRepository.findById(1L)).thenReturn(Optional.of(industry_one));
        Assert.assertEquals("pharmaceuticals", industryService.getIndustryById(1L).getName());
    }

    @Test
    @DisplayName("Test for trying to find a non-existing user by id.")
    public void getIndustryById_Negative() throws NoRecordsFoundException {
        Industry industry_one = new Industry.IndustryBuilder()
                .setId(1L)
                .setName("pharmaceuticals")
                .setDescription("Distribution of pharmaceutical products.")
                .build();
        Mockito.when(industryRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        Mockito.when(industryRepository.findAll()).thenReturn(Stream.of(industry_one).collect(Collectors.toList()));
        try {
            industryService.getIndustryById(2L);
        } catch (Exception e) {
            Assert.assertEquals(Constant.ERROR_NO_RECORDS, e.getMessage());
            Assert.assertFalse(industryService.getAllIndustry().get(0).getId().equals(2L));
        }
    }

    @Test
    @DisplayName("Test for finding an industry by name.")
    public void getIndustryByName_Positive() throws NoRecordsFoundException {
        Industry industry_one = new Industry.IndustryBuilder()
                .setId(1L)
                .setName("pharmaceuticals")
                .setDescription("Distribution of pharmaceutical products.")
                .build();
        Mockito.when(industryRepository.findByName(Mockito.anyString())).thenReturn(Optional.of(industry_one));
        Assert.assertEquals(industry_one.getName(), industryService.getIndustryByName("pharmaceuticals").getName());
    }

    @Test
    @DisplayName("Test for trying to find a non-existing user by name.")
    public void getIndustryByName_Negative() throws NoRecordsFoundException {
        Industry industry_one = new Industry.IndustryBuilder()
                .setId(1L)
                .setName("pharmaceuticals")
                .setDescription("Distribution of pharmaceutical products.")
                .build();
        Mockito.when(industryRepository.findByName(Mockito.anyString())).thenReturn(Optional.empty());
        Mockito.when(industryRepository.findAll()).thenReturn(Stream.of(industry_one).collect(Collectors.toList()));
        try {
            industryService.getIndustryByName("alcohol");
        } catch (Exception e) {
            Assert.assertEquals(Constant.ERROR_NO_RECORDS, e.getMessage());
            Assert.assertFalse(industryService.getAllIndustry().get(0).getName().equals("alcohol"));
        }
    }

    @Test
    @DisplayName("Test for successful industry deletion.")
    public void deleteIndustryById_Positive() throws IndustryNotFoundException {
        Industry industry_one = new Industry.IndustryBuilder()
                .setId(1L)
                .setName("pharmaceuticals")
                .setDescription("Distribution of pharmaceutical products.")
                .build();
        Mockito.when(industryRepository.findById(1L)).thenReturn(Optional.of(industry_one));
        industryService.deleteIndustryById(1L);
        Mockito.verify(industryRepository, Mockito.times(1)).deleteById(1L);
    }

    @Test
    @DisplayName("Test for updating an industry.")
    public void updateIndustry_Positive() throws Exception {
        Industry industry_one = new Industry.IndustryBuilder()
                .setId(1L)
                .setName("pharmaceuticals")
                .setDescription("Distribution of pharmaceutical products.")
                .build();
        Industry industry_detail = new Industry.IndustryBuilder()
                .setId(1L)
                .setName("pharma")
                .setDescription("Distribution of pharmaceutical products and recreational marijuana.")
                .build();
        Mockito.when(industryRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(industry_one));
        Mockito.when(industryRepository.save(Mockito.any(Industry.class))).thenReturn(industry_detail);
        Assert.assertEquals(industry_detail.getName(), industryService.updateIndustry(1L, industry_detail).getName());
    }
}

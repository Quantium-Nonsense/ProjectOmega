package com.project.testcontroller;

import com.project.OmegaApplicationTests;
import com.project.omega.bean.Industry;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.helper.Constant;
import com.project.omega.repository.IndustryRepository;
import com.project.omega.service.IndustryService;
import com.project.omega.service.IndustryServiceImpl;
import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

@RunWith(SpringRunner.class)
@SpringBootTest
public class IndustryTestService extends OmegaApplicationTests {
    @Mock
    private IndustryRepository industryRepository;

    @InjectMocks
    private IndustryService industryService = new IndustryServiceImpl();

    @Test
    @DisplayName("Test for adding an industry.")
    public void createIndustry_Positive() {
        Industry industry = new Industry.IndustryBuilder()
                .setId(1L)
                .setName("pharmaceuticals")
                .setDescription("Distribution of pharmaceutical products.")
                .build();
        Mockito.when(industryRepository.save(Mockito.any(Industry.class))).thenReturn(industry);
        Mockito.when(industryRepository.findAll()).thenReturn(List.of(industry));
        Assert.assertTrue(industryService.createIndustry(industry));
        Assert.assertEquals(industry.getName(), industryService.getAllIndustry().get(0).getName());
    }

    @Test
    @DisplayName("Test for trying to add existing industry")
    public void createIndustry_Negative() {
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
        Mockito.when(industryRepository.findAll()).thenReturn(List.of(industry_one));
        Mockito.when(industryRepository.existsByName(Mockito.anyString())).thenReturn(true);
        Assert.assertFalse(industryService.createIndustry(industry_one));
        Assert.assertEquals(industry_two.getName(), industryService.getAllIndustry().get(0).getName());
    }

    @Test
    @DisplayName("Test for getting all existing industries.")
    public void getAllIndustry_Positive() {
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
        Mockito.when(industryRepository.findAll()).thenReturn(List.of(industry_one, industry_two));
        Assert.assertEquals(2, industryService.getAllIndustry().size());
    }

    @Test
    @DisplayName("Test for getting all existing industries.")
    public void getAllIndustry_Negative() {
        Mockito.when(industryRepository.findAll()).thenReturn(List.of());
        Assert.assertEquals(0, industryService.getAllIndustry().size());
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
    public void getIndustryById_Negative() {
        Industry industry_one = new Industry.IndustryBuilder()
                .setId(1L)
                .setName("pharmaceuticals")
                .setDescription("Distribution of pharmaceutical products.")
                .build();
        Mockito.when(industryRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        Mockito.when(industryRepository.findAll()).thenReturn(List.of(industry_one));
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
    public void getIndustryByName_Negative() {
        Industry industry_one = new Industry.IndustryBuilder()
                .setId(1L)
                .setName("pharmaceuticals")
                .setDescription("Distribution of pharmaceutical products.")
                .build();
        Mockito.when(industryRepository.findByName(Mockito.anyString())).thenReturn(Optional.empty());
        Mockito.when(industryRepository.findAll()).thenReturn(List.of(industry_one));
        try {
            industryService.getIndustryByName("alcohol");
        } catch (Exception e) {
            Assert.assertEquals(Constant.ERROR_NO_RECORDS, e.getMessage());
            Assert.assertFalse(industryService.getAllIndustry().get(0).getName().equals("alcohol"));
        }
    }

    @Test
    @DisplayName("Test for successful industry deletion.")
    public void deleteIndustryById_Positive() {
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
    public void updateIndustry_Positive() {
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
        industry_detail.setId(null);
        Assert.assertEquals(true, industryService.updateIndustry(1L, industry_detail));
    }
}

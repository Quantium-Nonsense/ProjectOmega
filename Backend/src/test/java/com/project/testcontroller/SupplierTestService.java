package com.project.testcontroller;

import com.project.OmegaApplicationTests;
import com.project.omega.bean.dao.entity.Supplier;
import com.project.omega.repository.SupplierRepository;
import com.project.omega.service.implmentations.SupplierServiceImpl;
import com.project.omega.service.interfaces.SupplierService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SupplierTestService extends OmegaApplicationTests {
    @Mock
    private SupplierRepository supplierRepository;

    @InjectMocks
    private SupplierService supplierService = new SupplierServiceImpl();

    @Test
    public void createSupplier() {
        Supplier supplier = new Supplier.SupplierBuilder()
                .setId(1L)
                .setFirstName("John")
                .setLastName("Doe")
                .setCompanyName("GSK")
                .setAddress("somewhere")
                .setPostcode("LL1 1LL")
                .setTown("Nowheresville")
                .setCounty("Buckinghamshire")
                .setCountry("England")
                .setEmail("J.Doe@GSK.co.uk")
                .setDescription("Glaxo")
                .setContactNumber("01352700100")
                .setNotes("Provides drugs")
                .build();

        Mockito.when(supplierRepository.save(Mockito.any(Supplier.class))).thenReturn(supplier);
        Assert.assertEquals(supplier.getEmail(), supplierService.addSupplier(supplier).getEmail());
    }

    @Test
    public void getSuppliers_Positive() throws Exception {
        Supplier supplier_one = new Supplier.SupplierBuilder()
                .setId(1L)
                .setFirstName("John")
                .setLastName("Doe")
                .setCompanyName("GSK")
                .setAddress("somewhere")
                .setPostcode("LL1 1LL")
                .setTown("Nowheresville")
                .setCounty("Buckinghamshire")
                .setCountry("England")
                .setEmail("J.Doe@GSK.co.uk")
                .setDescription("Glaxo")
                .setContactNumber("01352700100")
                .setNotes("Provides drugs")
                .build();

        Supplier supplier_two = new Supplier.SupplierBuilder()
                .setId(2L)
                .setFirstName("Jane")
                .setLastName("Smith")
                .setCompanyName("Pfizer")
                .setAddress("nowhere")
                .setPostcode("CH2 2CH")
                .setTown("Somewheresville")
                .setCounty("Cheshire")
                .setCountry("England")
                .setEmail("J.Smith@Pfizer.com")
                .setDescription("Fizzy")
                .setContactNumber("01352100700")
                .setNotes("Provides different drugs")
                .build();

        Mockito.when(supplierRepository.findAll()).thenReturn(Stream.of(supplier_one, supplier_two).collect(Collectors.toList()));
        Mockito.when(supplierRepository.findById(1L)).thenReturn(Optional.of(supplier_one));
        Mockito.when(supplierRepository.findById(2L)).thenReturn(Optional.of(supplier_two));
        Mockito.when(supplierRepository.findByCompanyName("GSK")).thenReturn(Optional.of(supplier_one));
        Mockito.when(supplierRepository.findByCompanyName("Pfizer")).thenReturn(Optional.of(supplier_two));
        Mockito.when(supplierRepository.existsByCompanyName(Mockito.anyString())).thenReturn(true);

        Assert.assertEquals(2, supplierRepository.findAll().size());
        Assert.assertTrue(supplierRepository.existsByCompanyName(supplier_one.getCompanyName()));
        Assert.assertTrue(supplierRepository.existsByCompanyName(supplier_two.getCompanyName()));
        Assert.assertEquals(supplier_one, supplierService.getSupplierById(1L));
        Assert.assertEquals(supplier_two, supplierService.getSupplierById(2L));
        Assert.assertEquals(supplier_one.getCompanyName(), supplierService.getSupplierByName(supplier_one.getCompanyName()).getCompanyName());
        Assert.assertEquals(supplier_two.getCompanyName(), supplierService.getSupplierByName(supplier_two.getCompanyName()).getCompanyName());
    }

    public void getSuppliers_Negative() throws Exception {
        List<Supplier> empty = new ArrayList<>();

        Mockito.when(supplierRepository.findAll()).thenReturn(empty);

        try {
            supplierService.getAllSuppliers();
        } catch (Exception e) {
            Assert.assertEquals(0, supplierRepository.findAll().size());
        }

        Mockito.when(supplierRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            supplierService.getSupplierById(1L);
        } catch (Exception e) {
            Assert.assertEquals(0, supplierRepository.findAll().size());
        }

        Mockito.when(supplierRepository.findByCompanyName(Mockito.anyString())).thenReturn(Optional.empty());

        try {
            supplierService.getSupplierByName("GSK");
        } catch (Exception e) {
            Assert.assertEquals(0, supplierRepository.findAll().size());
        }
    }

    @Test
    public void updateSupplier_Positive() throws Exception {
        Supplier supplier_old = new Supplier.SupplierBuilder()
                .setId(1L)
                .setFirstName("John")
                .setLastName("Doe")
                .setCompanyName("GSK")
                .setAddress("somewhere")
                .setPostcode("LL1 1LL")
                .setTown("Nowheresville")
                .setCounty("Buckinghamshire")
                .setCountry("England")
                .setEmail("J.Doe@GSK.co.uk")
                .setDescription("Glaxo")
                .setContactNumber("01352700100")
                .setNotes("Provides drugs")
                .build();

        Supplier supplier_new = new Supplier.SupplierBuilder()
                .setId(1L)
                .setFirstName("John")
                .setLastName("Doe")
                .setCompanyName("GSK")
                .setAddress("somewhere")
                .setPostcode("LL1 1LL")
                .setTown("Nowheresville")
                .setCounty("Buckinghamshire")
                .setCountry("England")
                .setEmail("J.Doe@GSK.co.uk")
                .setDescription("Glaxo")
                .setContactNumber("01352700100")
                .setNotes("Stole my drugs")
                .build();

        Mockito.when(supplierRepository.findById(1L)).thenReturn(Optional.of(supplier_old));
        Assert.assertEquals(supplier_old, supplierService.updateSupplierById(1L, supplier_new));
        Mockito.when(supplierRepository.findById(1L)).thenReturn(Optional.of(supplier_new));
        Assert.assertEquals(supplier_new, supplierService.updateSupplierById(1L, supplier_old));

    }

    @Test
    public void updateSupplier_Negative() {
        Supplier supplier_new = new Supplier.SupplierBuilder()
                .setId(1L)
                .setFirstName("John")
                .setLastName("Doe")
                .setCompanyName("GSK")
                .setAddress("somewhere")
                .setPostcode("LL1 1LL")
                .setTown("Nowheresville")
                .setCounty("Buckinghamshire")
                .setCountry("England")
                .setEmail("J.Doe@GSK.co.uk")
                .setDescription("Glaxo")
                .setContactNumber("01352700100")
                .setNotes("Stole my drugs")
                .build();

        List<Supplier> empty = new ArrayList<>();

        Mockito.when(supplierRepository.findAll()).thenReturn(empty);
        Mockito.when(supplierRepository.findById(1L)).thenReturn(Optional.empty());

        try {
            supplierService.updateSupplierById(1L, supplier_new);
        } catch (Exception e) {
            Assert.assertEquals(0, supplierRepository.findAll().size());
        }
    }

    @Test
    public void deleteSupplier_Positive() throws Exception {
        Supplier supplier = new Supplier.SupplierBuilder()
                .setId(1L)
                .setFirstName("John")
                .setLastName("Doe")
                .setCompanyName("GSK")
                .setAddress("somewhere")
                .setPostcode("LL1 1LL")
                .setTown("Nowheresville")
                .setCounty("Buckinghamshire")
                .setCountry("England")
                .setEmail("J.Doe@GSK.co.uk")
                .setDescription("Glaxo")
                .setContactNumber("01352700100")
                .setNotes("Provides drugs")
                .build();

        Mockito.when(supplierRepository.findById(1L)).thenReturn(Optional.of(supplier));
        Assert.assertEquals(supplier, supplierService.deleteSupplierById(supplier.getId()));

    }

    @Test
    public void deleteSupplier_Negative() throws Exception {
        List<Supplier> empty = new ArrayList<>();

        Mockito.when(supplierRepository.findAll()).thenReturn(empty);
        Mockito.when(supplierRepository.findById(1L)).thenReturn(Optional.empty());

        try {
            supplierService.deleteSupplierById(1L);
        } catch (Exception e) {
            Assert.assertEquals(0, supplierRepository.findAll().size());
        }
    }


}

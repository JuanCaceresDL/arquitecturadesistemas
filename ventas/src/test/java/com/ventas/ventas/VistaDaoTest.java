package com.ventas.ventas;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import com.ventas.ventas.vista.*;

import org.junit.jupiter.api.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

class VistaDaoTest {

    private VistaDao dao;

    @BeforeEach
    void setUp() throws Exception{
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl("jdbc:oracle:thin:@localhost:1521:xe");
        dataSource.setUsername("system");
        dataSource.setPassword("admin");
        dataSource.setDriverClassName("oracle.jdbc.OracleDriver");

        dao = new VistaDao(new JdbcTemplate(dataSource));
    }

    @Test
    void testListVentaTel(){
        List<Vista> lista = dao.listVentatel();
        assertTrue(!lista.isEmpty());
    }

    @Test
    void testListVentaMes(){
        List<Vista> lista = dao.listVentames();
        assertTrue(!lista.isEmpty());
    }

    @Test
    void testListGananciaMes(){
        List<Vista> lista = dao.listGananciames();
        assertTrue(!lista.isEmpty());
    }
    
}

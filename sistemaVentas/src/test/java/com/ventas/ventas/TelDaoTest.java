package com.ventas.ventas;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import com.ventas.ventas.telefonos.*;

import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

class TelDaoTest {
    
    private TelDao dao;

    @BeforeEach
    void setUp() throws Exception{
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl("jdbc:oracle:thin:@localhost:1521:xe");
        dataSource.setUsername("system");
        dataSource.setPassword("admin");
        dataSource.setDriverClassName("oracle.jdbc.OracleDriver");

        dao = new TelDao(new JdbcTemplate(dataSource));
    }
    
    @Test
	void testList() {
        List<Telefono> lista = dao.list();
        assertTrue(!lista.isEmpty());
	}

    @Test
	void testListMarcas() {
        List<Telefono> lista = dao.listMarcas();
        assertTrue(!lista.isEmpty());
	}

    @Test
	void testListFotos() {
        List<Telefono> lista = dao.listFotos("H1");
        assertTrue(!lista.isEmpty());
	}

    @Test
    void testGet() {
        Telefono telefono = dao.get("H1");
        assertNotNull(telefono);
    }
}

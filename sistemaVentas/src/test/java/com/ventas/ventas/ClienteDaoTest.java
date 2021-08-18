package com.ventas.ventas;
//comentario extra
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.sql.Date;
import java.util.List;

import com.ventas.ventas.clientes.*;

import org.junit.jupiter.api.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

class ClienteDaoTest {

    private ClienteDao dao;

    @BeforeEach
    void setUp() throws Exception{
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl("jdbc:oracle:thin:@localhost:1521:xe");
        dataSource.setUsername("system");
        dataSource.setPassword("admin");
        dataSource.setDriverClassName("oracle.jdbc.OracleDriver");

        dao = new ClienteDao(new JdbcTemplate(dataSource));
    }
    
    @Test
	void testList() {
        List<ModeloCliente> lista = dao.list();
        assertTrue(!lista.isEmpty());
	}

    @Test
    void testSave() {
        ModeloCliente cliente = new ModeloCliente(177013, "test", "test@gmail.com", 177013, "http://test.com", 1, "test", Date.valueOf("2022-01-01"), (float)0.1);
        dao.save(cliente);
    }

    @Test
    void testGet() {
        ModeloCliente cliente = dao.get(1);
        assertNotNull(cliente);
    }

    @Test
    void testUpdate() {
        ModeloCliente fabrica = new ModeloCliente(177013, "test2", "test2@gmail.com", 177013, "http://test.com", 2, "test", Date.valueOf("2023-01-01"), (float)0.1);
        dao.update(fabrica);
    }

    @Test
    void testDelete() {
        dao.delete(177013);
    }
}

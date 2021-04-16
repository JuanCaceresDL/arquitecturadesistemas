package com.ventas.ventas;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import com.ventas.ventas.fabricas.*;

import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@SpringBootTest
class FabDaoTest {

    private FabDao dao;

    @BeforeEach
    void setUp() throws Exception{
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl("jdbc:oracle:thin:@localhost:51521:xe");
        dataSource.setUsername("system");
        dataSource.setPassword("mysecurepassword");
        dataSource.setDriverClassName("oracle.jdbc.OracleDriver");

        dao = new FabDao(new JdbcTemplate(dataSource));
    }
    
    @Test
	void testList() {
        List<Fabricante> lista = dao.list();
        assertTrue(!lista.isEmpty());
	}

    @Test
    void testSave() {
        Fabricante fabrica = new Fabricante(1, "test", 177013, "177.01.3");
        dao.save(fabrica);
    }

    @Test
    void testGet() {
        Fabricante fabrica = dao.get(1);
        assertNotNull(fabrica);
    }

    @Test
    void testUpdate() {
        Fabricante fabrica = new Fabricante(1, "test2", 177013, "177.01.3");
        dao.update(fabrica);
    }

    @Test
    void testDelete() {
        dao.delete(64);
    }
}

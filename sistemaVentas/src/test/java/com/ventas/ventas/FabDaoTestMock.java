package com.ventas.ventas;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;

import java.io.IOException;
import java.util.List;

import com.ventas.ventas.fabricas.*;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

public class FabDaoTestMock extends VentasApplicationTests{

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Autowired(required = true)
    private FabDao dao;

    private FabDao dao2;

    @BeforeEach
    void setUp() throws Exception{
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl("jdbc:oracle:thin:@localhost:51521:xe");
        dataSource.setUsername("system");
        dataSource.setPassword("mysecurepassword");
        dataSource.setDriverClassName("oracle.jdbc.OracleDriver");
        dao2 = new FabDao(new JdbcTemplate(dataSource));

        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        dao = mock(FabDao.class);
    }
    
    @Test
	public void testList() {
        List<Fabricante> lista = dao2.list();
        assertTrue(!lista.isEmpty());
	}

    @Test
    public void testSave() throws IOException{
        Fabricante fabrica = new Fabricante(1, "test", 177013, "177.01.3");
        dao.save(fabrica);
    }

    @Test
    void testGet() {
        Fabricante fabrica = dao2.get(1);
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

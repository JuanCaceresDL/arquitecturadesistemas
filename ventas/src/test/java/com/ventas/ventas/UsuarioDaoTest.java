package com.ventas.ventas;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import com.ventas.ventas.users.*;

import org.junit.jupiter.api.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

class UsuarioDaoTest {

    private UsuarioDao dao;

    @BeforeEach
    void setUp() throws Exception{
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl("jdbc:oracle:thin:@localhost:51521:xe");
        dataSource.setUsername("system");
        dataSource.setPassword("mysecurepassword");
        dataSource.setDriverClassName("oracle.jdbc.OracleDriver");

        dao = new UsuarioDao(new JdbcTemplate(dataSource));
    }

    //LOG-------------------

    @Test
    void testNewLog() {
        dao.newLog("Test", 1, "TEST");
    }

    @Test
    void testListAccion(){
        List<Acciones> lista = dao.listAccion();
        assertTrue(!lista.isEmpty());
    }

    //LOGIN----------------------------------------

    @Test
    void testLogIn() {
        Usuario usuario = dao.logIn("admin", "admin");
        assertNotNull(usuario);
    }
    
    //USUARIO CRUD----------------------------------

    @Test
	void testList() {
        List<Usuario> lista = dao.list();
        assertTrue(!lista.isEmpty());
	}

    @Test
	void testRol() {
        List<Usuario> lista = dao.list();
        assertTrue(!lista.isEmpty());
	}

    @Test
    void testSave() {
        Usuario usuario = new Usuario(0, "test", 1, "admin", "test");
        dao.save(usuario);
    }

    @Test
    void testGet() {
        Usuario usuario = dao.get(1);
        assertNotNull(usuario);
    }

    @Test
    void testUpdate() {
        Usuario usuario = new Usuario(61, "test2", 2, "vendedaor", "test");
        dao.update(usuario);
    }

    @Test
    void testDelete() {
        dao.delete(61);
    }
}

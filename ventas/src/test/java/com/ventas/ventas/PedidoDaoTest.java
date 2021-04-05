package com.ventas.ventas;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import com.ventas.ventas.pedidos.*;
import com.ventas.ventas.telefonos.Telefono;

import org.junit.jupiter.api.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

class PedidoDaoTest {

    private PedidoDao dao;
    private Pedido pedido = new Pedido(1, new Telefono("H1", 100), "contado");
    private Orden orden = new Orden(0, 190, 19, 171);

    @BeforeEach
    void setUp() throws Exception{
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl("jdbc:oracle:thin:@localhost:51521:xe");
        dataSource.setUsername("system");
        dataSource.setPassword("mysecurepassword");
        dataSource.setDriverClassName("oracle.jdbc.OracleDriver");

        dao = new PedidoDao(new JdbcTemplate(dataSource));
    }

    @Test
    void testListOrden(){
        List<Orden> lista = dao.listOrden();
        assertTrue(!lista.isEmpty());
    }

    @Test
    void testListPedido(){
        List<Pedido> lista = dao.listPedido("61");
        assertTrue(!lista.isEmpty());
    }

    @Test
    void testGenerarOrden() {
        dao.generarOrden(orden);
    }

    @Test
    void testGetLast() {
        Orden last = dao.getLast(0);
        assertEquals(81, last.getOrdenid());
    }

    @Test
    void testSavePedido() {
        pedido.terminar((float) 0.1);
        pedido.setOrdenid(81);
        dao.savePedido(pedido);
    }

    @Test
    void testCancelar() {
        dao.cancelar(101);
    }

    @Test
    void testRecibir() {
        dao.recibir(101);
    }
    
}

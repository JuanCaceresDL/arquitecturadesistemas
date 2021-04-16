package com.ventas.ventas.pedidos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

@Repository
public class PedidoDao {
    private String dbuser = "";
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public PedidoDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public List<Orden> listOrden(){
        String sql = "SELECT * FROM "+ dbuser +"ORDENES ORDER BY FECHA DESC";
        return jdbcTemplate.query(sql,BeanPropertyRowMapper.newInstance(Orden.class));
    }

    public List<Pedido> listPedido(String ordenid){
        String sql = "SELECT * FROM "+ dbuser +"COMPRAS WHERE ORDENID = "+ ordenid +" ORDER BY COMPRAID";
        return jdbcTemplate.query(sql,BeanPropertyRowMapper.newInstance(Pedido.class));
    }

    public List<Pedido> listPedidosByFabrica(int fabrica){
        String sql = "SELECT TELCODIGO, SUM(CANTIDAD) CANTIDAD, SUM(TOTAL) TOTAL FROM ( SELECT * FROM COMPRAS JOIN (SELECT ORDENID, FECHA FROM ORDENES) USING(ORDENID) WHERE TRUNC(CURRENT_TIMESTAMP) = TRUNC(FECHA)) JOIN TELEFONOS USING(TELCODIGO) WHERE FABRICAID = " + fabrica + " GROUP BY TELCODIGO";
        return jdbcTemplate.query(sql,BeanPropertyRowMapper.newInstance(Pedido.class));
    }

    public List<Compra> getListByClient(int nit){
        String sql = "SELECT * FROM "+ dbuser +"COMPRAS JOIN ORDENES USING(ORDENID) WHERE NIT = " + nit + " AND EXTRACT(MONTH FROM FECHA) = EXTRACT(MONTH FROM CURRENT_TIMESTAMP) AND EXTRACT(YEAR FROM FECHA) = EXTRACT(YEAR FROM CURRENT_TIMESTAMP)";
        return jdbcTemplate.query(sql,BeanPropertyRowMapper.newInstance(Compra.class));
    }

    public void savePedido(Pedido nuevo) {
        SimpleJdbcInsert insertActor = new SimpleJdbcInsert(jdbcTemplate);
        insertActor.withTableName("compras").usingColumns("ordenid","telcodigo","cantidad", "descuento", "subtotal", "total", "estado");
        BeanPropertySqlParameterSource param = new BeanPropertySqlParameterSource(nuevo);
        insertActor.execute(param);    
    }

    public Orden get(int id) {
		String sql = "SELECT * FROM "+ dbuser +"ORDENES WHERE ORDENID = ?";
		Object[] args = {id};
		Orden orden = jdbcTemplate.queryForObject(sql, args, BeanPropertyRowMapper.newInstance(Orden.class));
		return orden;
	}

    public void generarOrden(Orden orden){
        SimpleJdbcInsert insertActor = new SimpleJdbcInsert(jdbcTemplate);
        insertActor.withTableName("ordenes").usingColumns("nit","fecha","total", "descuento", "subtotal");
        BeanPropertySqlParameterSource param = new BeanPropertySqlParameterSource(orden);
        insertActor.execute(param); 
    }

    public Orden getLast(int nit){
        String sql = "SELECT * FROM "+ dbuser +"ORDENES WHERE NIT = ? ORDER BY ORDENID DESC FETCH FIRST 1 ROWS ONLY";
		Object[] args = {nit};
		Orden orden = jdbcTemplate.queryForObject(sql, args, BeanPropertyRowMapper.newInstance(Orden.class));
		return orden;
    }

    public void cancelar(int id) {
        String updateQuery = "UPDATE COMPRAS SET ESTADO = 'Cancelado' WHERE COMPRAID = ?";
        jdbcTemplate.update(updateQuery, id);
	}

    public void recibir(int id) {
        String updateQuery = "UPDATE COMPRAS SET ESTADO = 'Recibido' WHERE COMPRAID = ?";
        jdbcTemplate.update(updateQuery, id);
	}

    public void delete(int id) {
		String sql = "DELETE FROM "+ dbuser +"ORDENES WHERE ORDENID = ?";
		jdbcTemplate.update(sql, id);
	}
}

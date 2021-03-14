package com.ventas.ventas.clientes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

@Repository
public class ClienteDao {

    private String dbuser = "";
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public ClienteDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public List<ModeloCliente> list(){
        String sql = "SELECT * FROM "+ dbuser +"CLIENTES";
        List<ModeloCliente> listPrueba = jdbcTemplate.query(sql,BeanPropertyRowMapper.newInstance(ModeloCliente.class));
        return listPrueba;
    }

    

    public void save(ModeloCliente nuevo) {
        SimpleJdbcInsert insertActor = new SimpleJdbcInsert(jdbcTemplate);
        insertActor.withTableName("clientes").usingColumns("nombre","nit","email","telefono","patente","suscripcion", "vencimiento");
        BeanPropertySqlParameterSource param = new BeanPropertySqlParameterSource(nuevo);
         
        insertActor.execute(param);    
    }

    public ModeloCliente get(int nit) {
		String sql = "SELECT * FROM "+ dbuser +"CLIENTES WHERE NIT = ?";
		Object[] args = {nit};
		ModeloCliente sale = jdbcTemplate.queryForObject(sql, args, BeanPropertyRowMapper.newInstance(ModeloCliente.class));
		return sale;
	}

    public void update(ModeloCliente modelo) {
		String sql = "UPDATE "+ dbuser +"CLIENTES SET nombre=:nombre, email=:email, telefono=:telefono, patente=:patente, suscripcion=:suscripcion, vencimiento=:vencimiento WHERE nit=:nit";
		BeanPropertySqlParameterSource param = new BeanPropertySqlParameterSource(modelo);
		NamedParameterJdbcTemplate template = new NamedParameterJdbcTemplate(jdbcTemplate);
		template.update(sql, param);		
	}

    public void delete(int nit) {
		String sql = "DELETE FROM "+ dbuser +"CLIENTES WHERE NIT = ?";
		jdbcTemplate.update(sql, nit);
	}

}

package com.ventas.ventas.fabricas;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

@Repository
public class FabDao {

    private String dbuser = "";
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public FabDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public List<Fabricante> list(){
        String sql = "SELECT * FROM "+ dbuser +"FABRICANTES ORDER BY FABRICAID";
        List<Fabricante> listPrueba = jdbcTemplate.query(sql,BeanPropertyRowMapper.newInstance(Fabricante.class));
        return listPrueba;
    }

    public void save(Fabricante nuevo) {
        SimpleJdbcInsert insertActor = new SimpleJdbcInsert(jdbcTemplate);
        insertActor.withTableName("fabricantes").usingColumns("fabricaid","fabrica","puerto", "ip");
        BeanPropertySqlParameterSource param = new BeanPropertySqlParameterSource(nuevo);
         
        insertActor.execute(param);    
    }

    public Fabricante get(int id) {
		String sql = "SELECT * FROM "+ dbuser +"FABRICANTES WHERE FABRICAID = ?";
		Object[] args = {id};
		Fabricante fabrica = jdbcTemplate.queryForObject(sql, args, BeanPropertyRowMapper.newInstance(Fabricante.class));
		return fabrica;
	}

    public void update(Fabricante modelo) {
		String sql = "UPDATE "+ dbuser +"FABRICANTES SET fabrica=:fabrica, puerto=:puerto, ip=:ip WHERE fabricaid=:fabricaid";
		BeanPropertySqlParameterSource param = new BeanPropertySqlParameterSource(modelo);
		NamedParameterJdbcTemplate template = new NamedParameterJdbcTemplate(jdbcTemplate);
		template.update(sql, param);		
	}

    public void delete(int id) {
		String sql = "DELETE FROM "+ dbuser +"FABRICANTES WHERE FABRICAID = ?";
		jdbcTemplate.update(sql, id);
	}

}

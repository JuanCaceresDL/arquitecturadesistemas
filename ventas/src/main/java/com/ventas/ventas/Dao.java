package com.ventas.ventas;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import  org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;

@Repository
public class Dao {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public Dao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public List<Modelo> list(){
        String sql = "SELECT * FROM CLIENTES";
        List<Modelo> listPrueba = jdbcTemplate.query(sql,BeanPropertyRowMapper.newInstance(Modelo.class));
        return listPrueba;
    }

    public void save(Modelo nuevo) {
        SimpleJdbcInsert insertActor = new SimpleJdbcInsert(jdbcTemplate);
        insertActor.withTableName("clientes").usingColumns("nombre");
        BeanPropertySqlParameterSource param = new BeanPropertySqlParameterSource(nuevo);
         
        insertActor.execute(param);    
    }
/*

    public Modelo get(int id) {
        String sql = "SELECT * FROM CLIENTES WHERE id = ?";
        Object[] args = {id};
        return jdbcTemplate.queryForObject(sql, args, BeanPropertyRowMapper.newInstance(Modelo.class));
    }*/
/*
   public void update(Prueba prueba){

   }

   public void delete(Prueba prueba){

   }
*/
}

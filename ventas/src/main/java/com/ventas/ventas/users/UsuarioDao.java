package com.ventas.ventas.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

@Repository
public class UsuarioDao {
    private String dbuser = "";
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public UsuarioDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Usuario logIn(String nombre, String password) {
        try {
            String sql = "SELECT * FROM "+ dbuser +"USERS WHERE NOMBRE = ? AND PASSWORD = ? ";
		    Object[] args = {nombre, password};
		    Usuario user = jdbcTemplate.queryForObject(sql, args, BeanPropertyRowMapper.newInstance(Usuario.class));
            return user;
       } 
       catch (EmptyResultDataAccessException e) {
          return null;
       }

	}

    public List<Usuario> list(){
        String sql = "SELECT * FROM "+ dbuser +"USERS ORDER BY USUARIOID";
        List<Usuario> listPrueba = jdbcTemplate.query(sql,BeanPropertyRowMapper.newInstance(Usuario.class));
        return listPrueba;
    }

    public void save(Usuario nuevo) {
        SimpleJdbcInsert insertActor = new SimpleJdbcInsert(jdbcTemplate);
        insertActor.withTableName("users").usingColumns("usuarioid","usuario","rolid", "password");
        BeanPropertySqlParameterSource param = new BeanPropertySqlParameterSource(nuevo);
         
        insertActor.execute(param);    
    }

    public Usuario get(int id) {
		String sql = "SELECT * FROM "+ dbuser +"USERS WHERE USERID = ?";
		Object[] args = {id};
		Usuario fabrica = jdbcTemplate.queryForObject(sql, args, BeanPropertyRowMapper.newInstance(Usuario.class));
		return fabrica;
	}

    public void update(Usuario modelo) {
		String sql = "UPDATE "+ dbuser +"USERS SET nombre=:nombre, rolid=:rolid, password=:password WHERE userid=:userid";
		BeanPropertySqlParameterSource param = new BeanPropertySqlParameterSource(modelo);
		NamedParameterJdbcTemplate template = new NamedParameterJdbcTemplate(jdbcTemplate);
		template.update(sql, param);		
	}

    public void delete(int id) {
		String sql = "DELETE FROM "+ dbuser +"USERS WHERE USERID = ?";
		jdbcTemplate.update(sql, id);
	}
    
}

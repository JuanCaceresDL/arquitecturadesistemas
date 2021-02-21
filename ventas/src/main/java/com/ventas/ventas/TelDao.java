package com.ventas.ventas;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

@Repository
public class TelDao {

    private String dbuser = "";
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public TelDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Telefono> list(){
        String sql = "SELECT * FROM "+ dbuser +"TELEFONOS";
        List<Telefono> listTel = jdbcTemplate.query(sql,BeanPropertyRowMapper.newInstance(Telefono.class));
        return listTel;
    }

    public void save(Telefono nuevo) {
        SimpleJdbcInsert insertActor = new SimpleJdbcInsert(jdbcTemplate);
        insertActor.withTableName("telefonos").usingColumns("telcodigo", "modelo", "ram", "almacenamiento", "procesador", "cores", "descripcion", "marcaid", "preciofabrica", "precioventa", "disponible", "inventario", "color");
        BeanPropertySqlParameterSource param = new BeanPropertySqlParameterSource(nuevo);
         
        insertActor.execute(param);    
    }

    public Telefono get(int id) {
		String sql = "SELECT * FROM "+ dbuser +"TELEFONOS WHERE TELCODIGO = ?";
		Object[] args = {id};
		Telefono tel = jdbcTemplate.queryForObject(sql, args, BeanPropertyRowMapper.newInstance(Telefono.class));
		return tel;
	}

    public void update(Modelo modelo) {
		String sql = "UPDATE "+ dbuser +"CLIENTES SET nombre=:nombre WHERE clientid=:clientid";
		BeanPropertySqlParameterSource param = new BeanPropertySqlParameterSource(modelo);
		NamedParameterJdbcTemplate template = new NamedParameterJdbcTemplate(jdbcTemplate);
		template.update(sql, param);		
	}

    public void delete(int id) {
		String sql = "DELETE FROM "+ dbuser +"CLIENTES WHERE clientid = ?";
		jdbcTemplate.update(sql, id);
	}

}

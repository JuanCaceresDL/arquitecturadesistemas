/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class ClienteDAO {
    PreparedStatement ps;
    ResultSet rs;
    conexion c = new conexion();
    Connection con;
    
    public List listar(){
        List<Cliente>lista = new ArrayList<>();
        String sql = "select * from clientes";
        try {
           con = c.conectar();
           ps = con.prepareStatement(sql);
           rs = ps.executeQuery();
           while(rs.next()){
               Cliente cl = new Cliente();
               cl.setId(rs.getString(1));
               cl.setNomb(rs.getString(2));
               lista.add(cl);
           }
        }catch (Exception e){
        }
        
        return lista;
    }
    
}

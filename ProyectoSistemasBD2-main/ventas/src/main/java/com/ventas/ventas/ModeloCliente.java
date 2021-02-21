package com.ventas.ventas;

import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ModeloCliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int clientid;

    public ModeloCliente() {
       
    }

    public ModeloCliente(int id, String nombre) {
		super();
		this.clientid = id;
		this.nombre = nombre;
	}



    public int getClientid() {
        return clientid;
    }

    public void setClientid(int id) {
        this.clientid = id;
    }


    @Column   
    private String nombre;

   
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String data01) {
        this.nombre = data01;
    }
}
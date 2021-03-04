package com.ventas.ventas.clientes;

import javax.persistence.Entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ModeloCliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int nit;

    public ModeloCliente() {
       
    }
    
    

    public ModeloCliente(int nit, String nombre, String email, int telefono, String patente, String suscripcion, Date vencimiento) {
		super();
		this.nit = nit;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.patente = patente;
        this.suscripcion = suscripcion;
        this.vencimiento = vencimiento;
	}

    public int getNit() {
        return nit;
    }

    public void setNit(int nit) {
        this.nit = nit;
    }
    
    @Column   
    private String nombre;

   
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String data01) {
        this.nombre = data01;
    }

    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    private int telefono;

    public int getTelefono() {
        return telefono;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }

    private String patente;

    public String getPatente() {
        return patente;
    }

    public void setPatente(String patente) {
        this.patente = patente;
    }

    private String suscripcion;

    public String getSuscripcion() {
        return suscripcion;
    }

    public void setSuscripcion(String suscripcion) {
        this.suscripcion = suscripcion;
    }

    private Date vencimiento;

    public Date getVencimiento() {
        return vencimiento;
    }

    public void setVencimiento(String vencimiento) {
        this.vencimiento = Date.valueOf(vencimiento);
    }
    
}
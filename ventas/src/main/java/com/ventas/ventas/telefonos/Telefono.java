package com.ventas.ventas.telefonos;

import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Telefono {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int telcodigo;

    @Column
    private String modelo;
    @Column
    private float ram;
    @Column
    private float almacenamiento;
    @Column
    private String procesador;
    @Column
    private int cores;
    @Column
    private String descripcion;
    @Column
    private int marcaid;
    @Column
    private String marca;
    @Column
    private float preciofabrica;
    @Column
    private float precioventa;
    @Column
    private int disponible;
    @Column
    private int inventario;
    @Column
    private String color;
    
    public Telefono() {
       
    }

    public Telefono(int telcodigo, String modelo, float ram, float almacenamiento, String procesador, int cores,
        String descripcion, int marcaid, String marca, float preciofabrica, float precioventa, int disponible,
        int inventario, String color) {
      this.telcodigo = telcodigo;
      this.modelo = modelo;
      this.ram = ram;
      this.almacenamiento = almacenamiento;
      this.procesador = procesador;
      this.cores = cores;
      this.descripcion = descripcion;
      this.marcaid = marcaid;
      this.marca = marca;
      this.preciofabrica = preciofabrica;
      this.precioventa = precioventa;
      this.disponible = disponible;
      this.inventario = inventario;
      this.color = color;
    }

    public int getTelcodigo() {
      return telcodigo;
    }

    public void setTelcodigo(int telcodigo) {
      this.telcodigo = telcodigo;
    }

    public String getModelo() {
      return modelo;
    }

    public void setModelo(String modelo) {
      this.modelo = modelo;
    }

    public float getRam() {
      return ram;
    }

    public void setRam(float ram) {
      this.ram = ram;
    }

    public float getAlmacenamiento() {
      return almacenamiento;
    }

    public void setAlmacenamiento(float almacenamiento) {
      this.almacenamiento = almacenamiento;
    }

    public String getProcesador() {
      return procesador;
    }

    public void setProcesador(String procesador) {
      this.procesador = procesador;
    }

    public int getCores() {
      return cores;
    }

    public void setCores(int cores) {
      this.cores = cores;
    }

    public String getDescripcion() {
      return descripcion;
    }

    public void setDescripcion(String descripcion) {
      this.descripcion = descripcion;
    }

    public int getMarcaid() {
      return marcaid;
    }

    public void setMarcaid(int marcaid) {
      this.marcaid = marcaid;
    }

    public String getMarca() {
      return marca;
    }

    public void setMarca(String marca) {
      this.marca = marca;
    }

    public float getPreciofabrica() {
      return preciofabrica;
    }

    public void setPreciofabrica(float preciofabrica) {
      this.preciofabrica = preciofabrica;
    }

    public float getPrecioventa() {
      return precioventa;
    }

    public void setPrecioventa(float precioventa) {
      this.precioventa = precioventa;
    }

    public int getDisponible() {
      return disponible;
    }

    public void setDisponible(int disponible) {
      this.disponible = disponible;
    }

    public int getInventario() {
      return inventario;
    }

    public void setInventario(int inventario) {
      this.inventario = inventario;
    }

    public String getColor() {
      return color;
    }

    public void setColor(String color) {
      this.color = color;
    }

    
}

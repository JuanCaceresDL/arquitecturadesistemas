package com.ventas.ventas.pedidos;

import java.sql.Date;

public class Compra {

    private int ordenid;
    private String telcodigo;
    private int cantidad;
    private float total;
    private String estado;
    private Date fecha;
    private String tienda = "Claro";

    public Compra(){

    }

    public int getOrdenid() {
        return ordenid;
    }

    public void setOrdenid(int ordenid) {
        this.ordenid = ordenid;
    }

    public String getTelcodigo() {
        return telcodigo;
    }

    public void setTelcodigo(String telcodigo) {
        this.telcodigo = telcodigo;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getTienda() {
        return tienda;
    }

    public void setTienda(String tienda) {
        this.tienda = tienda;
    }

    @Override
    public String toString() {
        return "Orden " + ordenid + ", Teléfono " + telcodigo + ", Cantidad " + cantidad + ", Pago " + total + ", tipo " + estado + ", fecha "
                + fecha + "\n\n";
    }

    
}

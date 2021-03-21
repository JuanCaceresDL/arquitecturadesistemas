package com.ventas.ventas.pedidos;

public class Compra {
    private int compraid;
    private int ordenid;
    private String telcodigo;
    private int cantidad;
    private float descuento;
    private float subtotal;
    private float total;
    private String estado;

    public Compra(){

    }

    public Compra(int compraid, int ordenid, String telcodigo, int cantidad, float descuento, float subtotal,
            float total, String estado) {
        this.compraid = compraid;
        this.ordenid = ordenid;
        this.telcodigo = telcodigo;
        this.cantidad = cantidad;
        this.descuento = descuento;
        this.subtotal = subtotal;
        this.total = total;
        this.estado = estado;
    }

    public int getCompraid() {
        return compraid;
    }

    public void setCompraid(int compraid) {
        this.compraid = compraid;
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

    public float getDescuento() {
        return descuento;
    }

    public void setDescuento(float descuento) {
        this.descuento = descuento;
    }

    public float getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(float subtotal) {
        this.subtotal = subtotal;
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

    
    
}

package com.ventas.ventas.pedidos;

import com.ventas.ventas.telefonos.*;

public class Pedido {
    private int cantidad;
    private Telefono telefono;

    public Pedido(int cantidad, Telefono telefono) {
        this.cantidad = cantidad;
        this.telefono = telefono;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public Telefono getTelefono() {
        return telefono;
    }

    public void setTelefono(Telefono telefono) {
        this.telefono = telefono;
    }

    public float subtotal(){
        return this.cantidad * this.telefono.getPrecioventa();
    }

}

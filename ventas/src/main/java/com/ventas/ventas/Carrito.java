package com.ventas.ventas;

import java.text.DecimalFormat;
import java.util.*;

import com.ventas.ventas.pedidos.*;
import com.ventas.ventas.telefonos.*;
import com.ventas.ventas.clientes.*;

public class Carrito {
    private DecimalFormat df = new DecimalFormat("#.00"); 
    private List<Pedido> carro = new ArrayList<Pedido>();
    private ModeloCliente client = new ModeloCliente();
   
    public void addPedido(int cantidad, Telefono telefono, String estado){
        Pedido pedido = this.find(telefono.getTelcodigo(), estado);
        if(pedido != null && estado.equals(pedido.getEstado())){
            int actual = pedido.getCantidad();
            pedido.setCantidad(actual + cantidad);
        }else{
            this.carro.add(new Pedido(cantidad, telefono, estado));
        } 
    }
   
    public void deletePedido(String telcode, String estado){
        Pedido borrar = this.find(telcode, estado);
        if(borrar != null){
            this.carro.remove(borrar);
        }
    }

    public Pedido find(String telcode, String estado){
        for (Pedido element : this.carro){
            if (element.getTelefono().getTelcodigo().equals(telcode) && estado.equals(element.getEstado())){
                
                return element;
            }
        }
        
        return null;
    }

    public float subtotal(){
        float resultado = 0;
        for (Pedido element : this.carro){
            float pre = element.getCantidad() * element.getTelefono().getPrecioventa();
            resultado = resultado + pre;
        }
        resultado = Float.valueOf(df.format(resultado));
        return resultado;
    }

    public float descuentoTotal(){
        float resultado = 0;
        for (Pedido element : this.carro){
            resultado = resultado + element.descuentoTotal(client.realdescuento());
        }
        resultado = Float.valueOf(df.format(resultado));
        return resultado;
    }

    public float totales(){
        float resultado = 0;
        for (Pedido element : this.carro){
            resultado = resultado + element.totalPedido(client.realdescuento());
        }
        resultado = Float.valueOf(df.format(resultado));
        return resultado;
    }

    public void terminar(int ordenid){
        for (Pedido element : this.carro){
            element.setOrdenid(ordenid);
            element.terminar(client.realdescuento());
        }
    }

    public List<Pedido> getCarro() {
        return carro;
    }

    public void setCarro(List<Pedido> carro) {
        this.carro = carro;
    }

    public ModeloCliente getClient(){
        return client;
    }

    public void setClient(ModeloCliente client){
        this.client = client;
    }
}

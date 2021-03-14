package com.ventas.ventas;

import java.util.*;

import com.ventas.ventas.pedidos.*;
import com.ventas.ventas.telefonos.*;

public class Carrito {
    private List<Pedido> carro = new ArrayList<Pedido>();

    
   
    public void addPedido(int cantidad, Telefono telefono){
        Pedido pedido = new Pedido(cantidad, telefono);
            this.carro.add(pedido);
    }
   
    public void deletePedido(int telcode){
        Pedido borrar = this.find(telcode);
        if(borrar != null){
            this.carro.remove(borrar);
        }
    }

    public Pedido find(int telcode){
        for (Pedido element : this.carro){
            if (element.getTelefono().getTelcodigo() == telcode){
                return element;
            }
        }
        return null;
    }

    public List<Pedido> getCarro() {
        return carro;
    }

    public void setCarro(List<Pedido> carro) {
        this.carro = carro;
    }
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

/**
 *
 * @author Jorge Marroquín
 */
public class Cliente {
    
    String id;
    String nomb;
    
    public void cliente(){}
    
    public void cliente(String id, String nomb){
        this.id = id;
        this.nomb = nomb;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNomb() {
        return nomb;
    }

    public void setNomb(String nomb) {
        this.nomb = nomb;
    }
    
}

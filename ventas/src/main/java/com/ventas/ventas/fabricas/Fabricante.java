package com.ventas.ventas.fabricas;

public class Fabricante {
    private int fabricaid;
    private String fabrica;
    private int puerto;

    public Fabricante(){
        
    }

    public Fabricante(int fabricaid, String fabrica, int puerto) {
        this.fabricaid = fabricaid;
        this.fabrica = fabrica;
        this.puerto = puerto;
    }

    public int getFabricaid() {
        return fabricaid;
    }

    public void setFabricaid(int fabricaid) {
        this.fabricaid = fabricaid;
    }

    public String getFabrica() {
        return fabrica;
    }

    public void setFabrica(String fabrica) {
        this.fabrica = fabrica;
    }

    public int getPuerto() {
        return puerto;
    }

    public void setPuerto(int puerto) {
        this.puerto = puerto;
    }
    
}

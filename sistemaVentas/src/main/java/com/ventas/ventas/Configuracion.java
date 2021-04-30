package com.ventas.ventas;

public class Configuracion {
    
    private String db = "SYSTEM";
    private String tienda = "Tigo";
    private String passwordTienda = "123";

    public Configuracion() {
    }

    public String getDb() {
        return db;
    }

    public void setDb(String db) {
        this.db = db;
    }

    public String getTienda() {
        return tienda;
    }

    public void setTienda(String tienda) {
        this.tienda = tienda;
    }

    public String getPasswordTienda() {
        return passwordTienda;
    }

    public void setPasswordTienda(String passwordTienda) {
        this.passwordTienda = passwordTienda;
    }

    
    
}

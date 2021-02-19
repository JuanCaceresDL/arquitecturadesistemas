package com.ventas.ventas;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;



@Controller
public class Controlador {
    @Autowired
    private Dao dao;

    @RequestMapping("/")
    public String viewHomePage(final Model model) {
        final List<Modelo> listPrueba = dao.list();
        model.addAttribute("listPrueba", listPrueba);
        
        return "index.html";
    }

    @RequestMapping("/new")
    public String showNewForm(Model model) {
        Modelo nuevo = new Modelo();
        model.addAttribute("nuevo", nuevo);
      
        return "new";
    }
    
    @RequestMapping(value = "/save", method = RequestMethod.POST)
        public String save(@ModelAttribute("nuevo") Modelo nuevo) {
        dao.save(nuevo);
      
        return "redirect:/";
        }
    
    

}

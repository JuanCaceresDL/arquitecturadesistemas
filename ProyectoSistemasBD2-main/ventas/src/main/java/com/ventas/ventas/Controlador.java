package com.ventas.ventas;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class Controlador {
    @Autowired
    private Dao dao;
    @Autowired
    private ClienteDao daoc;

    @RequestMapping("/")
    public String vista(final Model model) {
        final List<ModeloCliente> listPrueba = daoc.list();
        model.addAttribute("listPrueba", listPrueba);
        
        return "ClienteRead.html";
    }

    @RequestMapping("/new")
    public String newcliente(Model model) {
        ModeloCliente nuevo = new ModeloCliente();
        model.addAttribute("nuevo", nuevo);
      
        return "new";
    }
    
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String savecliente(@ModelAttribute("modelo") ModeloCliente modelo) {
    daoc.save(modelo);
    return "redirect:/";
    }

    @RequestMapping("/edit/{id}")
    public ModelAndView editcliente(@PathVariable(name = "id") int id) {
        ModelAndView mav = new ModelAndView("update");
        ModeloCliente modelo = daoc.get(id);
        mav.addObject("modelo", modelo);
            
        return mav;
    }
        
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public String update(@ModelAttribute("modelo") ModeloCliente modelo) {
        daoc.update(modelo);
            
        return "redirect:/";
    }

    @RequestMapping("/delete/{id}")
    public String delete(@PathVariable(name = "id") int id) {
        daoc.delete(id);
        return "redirect:/";       
    }	
    
    

}

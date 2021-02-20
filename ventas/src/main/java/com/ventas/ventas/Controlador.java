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
    public String save(@ModelAttribute("modelo") Modelo modelo) {
    dao.save(modelo);
    return "redirect:/";
    }

    @RequestMapping("/edit/{id}")
    public ModelAndView showEditForm(@PathVariable(name = "id") int id) {
        ModelAndView mav = new ModelAndView("update");
        Modelo modelo = dao.get(id);
        mav.addObject("modelo", modelo);
            
        return mav;
    }
        
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public String update(@ModelAttribute("modelo") Modelo modelo) {
        dao.update(modelo);
            
        return "redirect:/";
    }

    @RequestMapping("/delete/{id}")
    public String delete(@PathVariable(name = "id") int id) {
        dao.delete(id);
        return "redirect:/";       
    }	
    
    

}

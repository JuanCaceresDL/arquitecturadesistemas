package com.ventas.ventas;

import java.util.List;

import com.ventas.ventas.telefonos.*;
import com.ventas.ventas.clientes.*;
import com.ventas.ventas.tutorial.*;

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
    private TelDao teldao;
    
    @Autowired
    private ClienteDao daoc;

    //TEMPLATE
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
    
    //TELEFONO CONTROL
    @RequestMapping("/telefonos")
    public String telefonosPage(final Model telefono) {
        final List<Telefono> listTel = teldao.list();
        telefono.addAttribute("listTel", listTel);
        return "telefonos/telefonos.html";
    }
    
    @RequestMapping("/newTel")
    public String telefonoNew(Model model) {
        Telefono nuevoTel = new Telefono();
        model.addAttribute("nuevoTel", nuevoTel);
        return "telefonos/telefonosNew.html";
    }

    @RequestMapping(value = "/saveTel", method = RequestMethod.POST)
    public String telefonoSave(@ModelAttribute("newtel") Telefono newtel) {
    teldao.save(newtel);
    return "redirect:/telefonos";
    }

    //FABRICA CONTROL
    @RequestMapping("/fabricas")
    public String fabricaPage(final Model fabrica) {/*
        final List<Telefono> listTel = teldao.list();
        telefono.addAttribute("listTel", listTel);*/
        return "fabricas/fabricas.html";
    }

    //CLIENTES
    @RequestMapping("/clientes")
    public String clientesPage(final Model model) {
        final List<ModeloCliente> listClient = daoc.list();
        model.addAttribute("listClient", listClient);
        return "clientes/ClienteRead.html";
    }

    @RequestMapping("/newCliente")
    public String clienteNew(Model model) {
        ModeloCliente nuevoClient = new ModeloCliente();
        model.addAttribute("nuevoClient", nuevoClient);
        return "clientes/clienteCreate.html";
    }
}

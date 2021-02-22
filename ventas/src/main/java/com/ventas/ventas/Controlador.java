package com.ventas.ventas;

/*import java.text.SimpleDateFormat;
import java.util.Date;*/
import java.util.List;

import com.ventas.ventas.telefonos.*;
import com.ventas.ventas.clientes.*;
import com.ventas.ventas.fabricas.*;
import com.ventas.ventas.tutorial.*;

import org.springframework.beans.factory.annotation.Autowired;
/*import org.springframework.beans.propertyeditors.CustomDateEditor;*/
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
/*import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;*/
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class Controlador {

    private Carrito carrito = new Carrito();

    @Autowired
    private Dao dao;

    @Autowired
    private TelDao teldao;

    @Autowired
    private FabDao fabDao;
    
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
        final List<Telefono> listMar = teldao.listMarcas();
        model.addAttribute("listMar", listMar);
        return "telefonos/telefonosNew.html";
    }

    @RequestMapping(value = "/saveTel", method = RequestMethod.POST)
    public String telefonoSave(@ModelAttribute("newtel") Telefono newtel) {
    teldao.save(newtel);
    return "redirect:/telefonos";
    }

    @RequestMapping("/editTel/{id}")
    public ModelAndView telefonoEdit(@PathVariable(name = "id") int id) {
        ModelAndView mav = new ModelAndView("telefonos/telefonosUpdate.html");
        Telefono telefono = teldao.get(id);
        List<Telefono> listMar = teldao.listMarcas();
        mav.addObject("listMar", listMar);
        mav.addObject("telefono", telefono);
        return mav;
    }
        
    @RequestMapping(value = "/updateTel", method = RequestMethod.POST)
    public String telefonoUpdate(@ModelAttribute("modelo") Telefono modelo) {
        teldao.update(modelo);
        return "redirect:/telefonos";
    }

    @RequestMapping("/deleteTel/{id}")
    public String telefonoDelete(@PathVariable(name = "id") int id) {
        teldao.delete(id);
        return "redirect:/telefonos";       
    }

    @RequestMapping(value = "/addCarrito/{id}", method = RequestMethod.POST)
    public String addCarrito(@PathVariable(name = "id") int id, @RequestParam String cantidadTel) {
        Telefono telefono = teldao.get(id);
        int cant = Integer.parseInt(cantidadTel);
        this.carrito.addPedido(cant, telefono);
        return "redirect:/telefonos";       
    }

    //FABRICA CONTROL
    @RequestMapping("/fabricas")
    public String fabricasPage(final Model model) {
        final List<Fabricante> listFab = fabDao.list();
        model.addAttribute("listFab", listFab);
        
        return "fabricas/fabricas.html";
    }

    @RequestMapping("/newFabrica")
    public String fabricaNew(Model model) {
        Fabricante nuevo = new Fabricante();
        model.addAttribute("nuevo", nuevo);
        return "fabricas/fabricasNew.html";
    }
    
    @RequestMapping(value = "/saveFabrica", method = RequestMethod.POST)
    public String fabricaSave(@ModelAttribute("modelo") Fabricante modelo) {
    fabDao.save(modelo);
    return "redirect:/fabricas";
    }

    @RequestMapping("/editFabrica/{id}")
    public ModelAndView fabricaEdit(@PathVariable(name = "id") int id) {
        ModelAndView mav = new ModelAndView("fabricas/fabricasUpdate.html");
        Fabricante modelo = fabDao.get(id);
        mav.addObject("modelo", modelo);
        return mav;
    }
        
    @RequestMapping(value = "/updateFabrica", method = RequestMethod.POST)
    public String fabricaUpdate(@ModelAttribute("modelo") Fabricante modelo) {
        fabDao.update(modelo);
            
        return "redirect:/fabricas";
    }

    @RequestMapping("/deleteFabrica/{id}")
    public String fabricaDelete(@PathVariable(name = "id") int id) {
        fabDao.delete(id);
        return "redirect:/fabricas";       
    }

    //CARRITO
    @RequestMapping("/carrito")
    public String carritoPage(final Model carrito) {
        carrito.addAttribute("carrito", this.carrito);
        return "pedidos/carrito.html";
    }

    @RequestMapping("/deleteCarrito/{id}")
    public String carritoDel(@PathVariable(name = "id") int id) {
        carrito.deletePedido(id);
        return "redirect:/carrito";
    }

    //PEDIDOS
    

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
        return "clientes/clientecreate.html";
    }

    @RequestMapping("/deleteCliente/{nit}")
    public String deleteCliente(@PathVariable(name = "nit") int nit) {
        daoc.delete(nit);
        return "clientes/ClienteRead.html";       
    }

    /*@InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        dateFormat.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }*/

    @RequestMapping(value = "/savec", method = RequestMethod.POST)
        public String save(@ModelAttribute("nuevoClient") ModeloCliente nuevoClient) {
        daoc.save(nuevoClient);
        return "redirect:/";
    }
}

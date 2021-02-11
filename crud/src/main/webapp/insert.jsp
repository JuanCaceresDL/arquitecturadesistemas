<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<%@page import="java.sql.*,java.util.*"%>

<%
    String n_id = request.getParameter("client_id");
    String n_nombre = request.getParameter("nombre");

    try {
        Class.forName("oracle.jdbc.driver.OracleDriver");
        Connection connection = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", "C##CRUD", "admin");
        Statement st = connection.createStatement();

        st.executeUpdate("insert into clientes(client_id, nombre) values('" + n_id + "','" + n_nombre + "')");
        out.println("Data is successfully inserted!");
    } catch (Exception e) {
        out.print(e);
        e.printStackTrace();
    }
    response.sendRedirect("index.jsp");
%> 
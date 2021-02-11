<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="java.sql.*,java.util.*"%>
<%
    String id = request.getParameter("id");
    try {
        Class.forName("oracle.jdbc.driver.OracleDriver");
        Connection connection = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", "C##CRUD", "admin");
        Statement st = connection.createStatement();
        int i = st.executeUpdate("DELETE FROM clientes WHERE client_id=" + id);
        out.println("Data Deleted Successfully!");
    } catch (Exception e) {
        out.print(e);
        e.printStackTrace();
    }
    response.sendRedirect("index.jsp");
%> 
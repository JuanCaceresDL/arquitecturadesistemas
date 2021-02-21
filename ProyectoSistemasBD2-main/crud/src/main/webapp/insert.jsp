<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<%@page import="java.sql.*,java.util.*"%>

<%
    String n_id = request.getParameter("TIPO");
    String n_nombre = request.getParameter("NOMBRE");

    try {
        Class.forName("oracle.jdbc.driver.OracleDriver");
        Connection connection = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", "system", "admin");
        Statement st = connection.createStatement();

        st.executeUpdate("insert into USERS(TIPO, NOMBRE) values('" + n_id + "','" + n_nombre + "')");
        out.println("Data is successfully inserted!");
    } catch (Exception e) {
        out.print(e);
        e.printStackTrace();
    }
    response.sendRedirect("index.jsp");
%> 
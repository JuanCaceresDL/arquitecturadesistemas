<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ page import="java.sql.*" %>
<%! String driverName = "oracle.jdbc.driver.OracleDriver";%>
<%!String url = "jdbc:oracle:thin:@localhost:1521:xe";%>
<%!String user = "C##CRUD";%>
<%!String psw = "admin";%>
<%
    String id = request.getParameter("id");
    String n_id = request.getParameter("client_id");
    String n_name = request.getParameter("nombre");

    if (id != null) {
        Connection con = null;
        PreparedStatement ps = null;
        int personID = Integer.parseInt(id);
        try {
            Class.forName(driverName);
            con = DriverManager.getConnection(url, user, psw);
            String sql = "Update clientes set client_id=?,nombre=? where client_id=" + id;
            ps = con.prepareStatement(sql);
            ps.setString(1, n_id);
            ps.setString(2, n_name);
            int i = ps.executeUpdate();
            if (i > 0) {
                out.print("Record Updated Successfully");
                response.sendRedirect("updatePage.jsp?id=" + id);
            } else {
                out.print("There is a problem in updating Record.");
            }
        } catch (SQLException sql) {
            request.setAttribute("error", sql);
            out.println(sql);
        }
    }
    
%> 
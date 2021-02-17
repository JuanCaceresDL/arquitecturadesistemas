<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.sql.*"            %>
<%  %>
<!DOCTYPE html>
<html>
    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    </head>
    <body>
	<h1 class="display-4">CRUD</h1>
        <br>
        
        <div class="container">
            <form class="form-inline" action="insert.jsp" method="post"> 
                <input type="text" class="form-control mb-2 mr-sm-2" name="TIPO" placeholder="Tipo">
                <input type="text" class="form-control mb-2 mr-sm-2" name="NOMBRE" placeholder="Nombre">
                <button type="submit" class="btn btn-primary mb-2" value="regresar" name="regresar">Create</button>
            </form>
        </div>
                
	<table class="table">
            <thead>
            <tr>
		<th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Acciones</th>
            </tr>
            </thead>
            <tbody
            <%
		try{
                    Class.forName("oracle.jdbc.driver.OracleDriver");
                    Connection connection = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", "system", "admin");
                    Statement statement = connection.createStatement();
                    String sql ="SELECT * FROM USERS order by ID";
                    ResultSet resultset = statement.executeQuery(sql);
		while(resultset.next()){
            %>
            <tr>
		<th scope="row"><%=resultset.getString("TIPO") %></th>
                <td><%=resultset.getString("NOMBRE") %></td>
                <td>
                    <a href="delete.jsp?id=<%=resultset.getString("ID") %>"><button type="button" class="btn btn-secondary">Delete</button></a>
                    <a href="updatePage.jsp?id=<%=resultset.getString("ID") %>"><button type="button" class="btn btn-secondary">Update</button></a>
                </td>
            </tr>
            <%}
                connection.close();
            } catch (Exception e) {
		e.printStackTrace();
            }%>
            </tbody>
	</table>
    </body>
</html>		
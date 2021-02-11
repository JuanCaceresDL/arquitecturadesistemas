<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%
    String id = request.getParameter("id");
    String driver = "com.mysql.jdbc.Driver";
    
    try {
        Class.forName(driver);
    } catch (ClassNotFoundException e) {
        e.printStackTrace();
    }

%>
<%
    try {
        Connection connection = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", "C##CRUD", "admin");
        Statement statement = connection.createStatement();
        String sql = "select * from clientes where client_id=" + id;
        ResultSet resultSet = statement.executeQuery(sql);
        while (resultSet.next()) {
%>
<!DOCTYPE html>
<html>
    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    </head>
    <body>
        <h1 class="h1">Update</h1>
        <form method="post" action="update.jsp" class="container">
            <input class="form-control mb-2 mr-sm-2" type="hidden" name="id" value="<%=resultSet.getString("client_id")%>">
            <input class="form-control mb-2 mr-sm-2" type="text" name="client_id" value="<%=resultSet.getString("client_id")%>">
            
            <input class="form-control mb-2 mr-sm-2" type="text" name="nombre" value="<%=resultSet.getString("nombre")%>">
            <input class="btn btn-primary mb-2" type="submit" value="submit">
            <a href="index.jsp"><input class="btn btn-primary mb-2" type="button" value="Regresar"></a>
        </form>
        <%
                }
                connection.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        %>
    </body>
</html> 
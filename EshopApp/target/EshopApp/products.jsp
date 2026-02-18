<%@ page import="java.sql.*" %>

<!DOCTYPE html>
<html>
<head>
    <title>Products</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">
       <jsp:include page="navbar.jsp" />


<div class="container mt-5">

    <div class="d-flex justify-content-between mb-4">
        <h2>Available Products</h2>
        <a href="history.jsp" class="btn btn-dark">View History</a>
    </div>

    <div class="row">

    <%
        ResultSet rs = (ResultSet) request.getAttribute("products");
        while(rs.next()){
    %>

        <div class="col-md-4 mb-4">
            <div class="card shadow-sm">
                <div class="card-body text-center">
                    <h5 class="card-title"><%= rs.getString("name") %></h5>
                    <p class="card-text">₹ <%= rs.getDouble("price") %></p>

                    <form action="CartServlet" method="post">
                        <input type="hidden" name="product"
                               value="<%= rs.getString("name") %>">
                        <input type="hidden" name="price"
                               value="<%= rs.getDouble("price") %>">

                        <button type="submit" class="btn btn-success w-100">
                            Buy Now
                        </button>
                    </form>
                </div>
            </div>
        </div>

    <%
        }
    %>

    </div>
</div>

</body>
</html>

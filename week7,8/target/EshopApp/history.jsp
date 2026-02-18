<%@ page import="java.sql.*,com.eshop.DBConnection" %>

<!DOCTYPE html>
<html>
<head>
    <title>Transaction History</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">
        <jsp:include page="navbar.jsp" />


<div class="container mt-5">

    <h2 class="mb-4">Your Transaction History</h2>

    <table class="table table-bordered table-striped shadow">
        <thead class="table-dark">
            <tr>
                <th>Product</th>
                <th>Amount (₹)</th>
                <th>Date</th>
            </tr>
        </thead>

        <tbody>
        <%
            HttpSession session1 = request.getSession(false);
            int userId = (int) session1.getAttribute("userId");

            Connection con = DBConnection.getConnection();
            PreparedStatement ps = con.prepareStatement(
                "SELECT * FROM transactions WHERE user_id=?");

            ps.setInt(1, userId);
            ResultSet rs = ps.executeQuery();

            while(rs.next()){
        %>
            <tr>
                <td><%= rs.getString("product_name") %></td>
                <td><%= rs.getDouble("amount") %></td>
                <td><%= rs.getTimestamp("date") %></td>
            </tr>
        <%
            }
        %>
        </tbody>
    </table>

    <a href="ProductServlet" class="btn btn-primary mt-3">Back to Products</a>

</div>

</body>
</html>

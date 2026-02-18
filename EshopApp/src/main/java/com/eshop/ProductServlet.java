package com.eshop;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.*;

public class ProductServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {

        Connection con = null;
        Statement st = null;
        ResultSet rs = null;

        try {
            con = DBConnection.getConnection();
            st = con.createStatement();
            rs = st.executeQuery("SELECT * FROM products");

            // Convert ResultSet into List (VERY IMPORTANT)
            java.util.List<String[]> products = new java.util.ArrayList<>();

            while(rs.next()){
                String[] p = new String[3];
                p[0] = rs.getString("id");
                p[1] = rs.getString("name");
                p[2] = rs.getString("price");
                products.add(p);
            }

            request.setAttribute("productList", products);

            RequestDispatcher rd =
                request.getRequestDispatcher("products.jsp");
            rd.forward(request, response);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

package com.eshop;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.*;

public class CartServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(false);

        if(session == null || session.getAttribute("userId") == null){
            response.sendRedirect("login.jsp");
            return;
        }

        Integer userId = (Integer) session.getAttribute("userId");

        String product = request.getParameter("product");
        String price = request.getParameter("price");

        try {
            Connection con = DBConnection.getConnection();

            PreparedStatement ps = con.prepareStatement(
                "INSERT INTO transactions(user_id, product_name, amount) VALUES(?,?,?)");

            ps.setInt(1, userId);
            ps.setString(2, product);
            ps.setDouble(3, Double.parseDouble(price));

            ps.executeUpdate();

            ps.close();
            con.close();

            // Directly go to transaction history
            response.sendRedirect("history.jsp");

        } catch(Exception e){
            e.printStackTrace();
        }
    }
}

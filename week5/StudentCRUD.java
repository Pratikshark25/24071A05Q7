import java.sql.*;

public class StudentCRUD {

    // INSERT
    public static void insertStudent(String name, String email, int age) {
        String sql = "INSERT INTO student(name, email, age) VALUES (?, ?, ?)";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, name);
            ps.setString(2, email);
            ps.setInt(3, age);

            ps.executeUpdate();
            System.out.println("Student Inserted Successfully!");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // VIEW
    public static void viewStudents() {
        String sql = "SELECT * FROM student";

        try (Connection con = DBConnection.getConnection();
             Statement st = con.createStatement();
             ResultSet rs = st.executeQuery(sql)) {

            System.out.println("\nID\tName\tEmail\t\tAge");
            while (rs.next()) {
                System.out.println(
                        rs.getInt("id") + "\t" +
                        rs.getString("name") + "\t" +
                        rs.getString("email") + "\t" +
                        rs.getInt("age")
                );
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // UPDATE
    public static void updateStudent(int id, int newAge) {
        String sql = "UPDATE student SET age=? WHERE id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, newAge);
            ps.setInt(2, id);

            int rows = ps.executeUpdate();
            if (rows > 0)
                System.out.println("Student Updated Successfully!");
            else
                System.out.println("Student not found!");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // DELETE
    public static void deleteStudent(int id) {
        String sql = "DELETE FROM student WHERE id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, id);
            int rows = ps.executeUpdate();

            if (rows > 0)
                System.out.println("Student Deleted Successfully!");
            else
                System.out.println("Student not found!");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

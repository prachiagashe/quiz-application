import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;

public class CheckSchema {
    public static void main(String[] args) {
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/quiz_application", "root", "root");
            ResultSet rs = conn.createStatement().executeQuery("SELECT * FROM questions LIMIT 1");
            ResultSetMetaData md = rs.getMetaData();
            System.out.println("COLUMN NAMES:");
            for (int i=1; i<=md.getColumnCount(); i++) {
                System.out.println(md.getColumnName(i));
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}

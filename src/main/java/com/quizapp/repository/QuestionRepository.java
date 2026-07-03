package com.quizapp.repository;

import com.quizapp.model.Question;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class QuestionRepository {

    public QuestionRepository() {
        initDatabase();
    }

    private void initDatabase() {
        String createTableSQL = "CREATE TABLE IF NOT EXISTS questions (" +
                "id INT AUTO_INCREMENT PRIMARY KEY," +
                "question_text VARCHAR(255) NOT NULL," +
                "option_a VARCHAR(100) NOT NULL," +
                "option_b VARCHAR(100) NOT NULL," +
                "option_c VARCHAR(100) NOT NULL," +
                "option_d VARCHAR(100) NOT NULL," +
                "correct_answer VARCHAR(1) NOT NULL" +
                ")";

        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement()) {
            
            stmt.execute(createTableSQL);

            // Check if empty and insert dummy data
            ResultSet rs = stmt.executeQuery("SELECT COUNT(*) FROM questions");
            if (rs.next() && rs.getInt(1) == 0) {
                String insertSQL = "INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES " +
                        "('What is the default value of an int variable in Java?', '0', '1', 'null', 'undefined', 'A')," +
                        "('Which of the following is not a Java feature?', 'Object-oriented', 'Use of pointers', 'Portable', 'Dynamic and Extensible', 'B')," +
                        "('What is the size of boolean variable?', '8 bit', '16 bit', '32 bit', 'not precisely defined', 'D')";
                stmt.execute(insertSQL);
                System.out.println("Inserted sample questions into the database.");
            }
        } catch (SQLException e) {
            System.err.println("Error initializing database: " + e.getMessage());
        }
    }

    public List<Question> getAllQuestions() {
        List<Question> questions = new ArrayList<>();
        String query = "SELECT * FROM questions";

        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            while (rs.next()) {
                questions.add(new Question(
                        rs.getInt("id"),
                        rs.getString("question_text"),
                        rs.getString("option_a"),
                        rs.getString("option_b"),
                        rs.getString("option_c"),
                        rs.getString("option_d"),
                        rs.getString("correct_answer")
                ));
            }
        } catch (SQLException e) {
            System.err.println("Error fetching questions: " + e.getMessage());
        }
        return questions;
    }
}

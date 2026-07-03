package com.quizapp.repository;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {

    private static final String URL =
            "jdbc:mysql://localhost:3306/quiz_application";

    private static final String USER = "root";

    private static final String PASSWORD = "root";

    public static Connection getConnection() {

        try {

            return DriverManager.getConnection(
                    URL,
                    USER,
                    PASSWORD
            );

        } catch (Exception e) {

            System.out.println("Database Connection Failed");

            e.printStackTrace();

            return null;
        }
    }

    // A quick main method to test the connection directly
    public static void main(String[] args) {
        System.out.println("Testing Database Connection...");
        Connection conn = getConnection();
        if (conn != null) {
            System.out.println("Successfully connected to the database!");
        } else {
            System.out.println("Failed to connect to the database.");
        }
    }
}
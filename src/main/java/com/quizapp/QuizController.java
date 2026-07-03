package com.quizapp;

import com.quizapp.service.QuestionService;
import com.quizapp.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class QuizController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/api/test")
    public String test() {
        return "Hello! The Quiz API is successfully connected.";
    }

    @GetMapping("/api/questions")
    public List<Question> getQuestions() {
        return questionService.getAllQuestions();
    }
}

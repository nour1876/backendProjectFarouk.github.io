package com.nw.service;

import com.nw.model.Level;
import com.nw.model.Question;
import org.springframework.stereotype.Service;

@Service
public interface QuestionService {
  Question addQuestion(Question question, Level level);
}

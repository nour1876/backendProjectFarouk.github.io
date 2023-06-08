package com.nw.service;


import com.nw.model.History;

public interface HistoryService {
    History addHistory(History history);

    History editHistory(History history, History history1);
}

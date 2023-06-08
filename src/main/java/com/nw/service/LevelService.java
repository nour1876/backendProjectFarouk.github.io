package com.nw.service;


import com.nw.model.Level;
import com.nw.model.Theme;
import org.springframework.stereotype.Service;

@Service
public interface LevelService {
	
	Level addLevel(Level level, Theme theme);

}

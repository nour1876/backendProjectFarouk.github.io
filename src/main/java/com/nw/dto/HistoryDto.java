package com.nw.dto;

public class HistoryDto {

    private Long id;

    private String username;

    private String themeName;

    private String levelName;

    private int total;

    private int sore;

    private Long rec;

    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getThemeName() {
        return themeName;
    }

    public void setThemeName(String themeName) {
        this.themeName = themeName;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getSore() {
        return sore;
    }

    public void setSore(int sore) {
        this.sore = sore;
    }

    public Long getRec() {
        return rec;
    }

    public void setRec(Long rec) {
        this.rec = rec;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

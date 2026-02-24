package com.example.todo.dto;

import jakarta.validation.constraints.NotBlank;

public class TodoUpdateRequest {

    @NotBlank(message = "Title is mandatory")
    private String title;

    private String description;
    private boolean completed;

    // Getters & Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
}

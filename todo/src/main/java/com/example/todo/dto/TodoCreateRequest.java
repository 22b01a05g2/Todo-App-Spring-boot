package com.example.todo.dto;

import jakarta.validation.constraints.NotBlank;

public class TodoCreateRequest {

    @NotBlank(message = "Title is mandatory")
    private String title;

    private String description;

    // Getters & Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
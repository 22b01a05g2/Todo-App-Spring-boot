package com.example.todo.service;

import com.example.todo.dto.TodoCreateRequest;
import com.example.todo.dto.TodoUpdateRequest;
import com.example.todo.model.Todo;

import java.util.List;
import java.util.Optional;

public interface TodoService {
    Todo create(TodoCreateRequest req);
    List<Todo> getAll(Optional<Boolean> completed);
    Todo update(Long id, TodoUpdateRequest req);
    void delete(Long id);
}
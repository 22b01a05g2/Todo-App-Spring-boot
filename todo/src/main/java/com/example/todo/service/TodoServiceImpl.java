package com.example.todo.service;

import com.example.todo.dto.TodoCreateRequest;
import com.example.todo.dto.TodoUpdateRequest;
import com.example.todo.exception.ForbiddenException;
import com.example.todo.exception.ResourceNotFoundException;
import com.example.todo.model.Todo;
import com.example.todo.model.User;
import com.example.todo.repository.TodoRepository;
import com.example.todo.repository.UserRepository;
import com.example.todo.security.AuthContext;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepo;
    private final UserRepository userRepo;
    private final AuthContext authContext;

    public TodoServiceImpl(TodoRepository todoRepo, UserRepository userRepo, AuthContext authContext) {
        this.todoRepo = todoRepo;
        this.userRepo = userRepo;
        this.authContext = authContext;
    }

    private User currentUser() {
        String username = authContext.currentUsername();
        if (username == null || username.equals("anonymousUser")) {
            throw new ForbiddenException("Not authenticated");
        }
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new ForbiddenException("User not found for token"));
    }

    @Override
    public Todo create(TodoCreateRequest req) {
        User user = currentUser();

        Todo t = new Todo();
        t.setTitle(req.getTitle());
        t.setDescription(req.getDescription());
        t.setCompleted(false);
        t.setUser(user);

        return todoRepo.save(t);
    }

    @Override
    public List<Todo> getAll(Optional<Boolean> completed) {
        User user = currentUser();

        return completed
                .map(flag -> todoRepo.findByUserAndCompleted(user, flag))
                .orElseGet(() -> todoRepo.findByUser(user));
    }

    @Override
    public Todo update(Long id, TodoUpdateRequest req) {
        User user = currentUser();

        Todo t = todoRepo.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found for your account: " + id));

        t.setTitle(req.getTitle());
        t.setDescription(req.getDescription());
        t.setCompleted(req.isCompleted());

        return todoRepo.save(t);
    }

    @Override
    public void delete(Long id) {
        User user = currentUser();

        Todo t = todoRepo.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found for your account: " + id));

        todoRepo.delete(t);
    }
}
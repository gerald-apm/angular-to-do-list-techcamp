import { Component, OnInit } from '@angular/core';
import { Todo } from '../../todo';
import { TodoService } from '../../services/todos/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  name: any = '';
  editMode: any[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(
      (todos) => {
        console.log(todos);
        this.todos = todos;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  postTodos() {
    if (this.name === '') {
      return;
    } else {
      const content = { isCompleted: false, text: this.name };
      this.todoService.postTodos(content).subscribe(
        (response) => {
          location.reload();
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteTodo(i: any) {
    const id = this.todos[i]._id;
    this.todoService.deleteTodo(id).subscribe(
      (response) => {
        console.log(response);
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkTodo(i: any) {
    const id = this.todos[i]._id;
    const content = {
      isCompleted: !this.todos[i].isCompleted,
      text: this.todos[i].text,
    };
    this.todoService.updateTodo(content, id).subscribe(
      (response) => {
        location.reload();
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editTodo(i: any) {
    if (this.editMode[i]) {
      const id = this.todos[i]._id;
      const content = {
        isCompleted: this.todos[i].isCompleted,
        text: this.todos[i].text,
      };
      this.todoService.updateTodo(content, id).subscribe(
        (response) => {
          location.reload();
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.editMode[i] = true;
    }
  }
}

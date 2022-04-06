import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class TodoService {
  url: any = environment.baseURL;
  constructor(private http: HttpClient) {}

  getTodos(): Observable<any> {
    return this.http.get(this.url);
  }

  postTodos(param: any): Observable<any> {
    return this.http.post(this.url, param);
  }

  deleteTodo(id: any): Observable<any> {
    const url = this.url + '/' + id;
    return this.http.delete(url);
  }

  updateTodo(param: any, id: any): Observable<any> {
    const url = this.url + '/' + id;
    return this.http.put(url, param);
  }
}

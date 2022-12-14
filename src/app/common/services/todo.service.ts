import {Injectable} from '@angular/core';
import {BehaviorSubject, find, map, Observable, of, Subject} from "rxjs";
import {ITodo} from "../interfaces/todo.interface";
import {StorageService} from "./storage.service";
import {PersonService} from "./person.service";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);

  get todos(): ITodo[] {
    return this.storageService.get('todos') || []
  }

  constructor(
    private storageService: StorageService,
    private personService: PersonService
  ) {
  }

  getTodos(): Observable<ITodo[]> {
    return this.todos$.asObservable();
  }

  getTodoById(id: string | number): Observable<ITodo | undefined> {
    return this.todos$.pipe(
      map((todos) => {
        return todos.find(todo => todo.id === id);
      })
    );
  }


  addTodo(todo: ITodo): Observable<ITodo> {
    console.log(todo);
    // const todos = this.todos;
    // todo.id = this.generateId();
    // todo.status = 'pending';
    // todo.createdAt = new Date();
    // todos.push(todo);
    // this.storageService.set('todos', todos);


    todo.id = this.generatedId();
    todo.status = 'pending';
    todo.createAt = new Date();
    this.todos$.next([
      ...this.todos$.getValue(),
      todo
    ]);
    return of(todo);
  }


  updateTodoByID(id: string | number, todo: ITodo): Observable<ITodo> {
    const todos = this.todos$.getValue();
    const index = todos.findIndex(todo => todo.id === id);
    todo.status = 'pending';
    todos[index] = {
      ...todos[index],
      ...todo
    }
    this.todos$.next(todos);
    return of(todo);
  }

  deleteTodoByID(id: string | number): Observable<boolean> {
    const todos = this.todos$.getValue();
    const index = todos.findIndex(todo => todo.id === id);
    todos.splice(index, 1);
    this.todos$.next(todos);
    return of(true);
  }

  completeTodoById(id: string | number): Observable<ITodo> {
    const todos = this.todos$.getValue();
    const index = todos.findIndex(todo => todo.id === id);
    todos[index] = {
      ...todos[index],
      status: 'completed'
    };
    this.storageService.set('todos', todos);
    return of(todos[index]);

  }


  generatedId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}

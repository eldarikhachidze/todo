import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../common/services/todo.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  total = 0
  completed = 0
  inProgress = 0

  constructor(
    private todoService: TodoService
  ) {
  }

  ngOnInit(): void {
    this.todoService.getTodos()
      .subscribe((res) => {
        this.total = res.length
        this.completed = res.filter((item) => item.status === 'completed').length
        this.inProgress = this.total - this.completed
      })

  }

  deleteAll() {
    this.todoService.todos$.next([])
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PersonService} from "../../common/services/person.service";
import {Observable, Subscription} from "rxjs";
import {IPerson} from "../../common/interfaces/persons.interface";
import {TodoService} from "../../common/services/todo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {persons} from "../../shared/datas/persons";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    responsiblePersonId: new FormControl('', Validators.required)
  })

  persons: IPerson[] = []
  todoId: string | undefined


  constructor(
    private personsService: PersonService,
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }


  ngOnInit(): void {
    this.getPersons()
    this.route.params.subscribe((params) => {
      if(params['id']) {
        this.todoId = params['id']
        this.getTodoById(params['id'])
      }
    })
  }

getTodoById(id: string) {
    this.subscription = this.todoService.getTodoById(id)
      .subscribe((res) =>{
        if(res) {
          this.form.patchValue(res)
        }

      })

}

  getPersons() {
    this.subscription = this.personsService.getPersons()
      .subscribe((res) => {
        this.persons = res
      })
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    const {responsiblePersonId} = this.form.value
    let responsiblePerson: IPerson | undefined
    if (responsiblePersonId) {
      responsiblePerson = this.persons.find(person => person.id === responsiblePersonId)
    }

    if(this.todoId){
      this.subscription = this.todoService.updateTodoByID(this.todoId,{...this.form.value, responsiblePerson: responsiblePerson})
        .subscribe(() => {
          this.router.navigate(['/'])
        })

    } else {
      this.subscription = this.todoService.addTodo({...this.form.value, responsiblePerson: responsiblePerson})
        .subscribe(() => {
          this.router.navigate(['/'])
        })
    }


  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}

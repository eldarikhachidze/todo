import {Data} from "@angular/router";
import {TodoStatus} from "../types/todo.status";
import {IPerson} from "./persons.interface";

export interface ITodo {
  id: string
  title: string
  description: string
  status: TodoStatus
  dueData: Data
  createAt: Data
  updateAt?: Data
  removeAt?:Data
  responsiblePerson: IPerson
  responsiblePersonId?: string
}

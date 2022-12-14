import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  get(key:string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value): null
  }
  set(key: string, value: any): any {
   localStorage.setItem(key, JSON.stringify(value));
  }
}

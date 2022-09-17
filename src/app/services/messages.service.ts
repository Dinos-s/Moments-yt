import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message: string = '';

  constructor() { }

  //ADICIONAR MENSSAGENS
  add(message: string){
    this.message = message;

    setTimeout(() => {
      this.clear()
    }, 4000);
  }

  clear(){
    this.message = '';
  }
}

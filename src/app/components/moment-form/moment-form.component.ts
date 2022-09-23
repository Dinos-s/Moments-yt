import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMoment } from 'src/app/IMoment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<IMoment>();
  @Input() btnText!: string;
  @Input() momentData: IMoment | null = null;

  momentForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    });
  }

  get title(){
    return this.momentForm.get('title')!;// pegando o objeto title do momentform 
  }

  get description(){
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]
    this.momentForm.patchValue({image: file})
  }

  //envio do formulario
  submit(){
    if(this.momentForm.invalid){
      return;
    }

    console.log('Formulário enviado');
    console.log(this.momentForm.value);

    this.onSubmit.emit(this.momentForm.value);// dados do formulario para o componente pai;
  }

}

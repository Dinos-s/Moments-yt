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

  image?: File;

  momentForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    // this.momentForm = new FormGroup({
    //   id: new FormControl(this.momentData ? this.momentData.id : ''),
    //   title: new FormControl( this.momentData ? this.momentData.title : '', [Validators.required]),
    //   description: new FormControl(this.momentData ? this.momentData.description : '', [Validators.required]),
    //   image: new FormControl(''),
    // }); --> modo ternário, sem  if-else;

    if(this.momentData){
      console.log(this.momentData);
      this.momentForm = new FormGroup({
        id: new FormControl(this.momentData.id),
        title: new FormControl(this.momentData.title, [Validators.required]),
        description: new FormControl(this.momentData.description, [Validators.required]),
        image: new FormControl(''),
      });

    } else {
      this.momentForm = new FormGroup({
        id: new FormControl(''),
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        image: new FormControl('')
      })
    }
  }

  get title(){
    return this.momentForm.get('title')!;// pegando o objeto title do moment-form 
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

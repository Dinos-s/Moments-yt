import { Component, OnInit } from '@angular/core';
import { IMoment } from 'src/app/IMoment';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {
  btnText= "Compartilhar momento!";

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
  }

  async createdHandler(moment: IMoment){
    const formData = new FormData()

    formData.append("title", moment.title)
    formData.append("description", moment.description)

    if (moment.image){
      formData.append('image', moment.image)
    }

    await this.momentService.createMoment(formData).subscribe()
  }

}

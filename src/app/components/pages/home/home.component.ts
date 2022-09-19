import { Component, OnInit } from '@angular/core';
import { MomentService } from "src/app/services/moment.service";
import { IMoment } from 'src/app/IMoment';
import { environment } from 'src/environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMoments: IMoment[] = [];
  moments: IMoment[] = [];
  baseApiUrl = environment.baseApiUrl

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;

      //reorganizando a data (day-month-year)
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-Br');
      })

      this.allMoments = data;//recebendo a data modificada;
      this.moments = data;
    })
  }

}

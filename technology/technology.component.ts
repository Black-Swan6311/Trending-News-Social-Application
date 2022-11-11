import { Component, OnInit } from '@angular/core';
import { NewsapiService } from 'src/app/services/newsapi.service';
@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {


  max = 5;
  rate = 2;
  isReadonly = false;
  constructor(private api:NewsapiService) { }
//techNewsData
  techNewsData: any = [];
  
  ngOnInit(): void {
    this.api.tcTechNews().subscribe((result) => {
      this.techNewsData = result.articles;
    })
  }



}

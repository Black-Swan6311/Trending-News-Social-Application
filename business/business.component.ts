import { Component, OnInit } from '@angular/core';
import { NewsapiService } from 'src/app/services/newsapi.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  constructor(private api:NewsapiService) { }

  businessNewsData: any = [];

  ngOnInit(): void {
    this.api.tcBusinessNews().subscribe((result) => {
      console.log(result.articles)
      return this.businessNewsData = result.articles;
    })
  }

}

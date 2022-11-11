import { Component, OnInit } from '@angular/core';
import { NewsapiService } from 'src/app/services/newsapi.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  generalNewsData: any = [];

  constructor(private newsApi: NewsapiService) { }

  ngOnInit(): void {
    this.newsApi.tcGeneralNews().subscribe((result) => {
      console.log(result.articles);
      this.generalNewsData = result.articles;
    })
  }

}

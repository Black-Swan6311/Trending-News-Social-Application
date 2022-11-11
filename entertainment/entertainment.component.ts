import { Component, OnInit } from '@angular/core';
import { NewsapiService } from 'src/app/services/newsapi.service';

@Component({
  selector: 'app-entertainment',
  templateUrl: './entertainment.component.html',
  styleUrls: ['./entertainment.component.css']
})
export class EntertainmentComponent implements OnInit {

  entertainmentNewsData: any = [];

  constructor(private newsApi: NewsapiService) { }

  ngOnInit(): void {
    this.newsApi.tcEntertaimentNews().subscribe((result) => {
      this.entertainmentNewsData = result.articles;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { NewsapiService } from 'src/app/services/newsapi.service';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {

  tcSports: any = [];
  constructor(private newsApi: NewsapiService) { }

  ngOnInit(): void {
    this.newsApi.tcSportsNews().subscribe((result) => {
      console.log(result.articles);
      this.tcSports = result.articles;
    })
  }
}

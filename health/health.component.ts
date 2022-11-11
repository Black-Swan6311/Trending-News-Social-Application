import { Component, OnInit } from '@angular/core';
import { NewsapiService } from 'src/app/services/newsapi.service';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {
 
  healthNewsData: any = [];

  constructor(private newsApi: NewsapiService) { }

  ngOnInit(): void {
    this.newsApi.tchealthNews().subscribe((result) => {
      console.log(result.articles);
      this.healthNewsData = result.articles;
    })
  }
}

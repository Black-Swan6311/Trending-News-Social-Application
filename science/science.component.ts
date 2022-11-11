import { Component, OnInit } from '@angular/core';
import { NewsapiService } from 'src/app/services/newsapi.service';

@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.css']
})
export class ScienceComponent implements OnInit {

  constructor(private newsApi:NewsapiService) { }

 
  scienceNewsData: any = [];
  
  ngOnInit(): void {
    this.newsApi.tcScienceNews().subscribe((result) => {
      this.scienceNewsData = result.articles;
    })
  }

}

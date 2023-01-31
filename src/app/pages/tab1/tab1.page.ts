import { Component, OnInit } from '@angular/core';
import { NewService } from '../../services/new.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  articles: Article[] = [];

  constructor(private newService: NewService) {}

  ngOnInit(){
    
    this.newService.getNewHeadlines().subscribe(articles => this.articles.push(...articles));
    
  }

}

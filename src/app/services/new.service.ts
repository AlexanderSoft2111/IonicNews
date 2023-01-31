import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article, NewsTopHeadline } from '../interfaces/index';

const apiKey: string = environment.apiKeyNews;

@Injectable({
  providedIn: 'root'
})
export class NewService {

  constructor(private http: HttpClient) { }

  getNewHeadlines():Observable<Article[]>{
    return this.http.get<NewsTopHeadline>(`https://newsapi.org/v2/top-headlines?country=us&category=business`,{
      params: { apiKey }  //Enviando el apikey en los headers
    }).pipe(
      map( ({articles}) => articles)
    )
  }
  getNewHeadlinesByCategory(categoria: string):Observable<Article[]>{
    return this.http.get<NewsTopHeadline>(`https://newsapi.org/v2/top-headlines?country=us&category=${categoria}`,{
      params: { apiKey }  //Enviando el apikey en los headers
    }).pipe(
      map( ({articles}) => articles)
    )
  }

}

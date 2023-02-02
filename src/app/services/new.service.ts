import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article, ArticlesByCategoryAndPage, NewsTopHeadline } from '../interfaces';

const apiKey: string = environment.apiKeyNews;
const apiUrl: string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewService {

  articlesByCategoryAndPage: ArticlesByCategoryAndPage = {}; //objeto para cargar las categorias

  constructor(private http: HttpClient) { }

  //Se llama el API de noticias
  private executeQuery<T>(endPoint: string) {
    console.log('Petición Http realizada');
    return this.http.get<T>(`${apiUrl}${endPoint}`, {
      params: {
        apiKey,
        country: 'us'
      }
    })
  }

  //Llamaos al andPoint con la categoria de bussines
  getNewHeadlines():Observable<Article[]>{

    return this.getArticlesByCategory('business');
  }

  getNewHeadlinesByCategory(categoria: string, loadMore: boolean = false):Observable<Article[]>{

    if(loadMore){
      return this.getArticlesByCategory(categoria); // si necesita cargar mas productos
    }

    if(this.articlesByCategoryAndPage[categoria]){
      return of(this.articlesByCategoryAndPage[categoria].articles); //Se devuelve el arreglo convirtiendole en un observable gracias al of
    }

    return this.getArticlesByCategory(categoria); // vuelve a llamar la categoria para cargar los productos

  }

  private getArticlesByCategory(category: string): Observable<Article[]> {
    if( Object.keys( this.articlesByCategoryAndPage ).includes(category) ) { //si incluye el arreglo ya una categoria

    } else {
      this.articlesByCategoryAndPage[category] = { // Caso contrario le decimos que es el inicio y que esta vacio
        page: 0,
        articles: []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsTopHeadline>(`/top-headlines?category=${category}&page=${page}`) //haciendo la consulta con el numero de pagina para obtener los articulos
                .pipe(
                  map( ({articles}) => {
                    
                    if( articles.length === 0) return this.articlesByCategoryAndPage[category].articles; // devuelve los articulos ya cargados

                    this.articlesByCategoryAndPage[category] = {
                      page: page,
                      articles: [...this.articlesByCategoryAndPage[category].articles, ...articles]//expando todos los argumentos del arreglo y luego expando los ultimos articulos y los insertamos
                    }

                    return this.articlesByCategoryAndPage[category].articles;
                  })
                )

  }

}

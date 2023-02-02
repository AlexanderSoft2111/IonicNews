import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  get getArticles(){
    return [...this._localArticles];
  }

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    const storage = await this.storage.create(); //Creamos la bd en el storage
    this._storage = storage; //Referenciamos el objeto para acceder a sus propiedades y metodos
    this.loadArticles();
  }

  async saveRemoveArticle(article: Article) {

    //atrapamos el objeto repetido
    const exists = this._localArticles.find(localArticle => localArticle.title === article.title);

    if(exists){
      //Retiramos el objeto repetido del arreglo de articulos, devovlviendolos a un nuevo arreglo
      this._localArticles = this._localArticles.filter(localArticle => localArticle.title !== article.title);
    } else {
      //Si no hay agregamos el nuevo articulo al arreglo al principio
      this._localArticles = [article, ...this._localArticles]; //asigno el nuevo articulo al arreglo privado de articles
    }

    if(this._storage){
      this._storage.set('articles', this._localArticles); //Guardo en el storage con su clave articles
      console.log('Se guardo en el storage');
    }
  }

  async loadArticles() {
    const articles = await this._storage?.get('articles'); //Obtengo la informacion del storage
    this._localArticles = articles || []; //Cargo los articulos en el arrglo
  }

  articleInFavorite(article: Article){
    //Con los dos signos de admiracion devuelvo un valor boolena y si encutra el articulo va hacer true
    return !!this._localArticles.find(localArticle => localArticle.title === article.title);
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/index';

//pluggins
import { Browser } from '@capacitor/browser';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article?: Article;
  @Input() index?: number;

  constructor(private platform:Platform, 
              private actionCrl: ActionSheetController,
              private storageService: StorageService) { }

  ngOnInit() {}

  
  async openArticle(){
    
    if(this.platform.is('ios') || this.platform.is('android')){
      
      await Browser.open({ url: this.article?.url || '', windowName: '_blank' });
    } else {
      
      window.open(this.article?.url, '_blank');
    }
    
  }
  
  async openMenu() {

    const normalBtns: ActionSheetButton[] = [
      {
        text: 'Favorite',
        icon: 'heart-outline',
        handler: () => this.onToggleFavorite() 
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel' 
      }
    ]
    const shareBtn: ActionSheetButton = {
        text: 'Compartir',
        icon: 'share-outline',
        handler: () => this.onShareArticle() 
    }
    
    if(this.platform.is('capacitor')){
      normalBtns.unshift(shareBtn); //Agregando el boton al arreglo de botones si se esta corriendo la app en capacitor
    }

    const actionSheet = await this.actionCrl.create({
      header: 'Opciones',
      buttons: normalBtns
    });

    await actionSheet.present();

  }

  async onShareArticle() {

    if(this.article){
      console.log('OnShareArticle');
      const { title, source, url, description} = this.article;
      await Share.share({
        title: title,
        text: source.name,
        url: url,
        dialogTitle: description,
      });
    }

  }

  onToggleFavorite() {
   this.storageService.saveRemoveArticle(this.article!);
  }

}

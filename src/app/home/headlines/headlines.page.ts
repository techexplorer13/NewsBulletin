import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import {ModalController, LoadingController} from '@ionic/angular';
import {HeadlinesdescComponent} from './headlinesdesc/headlinesdesc.component';
import {SegmentChangeEventDetail} from '@ionic/core'

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.page.html',
  styleUrls: ['./headlines.page.scss'],
})
export class HeadlinesPage implements OnInit {
  headlines:any;
  
  constructor(private apiService:ApiService,private modalCtrl:ModalController,
    private loadingCtrl:LoadingController) { }

  ngOnInit() {
  this.loadingCtrl.create({spinner:"bubbles",message:"loading.."}).then(loadingel=>{
    loadingel.present();
     this.fetchHeadLines("headlines",loadingel)
   setTimeout(() => {
     loadingel.dismiss()
   }, 1200);
  })

  }

  openHeadlinesDescModal(index:any){
    this.modalCtrl.create({component:HeadlinesdescComponent,
                          componentProps:{headlinesdesc:this.headlines.value[index]}})
                          .then(modalel=>
      modalel.present())
  }

  onFilterUpdate(event:CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail)
    this.loadingCtrl.create({spinner:"bubbles",message:"loading.."}).then(loadingel=>{
      loadingel.present();
     this.fetchHeadLines(event.detail.value,loadingel)
      setTimeout(() => {
        loadingel.dismiss()
      }, 1200);
    })
    
  }

  fetchHeadLines(type:string,loadingel:HTMLIonLoadingElement){
    this.apiService.getHeadlines(type).subscribe(res=>{
      console.log(res)
      this.headlines=res;
      loadingel.dismiss();
  })
  }
}

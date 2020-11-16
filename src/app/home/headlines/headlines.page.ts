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
  headlines:any={
    "value":[
      {
      "_type":"NewsArticle",
      "name":"Everton morning headlines as £35m midfielder claim made",
      "url":"https://www.msn.com/en-gb/news/newsliverpool/everton-morning-headlines-as-%C2%A335m-midfielder-claim-made/ar-BB15nYYl",
      "description":"Here are the Everton morning headlines for Friday, June 12. Everton are reportedly one of three Premier League clubs interested in signing Southampton midfielder Pierre-Emile Hojbjerg.  According to talkSPORT,",
      "image":{
        "thumbnail":{
          "contentUrl":"https://www.bing.com/th?id=ON.C4962F63B0174F3E8D18555B525967AE&pid=News"
        }
      }
      },
      {
        "_type":"NewsArticle",
        "name":"Everton morning headlines as £35m midfielder claim made",
        "url":"https://www.msn.com/en-gb/news/newsliverpool/everton-morning-headlines-as-%C2%A335m-midfielder-claim-made/ar-BB15nYYl",
        "description":"Here are the Everton morning headlines for Friday, June 12. Everton are reportedly one of three Premier League clubs interested in signing Southampton midfielder Pierre-Emile Hojbjerg.  According to talkSPORT,",
        "image":{
          "thumbnail":{
            "contentUrl":"https://www.bing.com/th?id=ON.C4962F63B0174F3E8D18555B525967AE&pid=News"
          }
        }
        },
        {
          "_type":"NewsArticle",
          "name":"Everton morning headlines as £35m midfielder claim made",
          "url":"https://www.msn.com/en-gb/news/newsliverpool/everton-morning-headlines-as-%C2%A335m-midfielder-claim-made/ar-BB15nYYl",
          "description":"Here are the Everton morning headlines for Friday, June 12. Everton are reportedly one of three Premier League clubs interested in signing Southampton midfielder Pierre-Emile Hojbjerg.  According to talkSPORT,",
          "image":{
            "thumbnail":{
              "contentUrl":"https://www.bing.com/th?id=ON.C4962F63B0174F3E8D18555B525967AE&pid=News"
            }
          }
          },
          {
            "_type":"NewsArticle",
            "name":"Top headlines: Eclipse wows UAE residents; play areas in Dubai parks now open; parking fees in Abu Dhabi to resume",
            "url":"https://www.khaleejtimes.com/uae/dubai/top-headlines-eclipse-wows-uae-residents-play-areas-in-dubai-parks-now-open-parking-fees-in-abu-dhabi-to-resume",
            "description":"The Dubai Municipality on Sunday announced that children's play areas in the emirate's parks are now open. In line with the need for citizens to return to their normal life, Dubai Municipality announces the re-opening of children's play areas today in all parks in Dubai,",
            "image":{
              "thumbnail":{
                "contentUrl":"https://www.bing.com/th?id=ON.10E401C0381D82D4277985E00AC1D5EF&pid=News"
              }
            }
            },
          
     
      ]
  }
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
     // this.fetchHeadLines(event.detail.value,loadingel)
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
